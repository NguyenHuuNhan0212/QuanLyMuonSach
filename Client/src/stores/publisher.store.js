import { axiosInstance } from "@/axios/api.service"
import { defineStore } from "pinia"
import { useUserStore } from "./user.store"

export const usePublisherStore = defineStore('publisher', {
    state: () => {
       return {
            publishers: [],
            fetching:  false,
       }
    },
    actions: {
        getAll() {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return axiosInstance.get('/publishers', {headers: {'Authorization': token}})
                .then((res) => {
                    this.publishers = res.data.nhaxuatban
                    this.fetching = true
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
                    this.publishers.push(res.data.nhaxuatban)
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
                    const index = this.publishers.findIndex(publisher => publisher.MaNXB === MaNXB)
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
                    this.publishers = this.publishers.filter(publisher => publisher.MaNXB !== MaNXB)
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
            return (MaNXB) => state.publishers.find(publisher => publisher.MaNXB === MaNXB)
        }
    },

})