<template>
  <div class="contain">
    <div class="content">
      <div class="content-left">
        <div style="display: flex;justify-content: end;"><el-button @click="goBack" size="small">返回歌单</el-button></div>
        <div class="playlist-detail">
          <div>歌单详情块</div>
          <img src="@/assets/image/doing.jpg" alt="">
        </div>
        <div class="song-list">
          <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
            <el-table-column type="index" width="50" />
            <el-table-column label="" width="30">
              <template #default="scope">
                <img class="play" style="width: 20px;position: relative;left:-10px;top:-1px;" @click="play(scope.row)" src="@/assets/image/Player/bofang.png" alt="">
              </template>
            </el-table-column>
            <!-- <el-table-column prop="name" label="歌曲标题" width="240" /> -->
            <el-table-column label="歌曲标题" width="300px">
              <template #default="scope">
                <div style="font-size: 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="时长" width="80px">
              <template #default="scope">
                <div style="font-size: 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ timeFormat(scope.row.dt) }}</div>
              </template>
            </el-table-column>
            <el-table-column label="歌手" >
              <template #default="scope">
                <div style="font-size: 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ scope.row.ar[0].name }}</div>
              </template>
            </el-table-column>
            <el-table-column label="专辑" >
              <template #default="scope">
                <div style="font-size: 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ scope.row.al.name }}</div>
              </template>
            </el-table-column>
            
          </el-table>
        </div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>

<script setup>
import { getListSong } from '@/api/music'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import timeFormat from '@/utils/timeFormat'
import { useStore } from 'vuex'
import router from '@/router'


const route = useRoute()
const store = useStore()
const loading = ref(false)
const tableData = ref([])
const getListSongs = async () => {
  loading.value = true
  const { songs } = await getListSong(route.query.id)
  tableData.value = songs
  loading.value = false
}
const play = (item) => {
  // console.log('play',id);
  const params = {
    id: item.id,
    name: item.name,
    artists: [
      {
        name: item.ar[0].name
      }
    ],
    duration: item.dt
  }
  store.commit('songInfoMutation', params)
}
const goBack = () => {
  router.push({
    path: '/home/playlist'
  })
}
onMounted(() => {
  getListSongs()
})

</script>

<style lang="scss" scoped>
.contain {
  background-color: #F5F5F5;

  .content {
    width: 1000px;
    border-left: 1px solid #D3D3D3;
    border-right: 1px solid #D3D3D3;
    margin: 0 auto;
    height: 2000px;
    background-color: #fff;
    display: flex;

    .content-left {
      padding: 20px 20px;
      width: 75%;
      border-right: 1px solid #D3D3D3;

      .playlist-detail {
        height: 300px;
      }

      .song-list {
        .play:hover {
          cursor: pointer;
        }
      }
    }

    .content-right {
      flex: 1;
    }
  }
}
</style>