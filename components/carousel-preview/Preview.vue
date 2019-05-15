<template>
    <div class="preview">
      <div v-swiper:swiperTop="swiperOptionTop" class="gallery-top">
        <div class="swiper-wrapper">
          <div class="swiper-slide"
            v-for="(img, i) in attactment" :key="i" 
            v-lazy:background-image="renderImg(img)"
          >
          </div>
        </div>
        <div class="swiper-button swiper-button-next swiper-button-white"></div>
        <div class="swiper-button swiper-button-prev swiper-button-white"></div>
    </div>
    <div v-swiper:swiperThumbs="swiperOptionThumbs" class="gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
          v-for="(img, i) in attactment" :key="i" 
          v-lazy:background-image="renderImg(img)"
        >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { format } from '@/helpers';

export default {
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
      const swiperTop = this.swiperTop
      const swiperThumbs = this.swiperThumbs
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
  outline: none;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
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
