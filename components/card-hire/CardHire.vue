<template>
    <div class="card-hire">
        <a-row :gutter="16">
            <a-col :span="4">
                <div class="card-hire--icon">
                    <img src="~@/assets/img/rent-logo.svg" alt="Cover logo" v-if="type === 0" />
                    <img src="~@/assets/img/post-logo.svg" alt="Cover logo" v-else />
                </div>
            </a-col>
            <a-col :span="20">
                <div class="card-hire-main">
                    <div class="card-hire-main--title">{{ title }}</div>
                    <div class="card-hire-main--des">{{ des }}</div>
                    <nuxt-link class="card-hire-main--button" tag="div" :to="link">{{ button }}</nuxt-link>
                    <!-- <a-popconfirm placement="right" okText="Đã hiểu" cancelText="Huỷ" @confirm="onPress" v-else>
                        <template slot="title">
                            <p>Bạn cần đăng nhập trước khi đăng tin</p>
                        </template>
                        <div class="card-hire-main--button">{{ button }}</div>
                    </a-popconfirm> -->
                </div>
            </a-col>
        </a-row>
    </div>
</template>
<script>
// import { currentUser } from '@/mixins';
// import { EventBus } from '@/helpers/event-bus';

export default {
    props: {
        title: { type: String, required: true },
        des: { type: String, required: true },
        button: { type: String, required: true },
        link: { type: String, required: true },
        type: { type: Number, default: 0 }
    },
    // mixins: [currentUser],
    methods: {
        onPress() {
            // EventBus.$emit('open-login-modal');
        }
    }
}
</script>
<style src="./CardHire.scss" lang="scss" scoped></style>


