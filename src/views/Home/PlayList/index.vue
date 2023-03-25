<template>
  <div class="contain">
    <div class="content">
      <div class="header">
        <span style="font-size: 20px;margin-right: 10px;">全部</span>
        <div class="select">
          <el-popover placement="bottom" :width="400" trigger="click">
            <template #reference>
              <el-button style="margin-right: 16px">选择分类</el-button>
            </template>
            <div>
              <img style="width: 100px;" src="@/assets/image/doing.jpg" alt="">
              <span>已经在做了在做了...</span>
            </div>
          </el-popover>
        </div>
        <div class="hot">热门</div>
      </div>
      <div class="list">
        <div class="list-item" v-for="item in dataList" :key="item" @click="goPlayList(item)">
          <div style="width: 140px;height: 140px;position: relative;">
            <img style="width: 140px;height: 140px;"
              :src="item.coverImgUrl" alt="">
            <img style="width: 16px;position: absolute;left: 5px;top: 5px;" src="@/assets/image/Player/icon.png" alt="">
            <div style="position: absolute;left: 5px;top: 93px;color: #fff;font-size: 17px;font-weight: 700;">
              {{ item.tags[0] }}
            </div>
            <div class="detail">
              <div style="color: #D3D3D3;font-size: 12px;margin-left: 5px;display: flex;align-items: center;">
                <img style="width: 14px;margin-right: 5px;" src="@/assets/image/Player/total.png" alt=""> {{playCount(item.playCount)}}
              </div>
              <div style="margin-right: 5px;">
                <img style="width: 14px;" src="@/assets/image/Player/bofang.png" alt="">
              </div>
            </div>
          </div>
          <div class="link" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size: 12px;margin-top: 10px;margin-bottom: 5px;">
            {{ `[${trim(item.name).split('|')[0]}] ${trim(item.name).split('|')[1]}` }}
          </div>
          <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size: 12px;color: #666;">
            {{ `by ${item.creator.nickname}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPlayList } from '@/api/music'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'

const router = useRouter()
const dataList = ref([]);
const trim = (str) => {
  var reg = /[\t\r\f\n\s]*/g;
  let trimStr = ''
  if (typeof str === 'string') {
    trimStr = str.replace(reg, '');
  }
  return trimStr
}
const playCount = (num) => {
  if (num > 10000) {
    return `${Math.floor(num / 10000)}万` 
  } else {
    return num
  }
}
const getPlayLists = async () => {
  const loading = ElLoading.service({
    fullscreen: true
  })
  const { playlists } = await getPlayList()
  dataList.value = playlists
  setTimeout(() => {
    loading.close()
  }, 500)
}
const goPlayList = (item) => {
  console.log('goPlayList');
  router.push({
    path: 'playdetail',
    query: {
      id: item.id
    }
  })
}
onMounted(() => {
  getPlayLists()
})
</script>

<style lang="scss" scoped>
.contain {
  background-color: #F5F5F5;

  .content {
    width: 1000px;
    padding: 0 20px;
    margin: 0 auto;
    background: #FFFFFF;
    border: 1px solid #D3D3D3;
    padding-bottom: 100px;

    .header {
      display: flex;
      align-items: center;
      border-bottom: 3px solid #A80909;
      padding-bottom: 5px;
      padding-top: 20px;

      .select {
        width: 91%;
      }

      .hot {
        font-size: 14px;
        width: fit-content;
        padding: 2px 5px;
        border-radius: 2px;
        background-color: #A80909;
        color: #FFFFFF;
      }
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .list-item {
        width: 140px;
        height: 170px;
        // background-color: red;
        margin-right: 75px;
        margin-top: 33px;

        .detail {
          position: relative;
          top: -28px;
          width: 140px;
          height: 28px;
          background-color: rgba($color: #000000, $alpha: .5);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .link:hover {
          text-decoration: underline;
        }
      }

      .list-item:nth-child(5n) {
        margin-right: 0px;
      }

      .list-item:hover {
        cursor: pointer;
      }
    }
  }
}
</style>