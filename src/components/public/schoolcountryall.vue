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
    <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
      <div class="schoolCont">
        <div class="schoolsItem clearfix" v-for="country in countrySchoolList" v-bind:key="country.id" @click="toInstitutionCountry(country)">
          <img src="../../assets/images/colleges-0.png" alt="" class="schoolImg">
          <strong class="schoolName">{{country.nameChinese}}{{country.schoolType | schoolTypeFormat}}</strong>
          <span class="schoolNum">共
            <em v-text="country.count"></em>所学校</span>
          <i class="schoolIcon"></i>
        </div>
      </div>
    <!-- </mt-loadmore> -->
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      pageTitle: '海外院校',
      webserviceUrl: 'https://test.hh-medic.com/admin-fast/api/list/schoolCountryList',
      countrySchoolList: [],
      // pageNo: 1,
      // allLoaded: false,
      // pages: 1
    }
  },
  computed: {

  },
  methods: {
    getResult() {
      this.$http.get(this.webserviceUrl)
        .then(function (response) {
          let resultList = response.body.countryList
          if (resultList && resultList.length > 0) {
            this.countrySchoolList = response.body.countryList;
          }
          // let resultList = response.body.caseList
          // if (resultList && resultList.records.length > 0) {
          //   this.caseList = this.caseList.concat(resultList.records);
          //   this.pages = resultList.pages
          // 
          //total size pages          
        }).catch(function (response) {
         
        })
    },
    toPreviousPage() {
      this.$router.go(-1);
    },
    toInstitutionCountry(country) {
      this.$router.push({
        path: '/institution/country',
        query: {
          countryId: country.countryId,
          type: country.schoolType,
          pageNum: 1
        }
      })
    },
    // loadBottom: function () {
    //   this.pageNo += 1;   // 每次更迭加载的页数
    //   if (this.pageNo > this.pages || this.allLoaded) {
    //     // 当allLoaded = true时上拉加载停止
    //     this.allLoaded = true
    //     this.$refs.loadmore.onBottomLoaded()
    //   } else {
    //     this.getResult(() => { this.$refs.loadmore.onBottomLoaded(); });
    //   }
    // },
  },
  filters: {
    schoolTypeFormat(schoolType) {
      if (schoolType == 'daxue') {
        return '大学'
      } else {
        return '高中'
      }
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
@import "../../assets/style/public.less";
@import "../../assets/style/overseasinstitutions.less";
</style>


