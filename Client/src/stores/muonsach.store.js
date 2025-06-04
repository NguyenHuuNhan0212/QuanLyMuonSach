import { axiosInstance } from "@/axios/api.service"
import { defineStore } from "pinia"
import { useUserStore } from "./nguoidung.store"

export const useBorrowBookStore = defineStore('borrowBook', {
    state: () => {
        return {
            SachMuon: [],
            AdminMuon: [],
            fetchAdmin: false,
            fetching: false
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
                    this.AdminMuon =  res.data.danhsachmuon
                    this.fetchAdmin = true
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
                    this.SachMuon =  res.data.danhsachmuon
                    this.fetching = true
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
                    const index = this.AdminMuon.findIndex(muon => muon._id === MaMuon)
                    if (index !== -1) {
                        this.AdminMuon[index] = res.data.muon
                    }
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        deleteBorowForUser(MaMuon) {
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
                    this.AdminMuon = this.AdminMuon.filter(muon => muon._id !== MaMuon)
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        }   

    }
})