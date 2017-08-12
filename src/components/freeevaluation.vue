<template>
  <div>
    <header>
      <!-- <router-link to="/" class="free-evaluation return"></router-link> -->
      <div v-on:click="toPreviousPage" class="return"></div>
      <span v-text="pageTitle"></span>
    </header>
    <div v-show="showMain" class="main">
      <div class="requiredFields">
        <div class="requiredItem">
          <em>*</em>
          <label for="country">申请国家
            <span>(可多选)</span>
          </label>
          <input v-model="applyCountry" @click="openCountry()" :class="{errorInput: !applyCountryValid}" type="text" id="country" readonly>
          <!-- <input type="text" placeholder="(可多选)" id="country" readonly> -->
          <i @click="openCountry()"></i>
        </div>
        <p v-show="!applyCountryValid" class="warning">申请学位不能为空</p>
        <div class="requiredItem">
          <em>*</em>
          <label for="degree">申请学位
            <span>(可多选)</span>
          </label>
          <input v-model="applyDegree" @click="openDegree()" :class="{errorInput: !applyDegreeValid}" type="text" id="degree" readonly>
          <!-- <input type="text" placeholder="(可多选)" id="degree" readonly> -->
          <i></i>
        </div>
        <p v-show="!applyDegreeValid" class="warning">申请学位不能为空</p>
        <div class="requiredItem">
          <em>*</em>
          <label for="score">在校平均成绩
            <span>(百分制)</span>
          </label>
          <input v-model="gpa" :class="{errorInput: !gpaValid}" type="number" id="score">
          <!-- <input type="text" placeholder="(百分制)" id="score">  -->
        </div>
        <p v-show="!gpaValid" class="warning">在校平均成绩错误</p>
        <div class="requiredItem" id="requireItemLine">
          <em>*</em>
          <label for="telephone">手机号</label>
          <input v-model="mobile" :class="{errorInput: !mobileValid}" @focus="clearMobilePlaceHolder" @blur="addMobilePlaceHolder" :placeholder="mobilePlaceHolder" type="number" id="telephone">
        </div>
        <p v-show="!mobileValid" class="warning">手机号格式错误</p>
      </div>
      <div class="interval"></div>
      <div class="applyMajor">
        <div class="applyMajorItem">
          <label for="major">申请专业</label>
          <input v-model="applyProfessional" type="text" id="major">
        </div>
        <div class="applyMajorItem">
          <label for="EnglishScore">托福/雅思成绩 (预计)</label>
          <input v-model="enResult" type="text" id="EnglishScore">
        </div>
        <div class="applyMajorItem">
          <label for="sat">SAT/ACT (预计)</label>
          <input v-model="satResult" type="text" id="sat">
        </div>
        <div class="applyMajorItem">
          <label for="gre">GRE/GMAT成绩 (预计)</label>
          <input v-model="greResult" type="text" id="gre">
        </div>
  
        <!--填写更多-->
        <div class="more" v-if="!showMore" @click="showMoreClick()">填写更多
          <i></i>
        </div>
        <div v-if="showMore">
          <div class="applyMajorItem">
            <label for="school">就读学校</label>
            <input v-model="applySchool" type="text" id="school">
          </div>
          <div class="applyMajorItem">
            <label for="education">当前学历</label>
            <input v-model="currentEdc" type="text" id="education">
          </div>
          <div class="applyMajorItem">
            <label for="abroad">预计出国时间</label>
            <input v-model="outTime" @click="open('outTimePicker')" type="text" id="outTime" readonly="readonly" />
            <!-- <mu-date-picker :underlineShow="false" format="YYYY-MM-DD HH:mm:ss" v-model="outTime" inputClass="dateClass" /> -->
            <mt-datetime-picker ref="outTimePicker" v-model="selectedOutTime" @confirm="selectOutTime" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日">
            </mt-datetime-picker>
            <!-- <input type="text" id="abroad"> -->
          </div>
        </div>
      </div>
    </div>
    <div v-show="showCountry" class="main">
      <div class="applyMajor">
        <div v-for="country in countryList" v-bind:key="country.id" @click="selectCountry(country)" class="applyMajorItem applyMajorItemChoose">
          <strong class="country" v-text="country.nameChinese" :class="{itemSelected: countrySelected(country)}"></strong>
        </div>
        <div @click="confirmApplyCountry()" class="confirmApplyCountry">完成</div>
      </div>
    </div>
  
    <div v-show="showDegree" class="main">
      <div class="applyMajor">
        <div v-for="degree in degreeList" v-bind:key="degree" @click="selectDegree(degree)" class="applyMajorItem applyMajorItemChoose">
          <strong class="degree" v-text="degree" :class="{itemSelected: degreeSelected(degree)}"></strong>
        </div>
        <div @click="confirmApplyDegree()" class="confirmApplyCountry">完成</div>
      </div>
    </div>
    <footer v-show="showMain">
      <p>注：带
        <em>*</em> 号为必填项，其它为非必填</p>
      <div v-if="submitFailed" v-text="submitErrorMsg" class="submitErrorMsg"></div>
      <div @click="submitEvaluation" class="submitBtn">提交</div>
    </footer>
    <div class="submitSuccess" v-show="showSuccessDialog"></div>
    <div class="submitCont" v-show="showSuccessDialog">
      <i class="submitIcon"></i>
      <span class="submitInfo">提交成功</span>
      <p>工作人员稍后与您联系，请耐心等待</p>
      <div @click="confirmSuccessReturn()" class="submitBtn">完成</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: '免费评估',
      pageTitle: '免费评估',
      showMore: false,
      showMain: true,
      showCountry: false,
      webserviceUrlCountry: 'https://test.hh-medic.com/admin-fast/api/form/list',
      webserviceUrlEvaluation: 'https://test.hh-medic.com/admin-fast/api/form/apply',
      countryList: [],
      applyCountryList: [],
      applyCountryValid: true,

      showDegree: false,
      degreeList: ['学士', '硕士', '博士'],
      applyDegreeList: [],
      applyDegreeValid: true,
      gpa: '',
      gpaValid: true,

      mobile: '',
      mobileValid: true,
      mobilePlaceHolder: '请输入手机号',
      mobilePlaceHolderDefault: '请输入手机号',
      applyProfessional: '',
      enResult: '',
      satResult: '',
      coopId: 1000,
      coopName: '',
      // sat
      greResult: '',
      applySchool: '',
      currentEdc: '',
      selectedOutTime: new Date(),
      outTime: '',

      email: '',
      id: 0,
      isExist: false,
      studioId: 0,
      status: '',
      submitFailed: false,
      submitErrorMsg: '',
      showSuccessDialog: false,

    }
  },
  methods: {

    getResult() {
      this.$http.get(this.webserviceUrlCountry)
        .then(function (response) {
          this.countryList = response.body.countryList
          // let resultList = response.body.caseList
          // if (resultList && resultList.records.length > 0) {
          //   this.caseList = resultList.records;
          //   this.total = resultList.pages
          // }
        }).catch(function (response) {
          // this.caseList = response.body.caseList.records
        })
    },
    toPreviousPage() {
      // this.searchKey = ''
      // this.placeHolder = this.placeHolderDefault
      if (this.showCountry || this.showDegree) {
        this.showCountry = false
        this.showDegree = false
        this.showMain = true
      } else {
        this.$router.go(-1)
      }
    },
    showMoreClick() {
      this.showMore = true
    },
    openCountry() {
      // this.applyCountry = ''
      // this.countryList = []
      this.showMain = false
      this.showDegree = false
      this.showCountry = true
      this.pageTitle = '申请国家'
    },
    confirmApplyCountry() {
      this.showMain = true
      this.showDegree = false
      this.showCountry = false
      this.pageTitle = '免费咨询'
    },
    selectCountry(country) {
      let selectedIndex = -1
      this.applyCountryList.forEach((x, i) => {
        if (x == country.nameChinese) {
          selectedIndex = i
        }
      });
      if (selectedIndex > -1) {
        this.applyCountryList.splice(selectedIndex, 1)
      } else {
        this.applyCountryList.push(country.nameChinese)
      }

    },
    countrySelected(country) {
      console.log(country)
      return this.applyCountry.indexOf(country.nameChinese) > -1
    },
    openDegree() {
      this.showMain = false
      this.showDegree = true
      this.showCountry = false
    },
    confirmApplyDegree() {
      this.showMain = true
      this.showDegree = false
      this.showCountry = false
    },
    selectDegree(degree) {
      let selectedIndex = -1
      this.applyDegreeList.forEach((x, i) => {
        if (x == degree) {
          selectedIndex = i
        }
      });
      if (selectedIndex > -1) {
        this.applyDegreeList.splice(selectedIndex, 1)
      } else {
        this.applyDegreeList.push(degree)
      }
    },
    degreeSelected(degree) {
      return this.applyDegree.indexOf(degree) > -1
    },
    clearMobilePlaceHolder() {
      this.mobilePlaceHolder = ''
    },
    addMobilePlaceHolder() {
      if (!this.moible) {
        this.mobilePlaceHolder = this.mobilePlaceHolderDefault
      }
    },
    selectOutTime(value) {
      this.outTime = value.getFullYear() + '-' + (value.getMonth()+1) + '-' + value.getDate()
      // this.outTime = value.toISOString().substring(0,10);
    },
    open(picker) {
      this.$refs[picker].open();
    },
    submitEvaluation() {
      //check validation
      let validationSuccess = true
      this.applyCountryValid = true
      this.applyDegreeValid = true
      this.gpaValid = true
      this.mobileValid = true
      if (!this.applyCountry) {
        this.applyCountryValid = false
        validationSuccess = false
      }
      if (!this.applyDegree) {
        this.applyDegreeValid = false
        validationSuccess = false
      }
      if (!this.gpa || this.gpa > 100 || this.gpa < 0) {
        this.gpaValid = false
        validationSuccess = false
      }
      let mobileStr = this.mobile.toString()
      if (mobileStr.substring(0, 1) != '1' || mobileStr.length != 11) {
        this.mobileValid = false
        validationSuccess = false
      }
      //验证失败 返回
      if (!validationSuccess) {
        return false
      }
      let createTime = new Date()
      let formData = {
        applyCountry: this.applyCountry,
        applyDegree: this.applyDegree,
        applyProfessional: this.applyProfessional,
        applySchool: this.applySchool,
        currentEdc: this.currentEdc,
        enResult: this.enResult,
        satResult: this.satResult,
        gpa: this.gpa,
        greResult: this.greResult,
        mobile: this.mobile,
        outTime: this.outTime + " 00:00:00",
        coopId: this.coopId,
        createTime: createTime.getFullYear() + '-' + (createTime.getMonth()+1) + '-' + createTime.getDate() + " 00:00:00",
        // coopName: this.coopName,
        // studioId: this.studioId,
        // userId: 0,
        // isExist: this.isExist,
        // email: '',
        // status: this.status
      }
      this.submitFailed = false
      this.submitErrorMsg = ''
      this.$http.post(this.webserviceUrlEvaluation, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" }
      }).then(function (response) {
        if (response.body.code == '0') {
          this.showSuccessDialog = true
        } else {
          this.submitFailed = true
          this.submitErrorMsg = 'Error: ' + response.body.msg
        }
        //total size pages          
      }).catch(function (response) {
        // this.caseList = response.body.caseList.records
        this.submitFailed = true
        this.submitErrorMsg = response.body.msg
      })
    },
    confirmSuccessReturn() {
      this.$router.go(-1);
    }

  },
  computed: {
    applyCountry() {
      return this.applyCountryList.join(',')
    },
    applyDegree() {
      return this.applyDegreeList.join(',')
    }

  },
  components: {

  },
  filters: {

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
@import "../assets/style/free-evaluation.less";
</style>





