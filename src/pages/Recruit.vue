<template>
<div class="recruit-page">
  <div class="title">
  滴滴出行2018校招内推火热来袭！
  </div>
  <div class="item-row" v-for="item in recruitData">
    
    <div class="name-list">
      <div class="name-item" v-for="nameItem in item.jobs">
        {{nameItem}}
      </div>
    </div>
    <div class="link">
      <div class="link-btn" @click="gotoDetail(item.url)">
        内推链接
      </div>
      
    </div>
  </div>
</div>
</template>
<script>
import { mapState , mapMutations} from 'vuex'

  export default {
    data: function () {
      return {}
    },
    computed: {
      ...mapState([
        'recruitData'
    ])
    },
    methods: {
      gotoDetail(url) {
        this.$router.push({
          name: 'RecruitDetail',
          query: {
            url
          }
        })
      }
    }
  }
</script>
<style lang="less">
  .recruit-page {
    background-color: rgb(239, 239, 244);
    height: 100%;
    .title {
      text-align: center;
      font-size: 18px;
      padding: 10px 0px;
      color: #fa8919;
    }
  }
  .item-row {
    padding: 10px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    .name-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name-item {
        font-size: 14px;
        height: 24px;
        line-height: 24px;
      }
    }
    .link {
      width: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .link-btn {
        background: #fa8919;
        border-radius: 2px;
        color: #fff;
        padding: 5px 10px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>