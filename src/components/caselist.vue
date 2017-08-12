<template>
  <div>
    <header>
      <div v-on:click="toPreviousPage" class="return"></div>
      <span v-text="pageTitle"></span>
    </header>
    <!-- <div class="seek">
          <i></i>
          <input type="text" placeholder="院校搜索">
        </div> -->
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="qualityCase">
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
    </mt-loadmore>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      pageTitle: '优质案例',
      webserviceUrl: 'https://test.hh-medic.com/admin-fast/api/list/caseList',
      caseList: [],
      pageNo: 1,
      allLoaded: false,
      pages: 0
    }
  },
  computed: {

  },
  methods: {
    getResult(callback) {
      this.$http.get(this.webserviceUrl, { params: { pageNum: this.pageNo } })
        .then(function (response) {
          let resultList = response.body.caseList
          if (resultList && resultList.records.length > 0) {
            this.caseList = this.caseList.concat(resultList.records);
            this.pages = resultList.pages
          }
          if (callback) {
            callback();
          }
        }).catch(function (response) {
          if (callback) {
            callback();
          }
        })
    },
    toPreviousPage() {
      this.$router.go(-1);
    },
    toCaseDetail(cases) {
      this.$router.push({ path: '/case/detail', query: { id: cases.id } })
    },  
    loadBottom: function () {
      this.pageNo += 1;   // 每次更迭加载的页数
      if (this.pageNo > this.pages || this.allLoaded) {
        // 当allLoaded = true时上拉加载停止
        this.allLoaded = true
        this.$refs.loadmore.onBottomLoaded()
      } else {
        this.getResult(() => { this.$refs.loadmore.onBottomLoaded(); });
      }
    },
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
<style lang="less" scoped>
@import "../assets/style/public.less";
@import "../assets/style/overseasinstitutions.less";
</style>


