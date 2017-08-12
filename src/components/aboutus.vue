<template>
<div>
  <header>
    <div v-on:click="toPreviousPage" class="return"></div>
    <span>关于我们</span>
</header>
<div class="main">
    <div class="companyInfo">
        <h2 class="title">公司简介</h2>
        <p class="companyInfoText">邦邦留学成立于2002年，由中美文化商业精英携手共建，一直致力于为华人世界的莘莘学子提供高质量的海外留学申请，拥有超过1500名员工，超过1000名咨询顾问。</p>
        <div class="companyInfoPic">
            <img src="../assets/images/aboutUs.png" alt="">
        </div>
    </div>
    <div class="special">
        <h2 class="title">邦邦留学平台的特色</h2>
        <ul class="stepList">
            <li>
                <i class="stepIcon step1"></i>
                <p class="specialItem">为客户免费做评估</p>
            </li>
            <li>
                <i class="stepIcon step2"></i>
                <p class="specialItem">丰富的海外院校信息及视频</p>
            </li>
            <li>
                <i class="stepIcon step3"></i>
                <p class="specialItem">第三方保障留学服务费安全化</p>
            </li>
            <li>
                <i class="stepIcon step4"></i>
                <p class="specialItem">工作室优胜劣汰</p>
            </li>
            <li>
                <i class="stepIcon step5"></i>
                <p class="specialItem">全程监管工作室申请流程</p>
            </li>
            <li>
                <i class="stepIcon step6"></i>
                <p class="specialItem">客户为工作室的服务评星</p>
            </li>
            <li>
                <i class="stepIcon step7"></i>
                <p class="specialItem">提供留学后增值服务</p>
            </li>
        </ul>
    </div>
    <div class="process">
        <h2 class="title">邦邦全程服务流程</h2>
        <ul class="processList">
            <li class="processItem processStep1 clearfix arrow">
                <i class="processIcon processOne"></i><span class="processInfo">免费评估</span><em class="arrow"></em>
            </li>
            <li class="processItem processStep2 clearfix arrow">
                <i class="processIcon processTwo"></i><span class="processInfo">匹配优质工作室</span><em class="arrow"></em>
            </li>
            <li class="processItem processStep3 clearfix arrow">
                <i class="processIcon processThree"></i><span class="processInfo">签约付费至监管平台</span><em class="arrow"></em>
            </li>
            <li class="processItem processStep4 clearfix arrow">
                <i class="processIcon processFour"></i><span class="processInfo">邦邦全程监督申请流程</span><em class="arrow"></em>
            </li>
            <li class="processItem processStep2 clearfix arrow">
                <i class="processIcon processFive"></i><span class="processInfo">获得满意offer</span><em class="arrow"></em>
            </li>
            <li class="processItem processStep6 clearfix arrow">
                <i class="processIcon processSix"></i><span class="processInfo">邦邦付费至工作室</span><em class="arrow"></em>
            </li>
            <li class="processItem processStep6 clearfix arrow">
                <i class="processIcon processSeven"></i><span class="processInfo">学生海外增值服务</span>
            </li>
        </ul>
    </div>
    <div class="studio">
        <h2 class="title">什么是优质工作室</h2>
        <ul class="studioList">
            <li class="studioItem clearfix">
                <i class="studioIcon"></i>
                <span class="studioInfo">曾在知名机构服务过3年以上</span>
            </li>
            <li class="studioItem clearfix">
                <i class="studioIcon"></i>
                <span class="studioInfo">有营业执照</span>
            </li>
            <li class="studioItem clearfix">
                <i class="studioIcon"></i>
                <span class="studioInfo">提供5个以上高端案例</span>
            </li>
            <li class="studioItem clearfix">
                <i class="studioIcon"></i>
                <span class="studioInfo">擅长申请的国家、专业备注</span>
            </li>
            <li class="studioItem clearfix">
                <i class="studioIcon"></i>
                <span class="studioInfo">背景核查专业度及行业口碑度</span>
            </li>
        </ul>
    </div>
    <div class="touchUs">
        <h2 class="title">联系我们</h2>
        <p class="touchUsInfo">客服热线 : 400-234-2345</p>
        <p class="touchUsInfo">业务合作 : 400-234-2345</p>
        <p class="touchUsInfo">工作室入驻 : 400-234-2345</p>
        <p class="touchUsInfo">留学咨询 : 400-234-2345</p>
        <p class="touchUsInfo">投诉及建议邮箱 : 400-234-2345</p>
    </div>
</div>
</div>
  
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
        toPreviousPage(){
      this.$router.go(-1)
    },
  }
}
</script>
<style lang="less" scoped>
@import "../assets/style/public.less";
@import "../assets/style/aboutus.less";
</style>
