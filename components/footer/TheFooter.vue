<template>
    <section class="footer">
        <div class="footer-main">
            <div class="footer-main--logo">
                <img src="~@/assets/img/main-logo.svg" alt="Main logo" />
                <span>Housie</span>
            </div>
            <div class="footer-main--description" v-for="(item, i) in info" :key="i">
                <p>
                    <span style="font-weight: 600">{{item.title}}: </span>
                    <span>{{item.content}}</span>
                </p>
            </div>
        </div>
        <div class="footer-sub">
            <div class="footer-sub--info">
                <a href="https://www.sk-global.biz" target="_blank">Về chúng tôi</a>
                <a href="">Điều khoản riêng tư</a>
            </div>
            <div class="footer-sub--copy">
                Copyright © SK-Global JSC. - 2019 All Rights Reserved
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            info: [
                { title: 'Phone', content: '+84 90 189 329' },
                { title: 'Email', content: 'contact@housing.sk-global.biz' },
                { title: 'Address', content: '74/13/4 Truong Quoc Dung, Ward 10, Phu Nhuan District, Ho Chi Minh City, Vietnam' },
            ]
        }
    }
}
</script>
<style src="./TheFooter.scss" lang="scss" scoped></style>


