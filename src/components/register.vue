<template>
  <div>
    <header>
      <!-- <a href="javascript:;" class="return"></a> -->
       <div v-on:click="toPreviousPage" class="return"></div>
      <span>注册</span>
    </header>
    <div class="main container">   
      <div v-if="showRegister">   
        <div class="registerItem ">
          <i class="tip">手机号</i>
          <input v-model="mobile" @blur="mobileCheck" name="moblie" type="number" class="telInp" :class="{errorClass: mobileError}">
          <!-- <input v-model="mobile" name="moblie" type="number" v-validate="{ rules: { regex: / ^1([0-9]{8})$/} }" class="telInp"> -->

          <em class="cancel" @click="mobileClear()"></em>
        </div>
        <div class="registerItem">
          <i class="tip">验证码</i>
          <input v-model="password" @blur="passwordCheck" :class="{errorClass: passwordError}" v-validate="'required'" type="text" class="getCode">
          <span class="getCodeBtn">获取验证码</span>
        </div>
        <div>
          <div @click="register()" class="submitBtn">注册</div>
        </div>  
      </div>
            <div class="submitCont" v-show="showSuccessDialog">
      <i class="submitIcon"></i>
      <span class="submitInfo">注册成功</span>
      <p>马上返回上一页面</p>
      <div @click="confirmSuccess()" class="submitBtn" >完成</div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mobile: null,
      mobileError: false,
      passwordError: false,
      password: '',
      showRegister: true,
      showSuccessDialog: false,
      webserviceUrl: 'https://test.hh-medic.com/admin-fast/api/register'
    }
  },
  methods: {
  register() {
      this.$http.post(this.webserviceUrl, {},{params: {mobile:this.mobile, password: this.password}})
        .then(function (response) {
          if(response.status == 200 && response.body.code == 0){
            this.showSuccessDialog = true
            this.showRegister = false
            setTimeout(()=> this.confirmSuccess(), 2000)
          }       
          //total size pages          
        }).catch(function (response) {
          // this.caseList = response.body.caseList.records
          this.showSuccessDialog = false
            this.showRegister = true
        })
    },
    toPreviousPage(){
      this.$router.go(-1)
    },
    mobileClear(){
      this.mobile = ''
    },
    mobileCheck(){
     let mobileStr = this.mobile.toString();
     if(mobileStr.substring(0,1) != '1' || mobileStr.length != 9){
       this.mobileError = true
     }else{
       this.mobileError = false
     }
    },
    passwordCheck() {
      let str = this.password.toString();
      if(str.length < 6){
       this.passwordError = true
     }else{
       this.passwordError = false
     }
    },
    confirmSuccess(){
      // this.showSuccessDialog = false
      alert("success confirm!")
      // this.$router.push(-1);
    }
  }


}
</script>
<style lang="less" scoped>
@import "../assets/style/public.less";
@import "../assets/style/register.less";
.errorClass{
  border: 1px solid red;
}
</style>

