<template>
  <div class="content">
    <div class="inner">
      <div class="logo">
        <img class="img" src="@/assets/image/NavBar/logo.png" alt="">
        <span class="text">网易云音乐</span>
      </div>
      <div :class="['menus', activeTab === item.title ? 'active-tab' : '']" v-for="(item, index) in menus"
        :key="item.title" @click="changeMenus(item)">
        {{ item.title }}
        <span :class="[activeTab === item.title ? 'arrow' : '']"></span>
      </div>
      <div class="user">
        <div class="user-search">
          <img class="search-icon" @click="toSearch" src="@/assets/image/NavBar/search.png" alt="">
          <input class="search-input" @keydown.enter="toSearch" placeholder="音乐/视频/电台/用户" type="text">
        </div>
        <div class="creater-center">创作者中心</div>
        <div class="user-content">
          <template v-if="isShowAvatar">
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                <img @mouseenter="openMenus" @mouseleave="closeMenus" class="user-icon"
                  :src="getStorage('userInfo').profile.avatarUrl" alt="">
                <div class="user-news">{{ '87' }}</div>
              </span>
              <template #dropdown>
                <el-dropdown-menu class="element-plus-drop-menu">
                  <el-dropdown-item command="a">
                    <img src="@/assets/image/NavBar/user.png" alt=""> 我的主页</el-dropdown-item>
                  <el-dropdown-item command="b"> <img src="@/assets/image/NavBar/email.png" alt=""> 我的消息</el-dropdown-item>
                  <el-dropdown-item command="c"><img src="@/assets/image/NavBar/level.png" alt=""> 我的等级</el-dropdown-item>
                  <el-dropdown-item command="c"><img src="@/assets/image/NavBar/vip.png" alt="">vip会员</el-dropdown-item>
                  <el-dropdown-item command="c" divided><img src="@/assets/image/NavBar/config.png"
                      alt="">个人设置</el-dropdown-item>
                  <el-dropdown-item command="c"><img src="@/assets/image/NavBar/realname.png" alt="">实名认证</el-dropdown-item>
                  <el-dropdown-item @click="logout" command="e" divided><img src="@/assets/image/NavBar/logout.png"
                      alt="" >退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
          <template v-else>
            <span class="user-login" @click="login">登录</span>
          </template>
        </div>
      </div>
      <!-- <Login :isShow="isShow" @closeDialog="closeDialog"></Login> -->
    </div>
    
  </div>
  <div :class="[activeTab === '发现音乐' ? 'red' : 'red-coll']">
      <div class="red-content" :style="{ display: activeTab === '发现音乐' ? '' : 'none' }">
        <div :class="['menus2', activeTab2 === item.title ? 'active-tab2' : '']" @click="changeMenus2(item)"
          v-for="(item, index) in menus2" :key="item.title">
          {{ item.title }}
        </div>
      </div>
    </div>

    <el-dialog v-model="isShow" width="20%" top="30vh" title="邮箱登录">
      <el-form v-model="formData">
        <el-form-item label="账号">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input show-password type="password" v-model="formData.password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button :loading="isLoading" @click="hanldleEmail">登录</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { loginByPhone,getCode, loginByEmail } from '@/api/login'
import { ElMessage } from 'element-plus'
import { getStorage, setStorage } from '@/utils/storage'
// import Login from '../Login';
const router = useRouter();
const menus = [
  {
    title: '发现音乐',
    url: '/'
  },
  {
    title: '我的音乐',
    url: '/mymusic'
  },
  {
    title: '关注',
    url: '/focus'
  },
  {
    title: '商城',
    url: '/shop'
  },
  {
    title: '音乐人',
    url: '/artist'
  },
  {
    title: '下载客户端',
    url: '/download'
  }
]
const menus2 = [
  {
    title: '推荐',
    url: 'discover'
  },
  {
    title: '排行榜',
    url: 'toplist'
  },
  {
    title: '歌单',
    url: 'playlist'
  },
  {
    title: '主播电台',
    url: 'djradio'
  },
  {
    title: '歌手',
    url: 'artists'
  },
  {
    title: '新碟上架',
    url: 'album'
  }
]
const enums = {
  home: '发现音乐',
  mymusic: '我的音乐',
  focus: '关注',
  shop: '商城',
  artist: '音乐人',
  download: '下载客户端',
  discover: '推荐',
  toplist: '排行榜',
  playlist: '歌单',
  djradio: '主播电台',
  artists: '歌手',
  album: '新碟上架'
}
const activeTab = ref('发现音乐')
const activeTab2 = ref('推荐')
const isShow = ref(false)
const isLoading = ref(false);
const isShowAvatar = ref(getStorage('userInfo')?.profile?.avatarUrl?true:false)
const formData = ref({
  email: '',
  password: ''
});
const changeMenus = (item) => {
  if (item.title === "商城" || item.title === "音乐人") {
    //路由跳转新页面
    let url = router.resolve({
      path: item.url,
      query: {
        id: 18
      }
    })
    window.open(url.href, '_blank')
    return;
  }
  activeTab.value = item.title
  router.push({
    path: item.url
  })
}
const changeMenus2 = (item) => {
  activeTab2.value = item.title
  router.push({
    path: `/home/${item.url}`
  })
}
const hanldleEmail = async () => {
  isLoading.value = true
  try {
    const res = await loginByEmail(formData.value.email, formData.value.password)
    setStorage('userInfo', res)
    isShowAvatar.value = true;
    isShow.value = false
    isLoading.value = false
  } catch(err) {
    isLoading.value = false
    ElMessage({
      type: 'error',
      message: err
    })
  }
}
const logout = () => {
  console.log('dengchu');
  isShowAvatar.value = false
  setStorage('userInfo', '')
}
const toSearch = (e) => {
  router.push({
    path: '/home/search',
    query: {
      name: e.target.value
    }
  })
}
onMounted(() => {
  const routerArray = window.location.hash.split('/');
  activeTab.value = enums[routerArray[1]]
  activeTab2.value = enums[routerArray[2]]
})
const handleCommand = () => {}
const closeMenus = () => {
  console.log('xxx');
}
const openMenus = () => {
  console.log('√√√');
}
const login =  () => {
  isShow.value = true
  console.log('xxx');
}
const closeDialog = () => {

}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 70px;
  background-color: #242424;

  .inner {
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    display: flex;

    .logo {
      width: 170px;
      height: 100%;
      display: flex;
      align-items: center;

      .img {
        width: 41px;
        height: 41px;
      }

      .text {
        font-size: 24px;
        color: #fff;
      }
    }

    .menus {
      color: #eeeeeeb0;
      height: 100%;
      line-height: 70px;
      padding: 0 16px;
      position: relative;

      .arrow {
        display: inline-block;
        position: absolute;
        bottom: 0px;
        left: calc(50% - 10px);
        width: 0;
        height: 0;
        border: 10px solid red;
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
      }
    }

    .menus:hover {
      cursor: pointer;
      background-color: #000000;
      color: #fff;
    }

    .active-tab {
      background-color: #000000;
      color: #fff;
    }

    .user {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      .user-search {
        width: 160px;
        height: 33px;
        background-color: #fff;
        border-radius: 15px;

        .search-icon {
          width: 20px;
          height: 20px;
          border-radius: 5px;
          position: relative;
          top: 4px;
          left: 4px;
        }

        .search-input {
          width: 122px;
          border: none;
          outline: none;
          position: relative;
          left: 10px;
          top: 6px;
        }
      }

      .creater-center {
        width: 90px;
        height: 30px;
        border: 1px solid #eeeeee60;
        border-radius: 15px;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        color: #eeeeee8a;
      }

      .creater-center:hover {
        border: 1px solid #eee;
        color: #eee;
        cursor: pointer;
      }

      .user-content {
        position: relative;

        .user-icon {
          width: 30px;
          height: 30px;
          border-radius: 15px;
        }

        .user-icon:hover {
          cursor: pointer;
        }

        .user-icon:hover+.user-news {
          display: none;
        }

        .user-news {
          width: fit-content;
          padding: 0px 5px;
          border-radius: 10px;
          position: absolute;
          font-size: 12px;
          background-color: #C20C0C;
          color: #fff;
          top: -3px;
          right: -12px;
        }

        .user-menus {
          position: absolute;
          margin-top: 10px;
          left: -62px;
          width: 160px;
          height: 240px;
          background-color: #2B2B2B;

          .user-arrow {
            display: inline-block;
            position: absolute;
            top: -13px;
            left: calc(50% - 10px);
            width: 0;
            height: 0;
            border: 7px solid #2B2B2B;
            border-top-color: transparent;
            border-left-color: transparent;
            border-right-color: transparent;
          }
        }
        .user-login {
          color: #eeeeee3d;
          font-size: 14px;
        }
        .user-login:hover {
          color: #eee;
          text-decoration: underline;
          cursor: pointer;
        }
      }

    }
  }

  
}
.red {
    background-color: red;
    height: 36px;

    .red-content {
      width: 750px;
      margin: 0 auto;
      display: flex;
      height: 100%;
      align-items: center;

      .menus2 {
        margin: 15px;
        padding: 3px 10px;
        font-size: 14px;
        border-radius: 10px;
        color: #eee;
      }

      .menus2:hover {
        background-color: #9B0909;
        cursor: pointer;
      }

      .active-tab2 {
        background-color: #9B0909;
      }
    }
  }

  .red-coll {
    background-color: red;
    height: 5px;
  }
</style>