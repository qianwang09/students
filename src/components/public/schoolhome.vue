<template>
  <div>
    <!-- <header>
          <router-link to="/" class="return"></router-link>
          <span v-text="pageTitle"></span>
        </header>
        <div class="seek">
          <i></i>
          <input type="text" placeholder="院校搜索">
        </div> -->
    <div class="qualityCase">
      <div class="qualityCaseHeader clearfix">
        <i class="schoolsIcon"></i>
        <span class="schoolTitle">国家院校</span>
        <router-link to="/institution/countryAll">更多
          <em></em>
        </router-link>
      </div>
      <div class="qualityCaseContent">
        <div class="schoolCont">
          <div class="schoolsItem clearfix" v-for="country in countryList" v-bind:key="country.id" @click="toInstitutionCountry(country)">
            <img :src="country.logo" alt="" class="schoolImg">
            <strong class="schoolName">{{country.nameChinese}}{{country.schoolType | schoolTypeFormat}}</strong>
            <span class="schoolNum">共
              <em v-text="country.count"></em>所学校</span>
            <i class="schoolIcon"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="interval"></div>
    <div class="qualityCase">
      <div class="qualityCaseHeader clearfix">
        <i class="recommendIcon"></i>
        <span class="schoolTitle">推荐院校</span>
        <router-link to="/institution/schoolAll">更多
          <em></em>
        </router-link>
      </div>
  
      <div class="qualityCaseContent">
  
        <div v-for="school in schoolList" v-bind:key="school.id" @click="toSchoolDetail(school)" class="qualityCaseItem clearfix">
          <div class="qualityCaseImg">
            <!-- <img src="../../assets/images/index/list-img-0@2x.png" alt=""> -->
            <img :src="school.logo" alt="">
          </div>
          <div class="qualityCaseInfo">
            <h4 v-text="school.nameCn"></h4>
            <div v-text="school.nameEn" class="time"></div>
            <p v-text="school.brief" class="recommend"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageTitle: '海外院校',
      webserviceUrl: 'https://test.hh-medic.com/admin-fast/api/list/schoolCountry',
      countryList: [],
      schoolList: []
    }
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

  computed: {

  },
  methods: {
    getResult() {
      this.$http.get(this.webserviceUrl, { paras: this.$route.query })
        .then(function (response) {
          this.countryList = response.body.countryList;
          this.schoolList = response.body.schoolList
          //total size pages          
        }).catch(function (response) {
          // this.caseList = response.body.caseList.records
        })
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
    toSchoolDetail(school) {
      this.$router.push({ path: '/schoolintroduction?id=' + school.id })
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