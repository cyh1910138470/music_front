<template>
  <div class="content">
    <audio ref="audio" @timeupdate="timeupdate" style="display: none;" controls :src="songUrl"></audio>
    <div class="player">
      <div class="left">
        <div class="pre-song">
          <img  style="width: 30px;" src="@/assets/image/Player/yduishangyiqu.png" alt="">
        </div>
        <div class="state-change" @click="changeState">
          <img v-if="isPlay" style="width: 40px;" @click="play" src="@/assets/image/Player/bofang.png" alt="">
          <img v-else style="width: 40px;" @click="pause" src="@/assets/image/Player/caozuo-bofang-zanting.png" alt="">
        </div>
        <div class="next-song">
          <img style="width: 30px;" src="@/assets/image/Player/yduixiayiqu.png" alt="">
        </div>
      </div>
      <div class="center">
        <div class="center-left"></div>
        <div class="center-right">
          <div class="">
            <span style="font-size: 16px;color: antiquewhite;">{{ songName }}</span>
            <span style="font-size: 14px;margin-left: 10px;color: gray;">{{ artist }}</span>
          </div>
          <div class="center-progress">
            <div class="progress">
              <div class="current-time">
                <div class="point">
                  <div class="point-red"></div>
                </div>
              </div>
            </div>
            <div class="time">{{ timeleft }}/{{ timeright }}</div>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import timeFormat from '@/utils/timeFormat'
const store = useStore()
const id = ref(store.state.songInfo?.id || 28181103)
console.log('id', id);
const songUrl = ref(`https://music.163.com/song/media/outer/url?id=${id.value}`)
const audio = ref('null')
const isPlay = ref(true)
const isFirst = ref(true)
const songName = ref('步步')
const artist = ref('五月天')
const currentStamp = ref(0)
let width = ref('3%')
const timeleft = ref('00:00')

let all = ref(246378)
const timeright = ref(timeFormat(all.value))
const changeState = () => {
  isPlay.value = !isPlay.value
}
const timeupdate = (event) => {
  if (isFirst.value) {
    isFirst.value = false
    currentStamp.value = event.timeStamp;
  }
  console.log('event', event);
  let timeuse = event.timeStamp - currentStamp.value;
  const temp = ((timeuse * 1000) / (all.value*1000)) * 100
  if (temp>=99.5) {
    setTimeout(() => {
      isFirst.value = true
      isPlay.value = true
      width.value = '3%'
      timeleft.value = '00:00'
    }, 1500)
    return
  }
  timeleft.value = timeFormat(timeuse)
  if (temp <= 3) {
    return
  }
  width.value = temp + '%'
  
}
const play = () => {
  width.value = '3%'
  audio.value.play(); 
}
const pause = () => {
  audio.value.pause(); 
}
watch(() => store.state.songInfo, (newValue) => {
  console.log('监听到变化', newValue);
  width.value = '3%'
  timeleft.value = '00:00'
  songUrl.value = `https://music.163.com/song/media/outer/url?id=${newValue.id}`
  // id.value = newValue.id
  audio.value.pause();
  songName.value = newValue.name
  artist.value = newValue.artists[0].name
  timeright.value = timeFormat(newValue.duration)
  all.value = newValue.duration
  isFirst.value = true
  isPlay.value = false
  
  setTimeout(() => {
    audio.value.play();
  })
}, {
  deep: true
})
</script>

<style lang="scss" scoped>
.content {
  position: fixed;
  bottom: 0;
  height: 60px;
  background: linear-gradient(#4B4B4B, #212121);
  width: 100%;
  z-index: 999999999999;
  .player {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    .left {
      width: 17%;
      height: 100%;
      display: flex;
      align-items: center;
      .pre-song {
        margin-right: 10px;
      }
      .state-change {
        margin-right: 10px;
      }
      .next-song {

      }
      .next-song, .state-change, .pre-song:hover {
        cursor: pointer;
      }
    }
    .center {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      .center-left {
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 5px;
      }
      .center-right {
        margin-left: 20px;
        height: 70%;
        flex: 1;
        // background-color: #fff;
        .center-progress {
          display: flex;
          align-items: center;
          height: 70%;
          .progress {
            flex: 1;
            height: 10px;
            background-color: #212121;
            border-radius: 5px;
            border-bottom: 1px solid rgba(128, 128, 128, 0.466);
            .current-time {
              height: 10px;
              width: v-bind(width);
              background-color: #C70C0C;
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              .point {
                position: relative;
                width: 14px;
                height: 14px;
                background-color: #fff;
                border-radius: 7px;
                display: flex;
                justify-content: center;
                align-items: center;
                .point-red {
                  width: 6px;
                  height: 6px;
                  background-color: #B9180F;
                  border-radius: 3px;
                }
                .point-red:hover {
                  cursor: pointer;
                }
              }
            }
          }
          .time {
            margin-left: 10px;
            width: 5%;
            color: #fff;
            font-size: 14px;
          }
        }
      }
    }
    .right {
      width: 20%;
      height: 100%;
    }
  }
}
</style>