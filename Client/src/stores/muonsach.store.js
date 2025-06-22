import { axiosInstance } from "@/axios/api.service"
import { defineStore } from "pinia"
import { useUserStore } from "./nguoidung.store"

export const useBorrowBookStore = defineStore('borrowBook', {
    state: () => {
        return {
            SachMuon: [],
            AdminMuon: [],
            count: '',
            searchText: '',
            sachDangLay:''
        }
    },
    actions: {
        getAllForAdmin() {
            const userStore = useUserStore()
            const token = userStore.staffToken
            if(!token) {
                return 
            }
            return axiosInstance.get('/borrows/staff', {headers: {'Authorization': token}})
                .then((res) => {
                    this.AdminMuon =  res.data?.danhsachmuon
                    this.count = res.data?.count
                    this.sachDangLay = res.data?.soQuyenSachDangBiLay
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        getAllForUser() {
            const userStore = useUserStore()
            const token = userStore.token
            if(!token) {
                return 
            }
            return axiosInstance.get('/borrows', {headers: {'Authorization': token}})
                .then((res) => {
                    if(res.data?.danhsachmuon){
                        this.SachMuon =  res.data?.danhsachmuon
                    }
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        addBorrow(data){
            const userStore = useUserStore()
            const token = userStore.token
            if(!token) {
                return 
            }
            return axiosInstance.post('/borrows', data, {headers: {'Authorization': token}})
                .then((res) => {
                    this.SachMuon.push(res.data.muon)
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        updateBorrowForAdmin(MaMuon, data) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            if(!token) {
                return 
            }
            return axiosInstance.patch(`/borrows/${MaMuon}`, data, {headers: {'Authorization': token}})
                .then((res) => {
                    // cập nhật cho admin
                    const adminIndex = this.AdminMuon.findIndex(muon => muon._id === MaMuon)
                    if (adminIndex !== -1 && res.data.muon) {
                        this.AdminMuon[adminIndex] = res.data.muon
                    }
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        deleteBorrowForUser(MaMuon) {
            const userStore = useUserStore()
            const token = userStore.token
            if(!token) {
                return 
            }
            return axiosInstance.delete(`/borrows/users/${MaMuon}`, {headers: {'Authorization': token}})
                .then((res) => {
                    this.SachMuon = this.SachMuon.filter(muon => muon._id !== MaMuon)
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        deleteBorrowForAdmin(MaMuon) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            if(!token) {
                return 
            }
            return axiosInstance.delete(`/borrows/staffs/${MaMuon}`, {headers: {'Authorization': token}})
                .then((res) => {
                    if(res.data?.muon){
                         this.AdminMuon = this.AdminMuon.filter(muon => muon._id !== MaMuon)
                    }
                   
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        }   

    },
    getters: {
        getBorrowById(state){
            return (id) => state.SachMuon.find(book => book._id === id)
        },
        getBorrowFromNameReader(state) {
            return (searchText) => {
                if(!searchText) return state.AdminMuon
                const lowerSearch = searchText.toLowerCase()

                return state.AdminMuon.filter(borrow => {
                    const fullName = `${borrow.MADOCGIA?.HOLOT} ${borrow.MADOCGIA?.TEN}`.toLowerCase()
                    return fullName.includes(lowerSearch)
                })
            }
        }
    }
})