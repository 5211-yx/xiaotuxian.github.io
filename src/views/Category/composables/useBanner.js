//封装轮播图业务相关代码
import { ref, onMounted } from 'vue'
import { getBannerApi } from '@/apis/home'
export function useBanner() {
  //获取轮播图数据
  const bannerList = ref([])
  const getBanner = async () => {
    const res = await getBannerApi()
    bannerList.value = res.result
    // console.log(res, '000')
  }
  onMounted(() => {
    getBanner()
  })
  return {
    bannerList
  }
}