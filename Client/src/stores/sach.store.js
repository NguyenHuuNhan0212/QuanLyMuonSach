import { axiosInstance } from "@/axios/api.service"
import { defineStore } from "pinia"
import { useUserStore } from "./nguoidung.store"

export const useBookStore = defineStore('book', {
    state: () => {
        return {
            books: [],
            searchText: '',
            count: ''
        }
    },
    actions: {
        getAll() {
                return axiosInstance.get('/books')
                    .then((res) => {
                        this.books = res.data?.sach
                        this.count = res.data?.count
                        return res.data.message
                    })
                    .catch((err) => {
                        console.log(err)
                        return false
                    })
        },
        async add(data) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return await axiosInstance.post('/books', data, {headers: {'Authorization': token}})
                .then((res) => {
                    if(res.data.sach){
                        this.books.push(res.data.sach)
                    }
                    return res.data.message
                    
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        update(MaSach, data) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return axiosInstance.patch(`/books/${MaSach}`, data, {headers: {'Authorization': token}})
                .then((res) => {
                    const index = this.books.findIndex(book => book.MASACH === MaSach)
                    if (index !== -1) {
                        this.books[index] = res.data.sach
                    }
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
        delete(MaSach) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return axiosInstance.delete(`/books/${MaSach}`, {headers: {'Authorization': token}})
                .then((res) => {
                    this.books = this.books.filter(book => book.MASACH !== MaSach)
                    return res.data.message
                })
                .catch((err) => {
                    console.log(err)
                    return false
                })
        },
    },
    getters: {
        getBook(state) {
            return (MaSach) => state.books.find(book => String(book.MASACH) === MaSach);
        },
        getBooks(state){
            return state.books
        },
        getBooksFormName(state) {
            return (searchText) => {
                if(!searchText) return state.books
                const lowerSearch = searchText.toLowerCase()
                return state.books.filter(book => 
                    book.TENSACH.toLowerCase().includes(lowerSearch)
                )
            }
        },
    }
})