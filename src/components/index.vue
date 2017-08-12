<template>
  <div>
    <header>
      <h1 v-text="pageTitle"></h1>
    </header>
    <div class="main">
      <myswiper :bannerList="bannerList"></myswiper>
      <div class="specialService clearfix">
        <router-link to="/evaluation" class="free-evaluation"></router-link>
        <router-link to="/institution" class="overseas-institutions"></router-link>
      </div>
      <div class="interval"></div>
      <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
      <div class="qualityCase">
        <div class="qualityCaseHeader clearfix">
          <i class="caseExampleIcon"></i>
          <span v-text="caseExampleName" class="caseExampleTitle"></span>
          <router-link to="/case/list">更多
            <em></em>
          </router-link>
        </div>
        <div class="qualityCaseContent">
          <div v-for="cases in caseList" :key="cases.id" class="qualityCaseItem clearfix">
  
            <div class="qualityCaseImg">
              <img :src="cases.logo" alt="">
            </div>
            <div class="qualityCaseInfo" @click="toCaseDetail(cases)">
              <h4 v-text="cases.title"></h4>
              <p v-text="cases.brief"></p>
              <div class="time">{{cases.createTime |dateFormat}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- </mt-loadmore> -->
    </div>
    <div @click="openTelDilog('bottom')" class="tel"> </div>
    <div v-show="showModal" class="evaluationModal"></div>
    <div v-show="showModal" class="telCont">
      <div class="telContMain">
        <p>您可通过电话方式免费获得咨询</p>
        <div class="telNumber">
          <a href="tel:13811609849" @click="closeTelDilog('bottom')"></a>
        </div>
      </div>
      <div class="telContCancel">
        <div @click="closeTelDilog('bottom')">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
import myswiper from './public/swiper'
export default {
  components: {
    myswiper,
  },
  data() {
    return {
      pageTitle: '邦邦留学',
      caseExampleName: '优质案例',
      bannerList: [],
      caseList: [],
      webService: 'https://test.hh-medic.com/admin-fast/api/index',
      showModal: false
    }
  },
  computed: {
  },
  methods: {
    openTelDilog() {
      this.showModal = true
    },
    closeTelDilog() {
      this.showModal = false
    },
    getResult(callback) {
      this.$http.get(this.webService)
        .then(function (response) {
          let result = response.body;
          if (result.code == 0) {
            this.bannerList = result.bannerList
            this.caseList = result.caseList.records
          }
          if (callback) {
            callback()
          }
        }).catch(function (response) {
          if (callback) {
            callback()
          }
        })
    },
    toCaseDetail(cases) {
      this.$router.push({ path: 'case/detail', query: { id: cases.id } })
    }
  },
  filters: {
    dateFormat(dt) {
      return dt.substring(0, 10);
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(() => {
      this.getResult();
    });
  }
}
</script>
<style  lang="less" scoped>
@import "../assets/style/index.less";
@import "../assets/style/public.less";
//开发环境把图片引入打包过程
.test {
  background-image: url("../assets/images/carousel@2x.png")
}

.test2 {
  background-image: url("../assets/images/overseas-institutions.png")
}
</style> 

