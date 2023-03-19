import request from '@/utils/request'
import { getStorage } from '@/utils/storage'

const cookie = encodeURIComponent(getStorage('userInfo')?.cookie)

export const loginByPhone = (phone, password) => request.get(`/login/cellphone?phone=${phone}&password=${password}`);
export const getCode = (phone) => request.get(`/captcha/sent?phone=${phone}`);
export const loginByEmail = (email, password) => request.get(`/login?email=${email}&password=${password}`)

export const getList = () => request({
  method: 'get',
  url: '/artist/sublist',
  params: {
    cookie 
  }
})