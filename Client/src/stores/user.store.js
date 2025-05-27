import { axiosInstance } from '@/axios/api.service'
import { defineStore } from 'pinia'
  
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      userInfo: {},
      staffInfo: {},
      staffToken: localStorage.getItem('staffToken') || '',
    }
  },
  actions: {
    UserRegister: async function (userData) {
      return await axiosInstance.post('/users/register', userData)
          .then((res) => {
            return res.data.message
          })
          .catch((err) => {
            console.log(err)
            return false
          })
    },
    UserLogin: function(userData) {
      return axiosInstance.post('/users/login', userData)
          .then((res) => {
            this.token = res.data.data?.token
            localStorage.setItem('token', this.token)
            this.userInfo = res.data.data?.user
            return res.data.message
          })
          .catch((err) => {
            console.log(err)
            return false
          })
    },
    StaffLogin: function(staffData) {
      return axiosInstance.post('/staffs/login', staffData)
          .then((res) => {
            this.staffToken = res.data.data?.token
            localStorage.setItem('staffToken', this.staffToken)
            this.staffInfo = res.data.data?.staff
            return res.data.message
          })
          .catch((err) => {
            console.log(err)
            return false
          })
    },
    UserLogout: function() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('token')
    },
    StaffLogout: function() {
      this.staffToken = ''
      this.staffInfo = {}
      localStorage.removeItem('staffToken')
    },
  },
})