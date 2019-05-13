<template>
    <div class="thumbnail">
        <a @click="handleClick(id)">
            <div class="thumbnail-img">
                <img v-lazy="renderImg" alt="Image cover">
                <div class="thumbnail-img--tag">
                    {{ district.name_with_type }}
                </div>
            </div>
            <div class="thumbnail-info">
                <div class="thumbnail-info--price">
                    <span class="thumbnail-info--price_tag" v-if="tagName">{{ tagName }}</span>
                    <span>{{ price | thousand | currency }} đ/tháng</span>
                </div>
                <div class="thumbnail-info--title">{{ title }}</div>
                <div class="thumbnail-info--address">{{ address }}</div>
            </div>
        </a>
    </div>
</template>
<script>
import { format } from '@/helpers';

export default {
    props: {
        id: { type: Number, required: true, default: () => 1 },
        title: { type: String, required: true, default: () => '' },
        image: { type: String, required: true, default: () => '' },
        address: { type: String, required: true, default: () => '' },
        district: { type: Object, required: true, default: () => ({}) },
        price: { type: Number, required: true, default: () => 1 },
        tagName: { type: String, default: () => '' }
    },
    computed: {
        renderImg() {
            return format.formatImg(this.image);
        }
    },
    methods: {
        handleClick(id) {
            this.$router.push({ path: '/post/' + id});
        }
    }
}
</script>
<style lang="scss" scoped src="./Thumbnail.scss" ></style>


