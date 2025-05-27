import { axiosInstance } from "@/axios/api.service"
import { defineStore } from "pinia"
import { useUserStore } from "./user.store"

export const useBookStore = defineStore('book', {
    state: () => {
        return {
            books: [],
            searchText: '',
            fetching: false,
        }
    },
    actions: {
        getAll() {
            if(this.books.length === 0) {
                return axiosInstance.get('/books')
                    .then((res) => {
                        this.books = res.data.sach
                        this.fetching = true
                        return res.data.message
                    })
                    .catch((err) => {
                        console.log(err)
                        return false
                    })
            }
            return 'Đã có sách không cần tải lại.'
        },
        async add(data) {
            const userStore = useUserStore()
            const token = userStore.staffToken
            return await axiosInstance.post('/books', data, {headers: {'Authorization': token}})
                .then((res) => {
                    this.books.push(res.data.sach)
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
                    const index = this.books.findIndex(book => book.MaSach === MaSach)
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
                    this.books = this.books.filter(book => book.MaSach !== MaSach)
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
            return (MaSach) => state.books.find(book => book.MASACH === MaSach)
        },
        getBooks(state){
            return state.books
        },
        getBooksFormTitle(state) {
            return (title) => state.books.filter(book => book.TENSACH.toLowerCase().includes(title.toLowerCase()))
        },
        getFetching(state) {
            return state.fetching
        }
    }
})