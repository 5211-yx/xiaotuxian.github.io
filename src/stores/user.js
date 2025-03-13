import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginApi } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartApi } from '@/apis/cart'

// export const useUserStore = defineStore('user', () => {
//   const userInfo = ref({})
//   const getUserInfo = async ({ account, password }) => {
//     const res = await loginApi({ account, password })
//     userInfo.value = res.result
//   }
//   return {
//     userInfo,
//     getUserInfo
//   },
//   {
//     persist: true,
//   }
// })

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const cartStore = useCartStore()
  const getUserInfo = async ({ account, password }) => {
    const res = await loginApi({ account, password })
    userInfo.value = res.result

    //合并购物车的操作
    await mergeCartApi(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
  }
  //退出时清除用户信息
  const clearInfo = () => {
    userInfo.value = {}
    //退出时清空购物车信息
    cartStore.clearCart()
  }

  return {
    userInfo,
    getUserInfo,
    clearInfo
  }
}, {
  persist: true // 这是正确的位置
})
