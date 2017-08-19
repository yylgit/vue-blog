import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Recruit from '@/pages/Recruit.vue';
import RecruitDetail from '@/pages/RecruitDetail.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/recruit',
      name: 'Recruit',
      component: Recruit
    },
    {
      path: '/recruitdetail',
      name: 'RecruitDetail',
      component: RecruitDetail
    },
  ]
})
