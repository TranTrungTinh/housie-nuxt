<template src="./index.html"></template>
<style lang="scss" scoped src="./index.scss"></style>
<script>
import { mapGetters, mapActions } from 'vuex';
import { FirstStep, SecondStep, ThirdStep, FourthStep, ConfirmStep } from '@/components/steps';
import { initLoadProgress } from '@/mixins';

export default {
    middleware: ["auth"],
    head: {
        title: 'Đăng phòng cho thuê - Housie'
    },
    components: { FirstStep, SecondStep, ThirdStep, FourthStep, ConfirmStep },
    mixins: [initLoadProgress],
    data() {
        return {
            step: 1,
            stepDone: false,
            postLoading: false,
            percent: 0
        }
    },
    computed: {
        ...mapGetters({
            rawPost: 'post/postState',
            currentUser: 'user/currentUser'
        })
    },
    methods: {
        ...mapActions({
            cleanPost: 'post/cleanPost',
            setPostAddress: 'post/setPostAddress',
            setSecondPost: 'post/setSecondPost',
            setThirdPost: 'post/setThirdPost',
            setFourthPost: 'post/setFourthPost',

            setCurrentStep: 'header/setCurrentStep',
            setCurrentHeader: 'header/setCurrentHeader',
            resetHeader: 'header/resetHeader',

            uploadFile: 'post/uploadFile',
            createPost: 'post/createPost'
        }),
        next() {
            if(this.step === 5) return;
            switch (this.step) {
                case 1:
                    if(this.$refs.firstStep.validateFistStep()) {
                        this.step++;
                        this.setCurrentStep(this.step);
                    }
                    break;
                case 2:
                    if(this.$refs.secondStep.validateSecondStep()) {
                        this.step++;
                        this.setCurrentStep(this.step);
                    }
                    break;
                case 3:
                    if(this.$refs.thirdStep.validateThirdStep()) {
                        this.step++;
                        this.setCurrentStep(this.step);
                    }
                    break;
                case 4:
                    if(this.$refs.fourthStep.validateFourthStep()) {
                        this.step++;
                        this.setCurrentStep(this.step);
                    }
                    break;
                default:
                    break;
            }
        },
        pre() {
            if(this.step === 1) return;
            this.step--;
            this.setCurrentStep(this.step);            
        },
        getDataFirstStep(address) {
            this.setPostAddress(address);
        },
        getDataSecondStep(payload) {
            this.setSecondPost(payload);
        },
        getDataThirdStep(cost) {
            this.setThirdPost(cost);
        },
        getDataFourthStep(payload) {
            this.setFourthPost(payload);
        },
        rollbackStep(step) {
            this.step = step;
            this.setCurrentStep(this.step);            
        },
        cookingRawData() {
            const { address, capacity, square, facility, location,
                cost, roomType, title, description } = this.rawPost;

            const cookingData = {
                title: title,
                description: description,
                street: `${address.home}`,
                ward: address.town.code,
                district: address.district.code,
                phone: this.currentUser.phone || '0978 777 888',
                facility: facility,
                kind: 0,
                type: +roomType.code,
                location: {
                    lat: location.lat || '10.7710527',
                    lng: location.lng || '106.6949104'
                },
                price: cost.main / 1000,
                square: square,
                extensions: {
                    electricity: cost.electric,
                    water: cost.water,
                    wifi: cost.wifi
                },
                attactment: []
            }
            return cookingData;
        },
        convertFileToFormData() {
            const { attachment } = this.rawPost;
            const files = new FormData();
            attachment.forEach(item => files.append('file', item.originFileObj));
            return files;
        },

        async handlePost() {
            this.percent = 10;
            const cookingData = this.cookingRawData();
            // init loading
            this.stepDone = true;
            this.postLoading = true;
            setTimeout(() => this.percent = 20, 500);
            setTimeout(() => this.percent = 30, 700);
            setTimeout(() => this.percent = 40, 900);

            // step 1: upload file
            const files = this.convertFileToFormData()
            setTimeout(() => this.percent = 50, 1100);
            const listFile = await this.uploadFile(files);
            cookingData.attactment = [...listFile];
            this.percent = 80;
            // step 2: create post
            this.createPost(cookingData)
            .then(() => this.percent = 100)
            .catch(() => this.$message.error('Quá trình đăng tin đang bị lỗi.'));
        }
    },
    created() {
        this.setCurrentHeader(true);
        // document.title = 'Đăng phòng cho thuê - Housie';
    },
    destroyed() {
        this.resetHeader();
        this.cleanPost();
    }
}
</script>


