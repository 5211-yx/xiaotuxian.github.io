//封装分类数据相关代码
import { ref, onMounted } from 'vue'
import { getCategoryApi } from '@/apis/category';
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
export function useCategory() {
  //获取分类数据
  const categoryData = ref({})
  const route = useRoute()
  // 如果没有传则默认用route.params.id，传了的用传了的id
  const getCategoryData = async (id = route.params.id) => {
    const res = await getCategoryApi(id)
    categoryData.value = res.result
  }
  onMounted(() => getCategoryData())
  onBeforeRouteUpdate((to) => {
    console.log(to, 'to');
    getCategoryData(to.params.id)
  })
  return {
    categoryData
  }
}