import { useIntersectionObserver } from '@vueuse/core'
//定义懒加载插件

export const lazyPlugin = {
  install(app) {
    //定义全局指令
    app.directive('img-lazy', {
      mounted(el, binding) {
        //el:指令绑定的那个元素
        //binding:指令绑定的对象，binding.value表示指令绑定的表达式的值
        console.log(el, binding.value);

        //这个函数是vue.use提供的一个函数
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              //进入视口区域
              el.src = binding.value
              //停止监听，避免内存浪费
              stop()
            }
            console.log(isIntersecting);

          },
        )
      }
    })
  }
}