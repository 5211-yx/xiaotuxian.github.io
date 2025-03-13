import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryApi } from '@/apis/layout'
export const useCategoryStore = defineStore('category', () => {
  //state导航数据列表
  const categoryList = ref([])
  const getCategory = async () => {
    const res = await getCategoryApi()
    categoryList.value = res.result
  }
  return ({
    categoryList,
    getCategory
  })


})