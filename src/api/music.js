import request from '@/utils/request'

export const getListByName = (keywords) => {
  return request({
    method: 'get',
    url: `/search?keywords=${keywords}`
  })
}

export const getPlayList = () => {
  return request({
    method: 'get',
    url: '/top/playlist'
  })
}

export const getListSong = (id) => {
  return request({
    method: 'get',
    url: `/playlist/track/all?id=${id}&limit=20&offset=1`
  })
}