import { axiosInstance } from "@/axios/api.service"
import { defineStore } from "pinia"
import { useUserStore } from "./nguoidung.store"

export const  useReaderStore = defineStore('reader', {
    state: () => {
        return {
            docGiaList: [],
            count: '',
            searchText: ''
        }
    },
    actions: {
        getAll: function(){
            const token = useUserStore(). staffToken
            return axiosInstance.get('/readers', {headers: {'Authorization': token}})
                .then((res) => {
                    if(res.data?.userList){
                        this.docGiaList = res.data?.userList
                        this.count = res.data?.countUser
                    }
                    return res.data?.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
    },
    getters: {
        getAllReaderFromName(state) {
            return (searchText) => {
                if(!searchText) return state.docGiaList
                const lowerSearch = searchText.toLowerCase()
                return state.docGiaList.filter(docgia => {
                    const reader = `${docgia.HOLOT || ''} ${docgia.TEN || ''}`
                    return reader.toLowerCase().includes(lowerSearch)
                })
            }
        }
    }
})