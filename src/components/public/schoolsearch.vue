<template>
  <div>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
      <div class="qualityCase">
        <div class="qualityCaseContent">
          <div v-for="school in schoolList" v-bind:key="school.id" @click="toSchoolDetail(school)" class="qualityCaseItem clearfix">
            <div class="qualityCaseImg">
              <img :src="school.logo" alt="">
            </div>
            <div class="qualityCaseInfo">
              <h4 v-text="school.nameCn"></h4>
              <div v-text="school.nameEn" class="time"></div>
              <p v-text="school.brief" class="recommend"></p>
            </div>
          </div>
          <div v-if="schoolList.length==0&&pages==0" class="noResultMsg">此关键字没有搜索到相应的匹配结果。</div>
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
      pageTitle: '海外院校',
      schoolList: [],
      webserviceUrl: 'https://test.hh-medic.com/admin-fast/api/list/searchSchool',
      searchKey: '',
      pageNo: 1,
      allLoaded: false,
      pages: 1
    }
  },
  computed: {

  },
  methods: {
    getResult(callback) {
      if (!this.searchKey) {
        this.$emit('emptySearchKey')
        return false
      }
      this.$http.get(this.webserviceUrl, { params: { key: this.searchKey, pageNum: this.pageNo } })
        .then(function (response) {
          this.searched = true
          let resultList = response.body.schoolList
          if (resultList && resultList.records.length >= 0) {
            this.schoolList = this.schoolList.concat(resultList.records)
            this.pages = resultList.pages
          }
          if (callback) {
            callback();
          }
          //total size pages          
        }).catch(function (response) {
          if (callback) {
            callback();
          }
        })
    },
    toSchoolDetail(school) {
      this.$router.push({ path: '/schoolintroduction?id=' + school.id })
    },
    toPreviousPage() {
      this.$router.go(-1);
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
  created() {
    if (this.$route.params && this.$route.params.searchKey) {
      this.searchKey = this.$route.params.searchKey
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getResult();
    });
  },
  watch: {
    '$route'(to, from) {
      if (to.params.searchKey != from.params.searchKey) {
        this.searchKey = to.params.searchKey
        this.pageNo = 1
        this.schoolList = []
        this.allLoaded = false
        this.getResult()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/style/public.less";
@import "../../assets/style/overseasinstitutions.less";
</style>


