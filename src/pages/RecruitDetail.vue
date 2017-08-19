<template>
<div class="recruit-detail">
  <div class="qrimg-wrap">
    <img :src="qrLink" />
    <div class="tip-text">
      长按图片可保存二维码
    </div>
  </div>
  
  <div class="title">
    PC端链接:
  </div>
  <div class="link">
    {{pcLink}}
  </div>
  <div class="title">
    移动端链接:
  </div>
  <div class="link">
    {{h5Link}}
  </div>
  <div class="title">
    内推活动安排:
  </div>
   <div class="link">
    内推活动时间：8.07-8.25 笔试时间：8.26 面试时间：8.28-9.08 offer发放时间：9月
  </div>
  <div class="title">
    内推对象:
  </div>
   <div class="link">
    2018届应届毕业生
  </div>
</div>
</template>
<script>
import { mapState , mapMutations} from 'vuex'

  export default {
    data: function () {
      return {
        url: ''
      }
    },
    computed: {
      pcLink: function() {
        return `https://www.nowcoder${this.url}?type=neitui&source=D11190`
      },
      h5Link: function() {
        return `https://m.nowcoder${this.url}?type=neitui&source=D11190`
      },
      qrLink: function () {
        var encodeUrl = encodeURIComponent(`https://m.nowcoder.com${this.url}?type=neitui&source=D11190`);
        return `https://www.nowcoder.com/qr/to?url=${encodeUrl}&size=200`
      }
    },
    created() {
      console.log(this.$route)
      let {url} = this.$route.query;
      this.url = url;
    }
  }
</script>
<style lang="less">
  .recruit-detail {
    background-color: rgb(239, 239, 244);
    height: 100%;
    padding: 10px;
    .qrimg-wrap {
      text-align: center;
      margin: 10px 0px;
    }
    .tip-text {
      text-align: center;
      color: #fa8919;
      margin-top: 10px;
    }
    .title {
      font-size: 16px;
    }
    .link {
      color: #999;
      word-wrap: break-word;
      word-break: break-all;
      margin: 10px 0px;
    }
    .copy-btn {
      background: #fa8919;
      border-radius: 5px;
      color: #fff;
      padding: 5px 10px;
      font-size: 18px;
      text-align: center;
    }
  }
</style>