<template>
  <div>
    <!-- <header>
      <div v-on:click="toPreviousPage" class="return"></div>
      <span v-text="pageTitle"></span>
    </header>
    <div class="seek">
      <i></i>
      <input type="text" placeholder="院校搜索">
    </div> -->
    <loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomPullText='bottomText' :auto-fill="false" @bottom-status-change="handleBottomChange" ref="loadmore">
      <div class="qualityCase">
        <div class="qualityCaseContent">
          <div v-for="school in countrySchoolList" v-bind:key="school.id" @click="toSchoolDetail(school)" class="qualityCaseItem clearfix">
            <div class="qualityCaseImg">
               <img :src="school.logo" alt=""> 
              <!-- <img src="../../assets/images/index/list-img-0@2x.png" alt=""> -->
            </div>
            <div class="qualityCaseInfo">
              <h4 v-text="school.nameCn"></h4>
              <div v-text="school.nameEn" class="time"></div>
              <p v-text="school.brief" class="recommend"></p>
            </div>
          </div>
        </div>
      </div>
    </loadmore>
  </div>
</template>
<script>
import loadmore from './loadmore'
export default {
  components: {
    loadmore
  },
  data() {
    return {
      pageTitle: '海外院校',
      countrySchoolList: [],
      webserviceUrl: 'https://test.hh-medic.com/admin-fast/api/list/schoolList',

      allLoaded: false,
      bottomText: '上拉加载更多...',
      bottomStatus: '',
      scrollHeight: 0,
      scrollTop: 0,
      containerHeight: 0,
      loading: false,
      pageNum: 1,
      totalCount: 0
    }
  },
  computed: {

  },
  methods: {
    getResult() {
      //let queryStr = '?countryId='++'&type=daxue&pageNum=1'
      this.$http.get(this.webserviceUrl, { params: this.$route.query })
        .then(function (response) {
          let resultList = response.body.schoolList
          if (resultList && resultList.records.length > 0) {
            this.countrySchoolList = this.countrySchoolList.concat(resultList.records)
            totalCount = resultList.pages
          }
          //total size pages          
        }).catch(function (response) {
          // this.caseList = response.body.caseList.records
        })
    },
    toPreviousPage() {
      this.$router.go(-1);
    },
    toSchoolDetail(school) {
      this.$router.push({ path: '/schoolintroduction?id=' + school.id })
    },
    _scroll: function (ev) {
      ev = ev || event;
      this.scrollHeight = this.$refs.innerScroll.scrollHeight;
      this.scrollTop = this.$refs.innerScroll.scrollTop;
      this.containerHeight = this.$refs.innerScroll.offsetHeight;
    },
    loadBottom: function () {
      this.loading = true;
      this.pageNo += 1;   // 每次更迭加载的页数
      this.pageNum += 1;   // 每次更迭加载的页数
      if (this.pageNo > this.totalCount || this.allLoaded) {
        // 当allLoaded = true时上拉加载停止
        this.loading = false;
        this.allLoaded = true;
      } else {
        this.getResult();
      }
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
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
@import "../../assets/style/public.less";
@import "../../assets/style/overseasinstitutions.less";
</style>


