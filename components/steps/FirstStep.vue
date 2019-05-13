<template>
    <div class="first-step">
        <div class="first-step--info_item">
            <span class="first-step--info__title">Thành phố</span>
            <Selected 
               :selects="getCities"
               :firstSelected="true"
               :onSelected="onSelectedCity"
               placeholder="Bấm để chọn thành phố"
               size="large"
               :setSelected="address.city"
            />
        </div>
        <div class="first-step--info_item">
            <span class="first-step--info__title">Quận/Huyện</span>
            <Selected 
                :selects="getDistricts"
                :onSelected="onSelectedDistrict"
                placeholder="Bấm để chọn quận"
                size="large"
                :setSelected="address.district"
            />
            <a-alert
                v-if="isDistrict"
                class="first-step--info_item--error"
                type="error" 
                message="Vui lòng chọn quận/huyện!!!" 
                showIcon 
            />
        </div>
        <div class="first-step--info_item">
            <span class="first-step--info__title">Phường/Xã</span>
            <Selected 
                :selects="getTowns"
                :onSelected="onSelectedTown"
                placeholder="Bấm để chọn phường"
                size="large"
                :setSelected="address.town"
            />
            <a-alert
                v-if="isTown"
                class="first-step--info_item--error"
                type="error" 
                message="Vui lòng chọn phường/xã!!!" 
                showIcon 
            />
        </div>
        <div class="first-step--info_item">
            <span class="first-step--info__title">Địa chỉ</span>
            <a-input size="large" placeholder="Nhập địa chỉ (số nhà, tên đường)" v-model="address.home" @change="handleChange"/>
            <a-alert
                v-if="isHome"
                class="first-step--info_item--error"
                type="error" 
                message="Nhập địa chỉ của bạn!!!" 
                showIcon 
            />
        </div>
        <div class="first-step--info_item">
            <a-alert
                message="Nên nhập Địa chỉ bằng tiếng Việt có dấu"
                description="Tin của bạn có thể bị xoá nếu bạn báo sai địa chỉ."
                type="info"
                showIcon
            />
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { Selected } from '@/components/selected';
import { location } from '@/helpers';
import googleMap from '@google/maps';

export default {
    props: {
        onData: { type: Function }
    },
    components: { Selected },
    data() {
        return {
            address: {
                city: {
                    code: '79',
                    data: ''
                },
                district: {
                    code: '',
                    data: ''
                },
                town: {
                    code: '',
                    data: ''
                },
                home: ''
            },
            isHome: false,
            isDistrict: false,
            isTown: false
        }
    },
    computed: {
        ...mapGetters({
            postAddress: 'post/postAddress'
        }),
        getCities() {
            return location.getCitiesByCode(this.address.city.code)
        },
        getDistricts() {
            if(!this.address.city.code) return [];
            return location.getDistrictsByCode(this.address.city.code)
        },
        getTowns() {
            if(!this.address.district.code) return [];
            Object.assign(this.address.town, { code: '', data: '' });
            return location.getTownsByCode(this.address.district.code)
        }
    },
    methods: {
        ...mapActions({
            setLocation: 'post/setLocation'
        }),
        onSelectedCity({ code, data }) {
            Object.assign(this.address.city, { code, data })
        },
        onSelectedDistrict({ code, data }) {
            Object.assign(this.address.district, { code, data });
            this.isDistrict = false;
        },
        onSelectedTown({ code, data }) {
            Object.assign(this.address.town, { code, data });
            this.isTown = false;
        },
        handleChange() {
            this.isHome = false
        },

        validateDistrict() {
            if(this.address.district.code) return true;
            this.isDistrict = true;
            // setTimeout(() => this.isDistrict = false, 3000);
            return false;
        },
        validateTown() {
            if(this.address.town.code) return true;
            this.isTown = true;
            // setTimeout(() => this.isTown = false, 3000);
            return false;
        },
        validateHome() {
            if(this.address.home) return true;
            this.isHome = true;
            // setTimeout(() => this.isHome = false, 3000);
            return false;
        },
        validateFistStep() {
            const district = this.validateDistrict();
            const town = this.validateTown();
            const home = this.validateHome();
            return district && town && home;
        }
    },
    mounted() {
        if(this.postAddress && this.postAddress.city.code) {
            Object.assign(this.address, this.postAddress);
        }
    },
    beforeDestroy() {
        const googleMapsClient = googleMap.createClient({
            key: 'AIzaSyDdz60EXJYfX_e3wsTS-2DrXMfACXKbB10',
            Promise: Promise
        });
        const { city, district, town } = this.address;
        googleMapsClient.geocode({address: `${town.data}, ${district.data}, ${city.data}`}).asPromise()
        .then((response) => {
            const { location } = response.json.results[0].geometry;
            this.setLocation(location);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    destroyed() {
        this.onData(this.address);
    }
}
</script>
<style lang="scss" scoped>
.first-step {

    &--info {

        &_item {
            margin-bottom: 20px;

            &--error {
                margin-top: 5px;
            }
        }

        &__title {
            display: inline-block;
            padding-bottom: 5px;
            font-weight: 600;
            font-size: 20px;
        }
    }
}
</style>