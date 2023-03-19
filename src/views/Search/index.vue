<template>
  <div class="content-out">
    <div class="content">
      <el-input v-model="search" @keydown.enter="searchSongs" style="width: 370px;height: 40px;"></el-input>
      <el-button style="height: 40px;" @click="searchSongs">搜索</el-button>
    </div>
    <div class="tabs">
      <el-tabs type="card" stretch>
        <el-tab-pane label="单曲"></el-tab-pane>
        <el-tab-pane label="歌手"></el-tab-pane>
        <el-tab-pane label="专辑"></el-tab-pane>
        <el-tab-pane label="视频"></el-tab-pane>
        <el-tab-pane label="歌词"></el-tab-pane>
        <el-tab-pane label="歌单"></el-tab-pane>
        <el-tab-pane label="声音主播"></el-tab-pane>
        <el-tab-pane label="用户"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="list">
      <div v-for="item in List" :key="item.id" class="list-item">
        <div style="margin-left: 50px;flex: 6;">
          <img style="width: 20px;" @click="changeSong(item)" src="@/assets/image/Player/bofang.png" alt="">
          {{ item.name }}
        </div>
        <div style="color: blue;flex: 1">
          {{ item.artists[0].name }}
        </div>
        <div style="flex: 2;
                display: inline-block;
                white-space: nowrap;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;">
          {{ "《" + item.album.name + "》" }}
        </div>
        <div style="flex: 1;margin-left: 50px;">
          {{ timeFormat(item.duration) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getListByName } from '@/api/music'
import { useStore } from 'vuex'
import timeFormat from '@/utils/timeFormat'
const route = useRoute()
const store = useStore()
const search = ref(route.query.name)
const List = ref([])
const searchSongs = async () => {
  const { result } = await getListByName(search.value)
  List.value = result.songs
}
const changeSong = (item) => {
  store.commit('songInfoMutation', item)
}
onMounted(() => {
  searchSongs()
})
</script>

<style lang="scss" scoped>
.content-out {
  .content {
    width: 1000px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
    :deep(.el-input__wrapper) {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    :deep(.el-button) {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      position: relative;
      left: -1px;
      z-index: 99;
    }
  }
  .tabs {
    width: 1000px;
    margin: 0 auto;
  }

  .list {
    width: 1000px;
    margin: 0 auto;
    margin-bottom: 60px;

    .list-item {
      height: 42px;
      font-size: 12px !important;
      display: flex;
      line-height: 42px;
      align-content: center;

    }

    .list-item:nth-child(2n) {
      background-color: #F7F7F7;
    }
  }
}
</style>