<template>
    <div class="preview">
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide
          v-for="(img, i) in attactment" :key="i" 
          v-lazy:background-image="renderImg(img)"
        >
        </swiper-slide>
        <div class="swiper-button swiper-button-next swiper-button-white" slot="button-next"></div>
        <div class="swiper-button swiper-button-prev swiper-button-white" slot="button-prev"></div>
      </swiper>
      
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide
          v-for="(img, i) in attactment" :key="i" 
          v-lazy:background-image="renderImg(img)"
        >
        </swiper-slide>
      </swiper>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.min.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { format } from '@/helpers';

export default {
  components: { swiper, swiperSlide },
  props: {
    attactment: { type: Array, default: () => [] }
  },
  data() {
    return {
      swiperOptionTop: {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: { 
          delay: 2500,
          disableOnInteraction: false
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      },
      autoplay: { 
        delay: 2500,
        disableOnInteraction: false
      }
    }
  },
  methods: {
    renderImg(image) {
        return format.formatImg(image);
    }
  },
  mounted() {
    this.$nextTick(() => {
      const swiperTop = this.$refs.swiperTop.swiper
      const swiperThumbs = this.$refs.swiperThumbs.swiper
      swiperTop.controller.control = swiperThumbs
      swiperThumbs.controller.control = swiperTop
    });
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/app.scss';

.preview {
  position: relative;
  z-index: 100;
  height: 60vh;

  @include respond(tab-md) {
    height: 50vh;
  }
}
.swiper-container {
  background-color: #000;
}
.swiper-slide {
  background-position: center;
  background-size: contain;
  // background-color: #f2f2f4;
  outline: none;
  background-repeat: no-repeat;
}
.gallery-top {
  height: 80% !important;
  width: 100%;
}
.gallery-thumbs {
  height: 20% !important;
  box-sizing: border-box;
  padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
  width: 15%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>
