<template src="./TheHeader.html"></template>
<style lang="scss" scoped src="./TheHeader.scss"></style>

<script>
import { mapGetters, mapActions } from 'vuex';
import { currentUser } from '@/mixins';
import { EventBus } from '@/helpers/event-bus';
import { TheSearch } from '@/components/search';
const ProfilePopup = () => import('@/components/header/ProfilePopup');
const UserModal = () => import('@/components/header/UserModal');
const Drawer = () => import('@/components/header/Drawer');
const Notification = () => import('@/components/header/Notification');

export default {
    components: { UserModal, ProfilePopup, Drawer, Notification, TheSearch },
    mixins: [currentUser],
    data () {
        return {
            loading: false,
            navLinks: [
                {link: '/post', title: 'Đăng phòng'}
            ]
        }
    },
    computed: {
        currentHeader() {
            return this.$store.getters['header/currentHeader'];
        },
        step() {
            return this.$store.getters['header/step'];
        },
        showColMatchStep() {
            if(this.currentHeader) return 5;
            return 12;
        }
    },
    methods: {
        ...mapActions({
            firstLoading: 'user/firstLoading',
        }),
        showDrawer() { this.$refs.drawer.open() },
        handleConfirm() { this.$refs.modalAuth.showModal() }   
    },
    created() {
        EventBus.$on('open-login-modal', () => this.handleConfirm())
    },
    mounted() {
        this.loading = true;
        this.firstLoading()
        .then(() =>  this.loading = false)
        .catch(() => this.loading = false)
    },
    destroyed() {
        EventBus.$off('open-login-modal');
    }
}
</script>



