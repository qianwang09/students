<template>
  <div>
    <header>
      <div v-on:click="toPreviousPage" class="return"></div>
      <span v-text="pageTitle"></span>
    </header>
     <form @submit.prevent="searchSchool()" action="" class="input-kw-form">
    <div class="seek">
      <i @click="searchSchool()"></i>
      <input name="searchKey" v-model="searchKey" @focus="removeHolder()" @blur="addHolder()" type="search" :placeholder="placeHolder" 
      :class="{emptyError: searchKeyEmpty}">
    </div>
    </form>
    <router-view v-on:emptySearchKey='emptySearchKeyHandler'></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageTitle: '海外院校',
      placeHolderDefault: '院校搜索',      
      placeHolder: '院校搜索',
      searchKey: '',
      searchKeyEmpty: false,
      searchKeyEmptyMsg: '关键字不为空',      
      webserviceUrl: 'https://test.hh-medic.com/admin-fast/api/list/schoolCountry',
      countryList: [],
      schoolList: []
    }
  },
  computed: { 
  },
  methods: {
    getResult() {
      // this.$http.get(this.webserviceUrl)
      //   .then(function (response) {
      //     this.countryList = response.body.countryList;
      //     this.schoolList = response.body.schoolList
      //     //total size pages          
      //   }).catch(function (response) {
      //     // this.caseList = response.body.caseList.records
      //   })
    },
    toPreviousPage() {
      // this.searchKey = ''
      // this.placeHolder = this.placeHolderDefault
      this.$router.go(-1)
    },
    removeHolder() {
      if (!this.searchKey) {
        this.placeHolder = ''
      }
    },
    addHolder() {
      if (!this.searchKey) {
        this.placeHolder = this.placeHolderDefault
      }else{
        if(this.searchKeyEmpty){
          this.searchKeyEmpty = false
        }
      }
    },
    searchSchool() {
      //searchKey not null empty
      if(this.searchKey){
      this.$router.push('/institution/search/' + this.searchKey)
      }else{
        this.searchKeyEmpty = true
        this.placeHolder = this.searchKeyEmptyMsg
      }
    },
    emptySearchKeyHandler() {
      if(!this.searchKey){
      this.addHolder()
      }
        this.searchSchool()
      
    }
  },
    created() {

    },
    mounted() {
      if(this.$route.params.searchKey){
      this.searchKey = this.$route.params.searchKey
      }
      // this.$nextTick(() => {
      //   this.getResult();
      // });
    }
  }
</script>
<style lang="less" scoped>
@import "../assets/style/public.less";
@import "../assets/style/overseasinstitutions.less";
</style>


