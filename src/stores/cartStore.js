//封装购物车模块
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user.js'
import { insertCartApi, getCartListApi, deleteCartApi } from '@/apis/cart.js'
export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)

  //获取最新购物车列表action
  const updateNewList = async () => {
    const res = await getCartListApi()
    cartList.value = res.result
  }

  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      //执行登录后的逻辑
      await insertCartApi({ skuId, count })
      updateNewList()
    }
    else {
      //执行没有登录的逻辑
      //已经添加过，count+1
      //没有添加过，直接push
      const item = cartList.value.find((item) => item.skuId === goods.skuId)
      if (item) {
        item.count++
      }
      else {
        cartList.value.push(goods)
      }
    }
  }

  //修改选中项的单选框
  const changeCheck = (skuId, selected) => {
    const item = cartList.value.find((item) => item.skuId = skuId)
    item.selected = selected
  }

  //删除购物车
  //思路1.找到要删除项的下标值，用splice方法
  //思路2.使用数组过滤方法，用filter方法
  const delCart = async (skuId) => {
    if (isLogin.value) {
      await deleteCartApi([skuId])
      updateNewList()
    }
    else {
      //用splice方法实现
      // const idx = cartList.value.findIndex((item) => item.skuId === skuId)
      // cartList.value.splice(idx, 1)
      //用filter方法实现
      cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }
  }

  //清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  const allCheck = (selected) => {
    cartList.value.map((item) => item.selected = selected)
  }

  //计算属性
  //总的数量，所有项的count之和
  const allCount = computed(() => cartList.value.reduce((acc, cur) => acc + cur.count, 0))
  //总价，所有项的count*price之和
  const allPrice = computed(() => cartList.value.reduce((acc, cur) => acc + cur.count * cur.price, 0))

  //得到已选中的数量和价格
  const checkCount = computed(() => cartList.value.filter(item => item.selected).reduce((acc, cur) => acc + cur.count, 0))
  const checkPrice = computed(() => cartList.value.filter(item => item.selected).reduce((acc, cur) => acc + cur.count * cur.price, 0))

  //定义全选属性
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  return { cartList, addCart, delCart, allCount, allPrice, changeCheck, isAll, allCheck, checkCount, checkPrice, clearCart, updateNewList }
}, {
  persist: true,
})
