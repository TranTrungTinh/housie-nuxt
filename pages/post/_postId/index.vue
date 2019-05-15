<template src="./index.html"></template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { Preview, Prefer } from '@/components/carousel-preview';
import { Comment } from '@/components/comment';
import { Utilities } from '@/components/utils';
import { mapActions } from 'vuex';
import { initLoadProgress, currentUser } from '@/mixins';
import { facility, storage, format } from '@/helpers';
const ConfirmHelperModal = () => import('@/components/task/ConfirmHelperModal');

export default {
    head() {
        return {
            title: this.rootTitle,
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    components: { Preview, Prefer, Utilities, Comment, ConfirmHelperModal },
    mixins: [initLoadProgress, currentUser],
    data() {
        return {
            rootTitle: '',
            facilities: facility.getFacilities(),
            onShowPhone: false,
            postPrefer: [],

            postId: '1',
            postDetail: {},
            notFound: false,

            affix: 0
        }
    },
    computed: {
        filteredUtils() {
            if(!this.postDetail.facility) return this.facilities;
            return this.facilities.map(item => {
                const isChoose = this.postDetail.facility[item.code];
                return { ...item, choose: isChoose }
            });
        },
        onwerPost() {
            const { lastName, firstName} = this.postDetail.account;
            return format.formatName(firstName, lastName);
        },
        fullAddress() {
            const { ward, street } = this.postDetail;
            return `${street}, ${ward.path_with_type}.`;
        },
        isTaskExisted() {
            return this.postDetail.task;
        },
        isOwnersRoom() {
            if(!this.isUser) return false;
            return this.currentUser.id === this.postDetail.account.id;
        }
    },
    watch: {
        '$route.params' (params) {
            this.postId = params.id;
            this.loadDetail(params.id);
        }
    },
    methods: {
        ...mapActions({
            getPostsByFiltered: 'post/getPostsByFiltered',
            getPostById: 'post/getPostById'
        }),
        loadDetail() {
            const loader = this.$loading.show();

            this.postDetail = {};
            this.getPostById(this.postId)
            .then(data => {
                this.rootTitle = `${data.ward.path_with_type} cho thuê - Housie`;
                this.postDetail = data;
                this.getPostsByFiltered({ limit: 8, districts: data.district.code})
                .then(results => this.postPrefer = results);
                loader.hide();
            })
            .catch(() => {
                this.notFound = true;
                setTimeout(() => loader.hide(), 500);
                setTimeout(() => this.$router.push({ path: '/' }), 5000);
            })
        },
        renderAvatar(avatar) {
            return format.formatImg(avatar);
        },
        handleHelper() {
            const roomDetail = {
                title: this.postDetail.title,
                address: this.postDetail.address,
                price: this.postDetail.price,
                attactment: this.postDetail.attactment
            }
            storage.saveItem('room-detail', roomDetail);
            const existing = window.localStorage.getItem('confirm-task');
            if(!existing) return this.$refs.helperModal.showModal();
            this.$router.push({ path: `${this.$route.path}/task` });
        },
        handleScroll() {
            if(window.scrollY < 527) {
                this.affix = 0;
                return;
            }
            if(window.scrollY > 528 && window.scrollY < 1329) {
                this.affix = 1;
                return;
            }
            this.affix = 2;
        }
    },
    created() {
        this.postId = this.$route.params.postId || '1';
    },
    mounted() {
        this.loadDetail();
    },
    beforeMount() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    }
}
</script>