//封装购物车相关接口
import request from '@/utils/http'

//加入购物车
export const insertCartApi = ({ skuId, count }) => {
  return request({
    url: '/member/cart',
    method: 'post',
    data: {
      skuId,
      count
    }
  })
}

//删除购物车
export const deleteCartApi = (ids) => {
  return request({
    url: '/member/cart',
    method: 'delete',
    data: {
      ids
    }
  })
}

//获取最新的购物车列表
export const getCartListApi = () => {
  return request({
    url: '/member/cart'
  })
}

export const mergeCartApi = (data) => {
  return request({
    url: '/member/cart/merge',
    method: 'post',
    data
  })
}