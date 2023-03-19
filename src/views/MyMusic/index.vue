<template>
  <div>我的音乐
    <el-button @click="getLists">get</el-button>
    <div>
      <audio ref="audio" @timeupdate="timeupdate" style="display: none;" controls src="https://music.163.com/song/media/outer/url?id=1923184888"></audio>
    </div>
    <div>
      <el-button @click="pause">暂停</el-button>
      <el-button @click="play">播放</el-button>
    </div>
  </div>
</template>

<script setup>
import { getList } from '@/api/login'
import { ref } from 'vue'
const audio = ref('null')
const getLists = async () => {
  const res = await getList();
  console.log('res', res);
}
const play = () => {
  audio.value.play(); 
}
const pause = () => {
  audio.value.pause(); 
}
const timeupdate = (event) => {
  console.log('event', event);
}
</script>

<style lang="scss">

</style>