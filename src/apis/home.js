//默认导出的引入的时候不需要加括号，具名导出引入的时候则需要加括号
import httpInstance from "@/utils/http";

//获取banner

export function getBannerApi(params = {}) {
  //需要进行return

  //默认为1，商品为2
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    method: 'get',
    params: {
      distributionSite
    }
  })
}

export function findNewApi() {
  return httpInstance({
    url: '/home/new',
    method: 'get'
  })
}

export function findHotApi() {
  return httpInstance({
    url: '/home/hot',
    method: 'get'
  })
}

export function getGoodsApi() {
  return httpInstance({
    url: '/home/goods',
    method: 'get'
  })
} 