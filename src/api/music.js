import request from '@/utils/request'

export const getListByName = (keywords) => {
  return request({
    method: 'get',
    url: `/search?keywords=${keywords}`
  })
}