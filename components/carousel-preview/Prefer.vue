<template>
    <div class="prefer">
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, i) in posts" :key="i">
                    <div class="prefer--item">
                        <Thumbnail 
                            :id="item.id"
                            :title="item.title"
                            :image="item.attactment[0]"
                            :district="item.district"
                            :address="item.description"
                            :price="item.price"
                        />
                    </div>
                </div>
            </div>
            <div class="prefer--item_loading" v-if="posts.length === 0">
                <i class="fal fa-spinner fa-spin"></i>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>
<script>
import { Thumbnail } from '@/components/thumbnail';

export default {
    props: {
        posts: { type: Array, required: true, default: () => [] }
    },
    components: { Thumbnail },
    data() {
        return {
            swiperOption: {
                slidesPerView: 3,
                // centeredSlides: true,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 5
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                }
            }
        }
    },
    methods: {
        appendSlide() {
            this.swiperSlides.push(this.swiperSlides.length + 1)
        },
        prependSlide() {
            this.swiperSlides.unshift(this.swiperSlides[0] - 1)
        },
        popSlide() {
            this.swiperSlides.pop()
        },
        shiftSlide() {
            this.swiperSlides.shift()
        }
        
    }
}
</script>
<style lang="scss" scoped>
.prefer {
    margin: 20px 0;

    &--item {

        &_loading {
            font-size: 50px;
            line-height: 50px;
            text-align: center;
        }
    }
}
.swiper {
    &-container {
        max-height: 500px;
    }

    &-button {

        &-prev {
            left: 0 !important;
        }

        &-next {
            right: 0 !important;
        }
    }

    &-slide {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

