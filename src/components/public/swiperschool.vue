<template>
  <!-- http://www.swiper.com.cn/ -->
  <swiper :options="swiperOption" ref="mySwiper1" class="swiper-box">
    <!-- slides -->
    <swiper-slide v-for="banner in banners" v-bind:key="banner" class="swiper-item">
      <img :src="banner"/>
    </swiper-slide>  
    <!-- Optional controls -->
    <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    <span class="swiper-pagination" slot="pagination"></span>
    <!--<div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>-->
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
  </swiper>
</template>

<script>
// swiper options example:
export default {
  props: ['banners'],
  data() {
    return {
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        lazyLoading: true,
        lazyLoadingInPrevNext: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: 2000,
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
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        // scrollbar:'.swiper-scrollbar',
        slidesPerView: 1,

        mousewheelControl: true,
        observeParents: true,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        // debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart(swiper) {
          console.log(swiper)
        },
        onClick: (swiper, event)=> {
          console.log(swiper)
          swiper.emit('click')
          // this.bannerImgClick()
          // this.$emit('showSchoolFullScreenEvent')
        }
        // more Swiper configs and callbacks...
        // ...
      }
    }
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.mySwiper1.swiper
    }
  },
  mounted() {
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log('this is current swiper instance object', this.swiper)
    this.swiper.on('click', ()=>{this.$emit('swiperClick')})
    // this.swiper.slideTo(3, 1000, false)
  },
 
}
</script>
<style lang="less" scoped>
@r: 50rem;
.swiper-box {
  margin: 0 auto;
  margin-bottom: 20/@r;
}

.swiper-item {
  width: 100%;
  height: 420/@r;
}

.swiper-pagination {
  font-size: 28/@r;
  position: absolute;
  width: auto;
  bottom: 30/@r; // left: 50%;
  left: 600/@r;
  transform: translate(-50%, -50%);
  border-radius: 20/@r;
  background-color: #000;
  opacity: .8;
  color: #fff;
  padding: 6/@r 10/@r;
}

.swiper-item img {
  height: 100%;
  width: 100%;
  background-size: contain;
}
</style>
