import request from '@/utils/http'

export const getUserOrderApi = (params) => {
  return request({
    url: '/member/order',
    method: 'get',
    params
  })
}