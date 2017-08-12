<template>
  <swiper :options="swiperOption" ref="swiperVideo" class="swiper-box">
    <!-- slides -->
    <swiper-slide v-for="(v,index) in videoes" v-bind:key="v" class="swiper-item" :id="'schoolvideo'+index">
      <video controls preload="auto" type="video/mp4" class="video-js vjs-default-skin vjs-big-play-centered">
        <source :src="v" />
      </video>
    </swiper-slide>
    <div v-if="videoes.length>2" class="swiper-button-prev" slot="button-prev"></div>
    <div v-if="videoes.length>2" class="swiper-button-next" slot="button-next"></div>
    <!-- <span class="swiper-pagination" slot="pagination"></span> -->
    <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
  </swiper>
</template>

<script>
// swiper options example:
export default {
  name: 'swiperVideo',
  props: ['videoes'],
  data() {
    return {
      swiperOption: {
        // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        // autoplay: 3000,
        slidesPerView: 2,
        spaceBetween: 30,
        // direction : 'vertical',
        grabCursor: true,
        setWrapperSize: false,
        autoHeight: false,
        // pagination: '.swiper-pagination',
        // paginationType : 'bullets',// fraction  progress bullets
        // paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        // scrollbar:'.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: false,
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart(swiper) {
          console.log(swiper)
        },
        // more Swiper configs and callbacks...
        // ...
      }
    }
  },
  // you can find current swiper instance object like this, while the notNextTick property value must be true
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
  computed: {
    swiper() {
      return this.$refs.swiperVideo.swiper
    }
  },
  mounted() {
    // you can use current swiper instance object to do something(swiper methods)
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    //     debugger

    // let v1 = this.videojs('schoolvideo0', {
    //   controls: true,
    //   autoplay: false,
    //   posterImage: false,
    //   preload: 'auto',
    //   //  controlBar: {
    //   //       captionsButton: false,
    //   //       chaptersButton : false,
    //   //       liveDisplay:false,
    //   //       playbackRateMenuButton: false,
    //   //       subtitlesButton:false
    //   //     }
    // }, function () {
    //   this.on('loadeddata', function () {
    //     console.log('loadeddata' + this)
    //   })
    //   this.on('loadedalldata', function () {
    //     console.log('loadedalldata' + this)
    //   })
    //   this.on('ended', function () {
    //     this.pause();
    //     this.hide()
    //   })
    // }).ready(function () {
    //   var myPlayer = this;
    //   debugger
    //   myPlayer.play();    setTimeout(() => {
    //     myPlayer.pause()
    //   }, 15500);
    // });


    console.log('this is current swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
  }
}
</script>
<style lang="less" scoped>
@r: 50rem;
.swiper-box {
  margin: 0 auto;
  margin-bottom: 20/@r;
  padding: 0 30/@r;
  height: 210/@r;
}

.swiper-item {
  // width: 100%;
  // height: 370/@r;
  width: 180/@r;
  height: 210/@r;
}

.swiper-item video {
  height: 100%;
  width: 100%;
  background-size: contain;
}
</style>
