import { axiosInstance } from "@/axios/api.service"
import { defineStore } from "pinia"
import { useUserStore } from "./nguoidung.store"

export const usePublisherStore = defineStore('publisher', {
    state: () => {
       return {
            publishers: [],
            searchText: '',
            count: ''
       }
    },
    actions: {
        getAll() {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return axiosInstance.get('/publishers', {headers: {'Authorization': token}})
                .then((res) => {
                    this.publishers = res.data.nhaxuatban
                    this.count = res.data?.count
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        add(data) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return axiosInstance.post('/publishers', data, {headers: {'Authorization': token}})
                .then((res) => {
                    if(res.data.nhaxuatban){
                    this.publishers.push(res.data.nhaxuatban)   
                    }
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        update(MaNXB, data) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return axiosInstance.patch(`/publishers/${MaNXB}`, data, {headers: {'Authorization': token}})
                .then((res) => {
                    const index = this.publishers.findIndex(publisher => publisher.MANXB === MaNXB)
                    if (index !== -1) {
                        this.publishers[index] = res.data.nhaxuatban
                    }
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        delete(MaNXB) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return axiosInstance.delete(`/publishers/${MaNXB}`, {headers: {'Authorization': token}})
                .then((res) => {
                    this.publishers = this.publishers.filter(publisher => publisher.MANXB !== MaNXB)
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
    },
    getters: {
        getPublisher(state){
            return (MaNXB) => state.publishers.find(publisher => String(publisher.MANXB) === MaNXB)
        },
        getPublishersFromName(state){
            return (searchText) => {
                if(!searchText) return state.publishers
                const lowerSearch = searchText.toLowerCase()
                return state.publishers.filter(publisher => 
                    publisher.TENNXB.toLowerCase().includes(lowerSearch)
                )
            }
        }
    },

})