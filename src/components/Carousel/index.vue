<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'

export default {
  name: 'Carousel',
  props: ['list'],
  watch: {
    list: {
      // 立即监听，不管你的数据有没有变化
      immediate: true,
      handler() {
        // 只能监听到数据已经有了，但是 v-for 动态渲染结构我们还是没有办法确定，因此还是需要使用 nextTick
        this.$nextTick(() => {
          const mySwiper = new Swiper(this.$refs.mySwiper, {
            // 循环
            loop: true,
            // 自动播放
            autoplay: true,
            autoplay: {
              delay: 2500,
              disableOnInteraction: false
            },
            // 分页器 可以使用 el 自己定义自己的分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // 左右箭头 可以使用自己的定义的，改一下下面的类就好了
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
          })
        })
      }
    }
  }
}
</script>

<style>
</style>