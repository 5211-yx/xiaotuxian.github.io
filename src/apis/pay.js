import request from '@/utils/http'

export const getPayApi = (id) => {
  return request({
    url: `/member/order/${id}`
  })
}