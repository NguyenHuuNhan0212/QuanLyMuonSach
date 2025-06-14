import { axiosInstance } from '@/axios/api.service'
import { defineStore } from 'pinia'
  
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: sessionStorage.getItem('token') || '',
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')) || {},
      staffInfo: JSON.parse(sessionStorage.getItem('staffInfo')) || {},
      staffToken: sessionStorage.getItem('staffToken') || '',
    };
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
            sessionStorage.setItem('token', this.token)
            this.userInfo = res.data.data?.user
            sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
            return res.data.message
          })
          .catch((err) => {
            console.log(err)
            return false
          })
    },
    UserUpdate: function(userData) {
      if (!this.token) {
        return false
      }
      if (!userData || !userData._id) {
        return false  
      }
      return axiosInstance.patch(`/users/${this.userInfo._id}`, userData)
          .then((res) => {
            if(res.data?.data){
              this.userInfo = res.data?.data
              sessionStorage.setItem('userInfo', JSON.stringify(this.userInfo))
            }
            
            return res.data.message
          })
          .catch((err) => {
            console.log(err)
            return false
          })
    },
    changePassword: function(userData){
      if (!this.token) {
        return false
      }
      return axiosInstance.patch(`/users/changePassword/${this.userInfo?._id}`, userData)
          .then((res) => {
            return res.data?.message
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
            sessionStorage.setItem('staffToken', this.staffToken)
            this.staffInfo = res.data.data?.staff
            sessionStorage.setItem('staffInfo', JSON.stringify(this.staffInfo))
            return res.data.message
          })
          .catch((err) => {
            console.log(err)
            return false
          })
    },
    updateStaff: function (staffData) {
      if(!this.staffToken){
        return false
      }
      if(!staffData._id || !staffData){
        return false
      }
      return axiosInstance.patch(`/staffs/${this.staffInfo._id}`, staffData)
          .then((res) => {
                this.staffInfo = res.data?.data
                sessionStorage.setItem('staffInfo', JSON.stringify(this.staffInfo))
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
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
    },
    StaffLogout: function() {
      this.staffToken = ''
      this.staffInfo = {}
      sessionStorage.removeItem('staffToken')
      sessionStorage.removeItem('staffInfo')
    },
  },
})