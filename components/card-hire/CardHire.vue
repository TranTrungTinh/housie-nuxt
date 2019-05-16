<template>
    <div class="card-hire">
        <div class="card-hire-main">
            <h1 class="card-hire-main--title">Đăng phòng cho thuê</h1>
            <p class="card-hire-main--des">Đăng phòng dễ dàng, tìm được người thuê thanh chóng cùng Housie.</p>
            <nuxt-link class="card-hire-main--button" tag="div" to="/post" v-if="isUser">ĐĂNG PHÒNG NGAY</nuxt-link>
            <a-popconfirm placement="right" okText="Đã hiểu" cancelText="Huỷ" @confirm="onPress" v-else>
                <template slot="title">
                    <p>Bạn cần đăng nhập trước khi đăng tin</p>
                </template>
                <div class="card-hire-main--button">ĐĂNG PHÒNG NGAY</div>
            </a-popconfirm>
        </div>
    </div>
</template>
<script>
import { currentUser } from '@/mixins';
import { EventBus } from '@/helpers/event-bus';

export default {
    mixins: [currentUser],
    methods: {
        onPress() {
            EventBus.$emit('open-login-modal');
        }
    }
}
</script>
<style src="./CardHire.scss" lang="scss" scoped></style>


