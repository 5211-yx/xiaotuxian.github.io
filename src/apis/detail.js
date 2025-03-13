import request from '@/utils/http'

export function getDetailApi(id) {
  return request({
    url: '/goods',
    method: 'get',
    params: {
      id
    }
  })
}

export const getHotGoodsApi = ({ id, type, limit = 3 }) => {
  return request({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}