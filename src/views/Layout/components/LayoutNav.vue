<script setup>
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
// console.log(userStore, 'userStore')
const confirm = () => {
  // console.log('用户要退出登录了');
  userStore.clearInfo()
  router.push('/login')
}
</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- <a href="javascript:;"></a> 表示创建一个无跳转行为的链接-->
        <!-- 这里用于区分登录状态和非登录状态, true为登录状态，false为非登录状态 -->
         <!-- 可以根据有无token判断登录状态 -->
        <template v-if="userStore.userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}</a></li>
          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <!-- <li><a href="#">我的订单</a></li> -->
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        // border-left: 2px solid #666;   这样写每个框前面都有边框
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }
      //这样写相当于是第一个li之后的每个li里面的a才会有边框
      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>