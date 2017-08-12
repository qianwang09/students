<template>
  <!-- <md-card-media> -->
    <div class="swiperFullContainer" >  
      <div class="headerEmpty" @click="fullSwiperClick()"></div>   
    <swiper :options="swiperOption" ref="swiperTop" class="gallery-top">
      <!-- slides -->
      <swiper-slide v-for="banner in banners" v-bind:key="banner" class="swiper-item">
        <img :src="banner" />
      </swiper-slide>
      <!-- Optional controls -->
       <span class="swiper-pagination" slot="pagination"></span>
      <div  v-if="banners.length>3" class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
      <div  v-if="banners.length>3" class="swiper-button-next swiper-button-white" slot="button-next"></div> 
    </swiper>
    <swiper :options="swiperOptionThumbs" ref="swiperThumbs" class="gallery-thumbs">
      <swiper-slide v-for="banner in banners" v-bind:key="banner" v-bind:style="{backgroundImage:'url('+ banner +')'}"></swiper-slide>
    </swiper>
  <div class="footerEmpty" @click="fullSwiperClick()"></div>   
  </div>
</template>

<script>
// swiper options example:
export default {
  name: 'carrousel',
  props: ['banners'],
  data() {
    return {
      swiperOption: {
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        // autoplay: 3000,
        // direction : 'vertical',
        grabCursor: true,

        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },

        setWrapperSize: false,
        autoHeight: false,
        pagination: '.swiper-pagination',
        paginationType: 'fraction',// fraction  progress bullets
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesPerView: 1,
        mousewheelControl: true,
        observeParents: false,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart(swiper) {
          console.log(swiper)
        },
      },
        swiperOptionThumbs: {
          notNextTick: true,
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
        }
    }
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  methods:{
  fullSwiperClick(){
  this.$emit('fullSwiperClick')
  },
  },
  computed: {
    swiper() {
      return this.$refs.swiperTop.swiper
    }
  },
  mounted() {
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
     const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.params.control = swiperThumbs
      swiperThumbs.params.control = swiperTop
    // this.swiper.slideTo(3, 1000, false)
  }
}
</script>
<style lang="less" scoped>
@r: 50rem;
.headerEmpty, .footerEmpty{
  height: 150/@r;
}
.swiper-item {
  width: 100%;
  // height: 420/@r;
  height: 920/@r;
}

.swiper-item img {
  height: 100%;
  width: 100%;
  background-size: contain;
}
.swiper-pagination {
  font-size: 28/@r;
  position: absolute;
  width: auto;
  bottom: 30/@r;
  left: 600/@r;
  transform: translate(-50%, -50%);
  border-radius: 20/@r;
  background-color: #000;
  opacity: .8;
  color: #fff;
  padding: 2/@r 10/@r;
}





  // .swiper-container {
  //   background-color: #000;
  // }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  // .gallery-top {
  //   height: 80%!important;
  //   width: 100%;
  // }
  // .gallery-thumbs {
  //   height: 20%!important;
  //   box-sizing: border-box;
  //   padding: 10/@r 0;
  // }
    .gallery-thumbs {
    height: 120/@r!important;
    box-sizing: border-box;
    padding: 10/@r 0;
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.7;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }
</style>
