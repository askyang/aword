<template>
  <div class="works-com-wrapper">
    <ul class="works-list" v-show="currentCardList.length">
      <li v-for="(item, index) in currentCardList" :key="index" @click="selectPicture(item)  " v-if="!item.privacy || userInfo.objectId === item.userId">
        <v-MinPicture :PictureInfo="item"></v-MinPicture>
      </li>
    </ul>
    <div class="empty" v-show="!currentCardList.length">- 空空如也 -</div>
    <div class="empty">
      <span v-show="currentCardList.length && noMore">- 无更多数据 -</span>
    </div>
  </div>
</template>

<script>
import MinPicture from '@/components/minPicture.vue'
import store from '@/store.js'

export default {
  props: {
    currentCardList: {
      type: Array,
      default () {
        return []
      }
    },
    noMore: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    }
  },
  methods: {
    selectPicture (item) {
      let url = `/pages/showPicture/main?id=${item.objectId}`
      wx.navigateTo({
        url: url
      })
    },
    stringifyObject (item) {
      let res = ''
      for (let key in item) {
        if (item.hasOwnProperty(key)) {
          let value = item[key]
          res += `&${key}=${value}`
        }
      }
      return res
    }
  },
  components: {
    'v-MinPicture': MinPicture
  }
}
</script>

<style scoped lang="less">
.works-com-wrapper {
  padding: 20px 20px 50px 20px;
  ul.works-list {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 40%;
      margin: 0 5%;
      background: #fff;
      box-shadow: 1px 1px 2px 2px #eee;
      margin-bottom: 20px;
      text-align: center;
      position: relative;
      &::before {
        content: "";
        padding-top: 150%;
        float: left;
      }
      &::after {
        content: "";
        display: block;
        clear: both;
      }
    }
  }
  .empty {
    height: 30px;
    text-align: center;
    color: #aaa;
    font-size: 14px;
    line-height: 30px;
  }
}
</style>
