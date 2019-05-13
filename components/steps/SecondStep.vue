<template>
    <div class="second-step">
        <div class="second-step--item">
            <span class="second-step--info__title">Loại phòng</span>
            <Selected 
                placeholder="Chọn loại phòng"
                size="large"
                :selects="getAllRoomType"
                :onSelected="onSelectedRoom"
                :setSelected="roomType"
            />
            <a-alert
                v-if="isRoomType"
                class="second-step--item-error"
                type="error" 
                message="Vui lòng chọn loại phòng!!!" 
                showIcon 
            />
        </div>
        <div class="second-step--item__title">Thông tin</div>
        <div class="second-step--item">
            <span class="second-step--info__title">Sức chứa</span>
            <a-input 
                class="second-step--item__input" 
                size="large" type="number" 
                addonAfter="người/phòng" 
                placeholder="Số người/phòng" 
                v-model.lazy="capacity"
            />
            <a-alert
                v-if="isCapacity"
                class="second-step--item-error"
                type="error" 
                message="Sức chứa ít nhất là 1 người !!!" 
                showIcon 
            />
        </div>
        <div class="second-step--item">
            <span class="second-step--info__title">Diện tích</span>
            <a-input 
                size="large" 
                type="number" 
                addonAfter="m2" 
                placeholder="Diện tích" 
                v-model.lazy="square"
            />
            <a-alert
                v-if="isSquare"
                class="second-step--item-error"
                type="error" 
                message="Diện tích phòng phải từ 5m2 !!!" 
                showIcon 
            />
        </div>
        <div class="second-step--item__title">Tiện ích</div>
        <div class="second-step--item">
            <a-row :gutter="20">
                <a-col :xs="12" v-for="item in facilities" :key="item.id">
                    <Utilities
                        :id="item.id" 
                        :icon="item.icon" 
                        :title="item.title" 
                        :choose="item.choose"
                        :onChoose="onChoose"
                    />
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
import { Selected } from '@/components/selected';
import { Utilities } from '@/components/utils';
import { mapGetters } from 'vuex';
import { roomType, facility } from '@/helpers';

export default {
    props: {
        onData: { type: Function }
    },
    components: { Selected, Utilities },
    data() {
        return {
            facilities: facility.getFacilities(),
            roomType: {
                code: '',
                data: ''
            },
            square: 0,
            capacity: 0,

            isRoomType: false,
            isSquare: false,
            isCapacity: false
        }
    },
    computed: {
        ...mapGetters({
            postSecondStep: 'post/postSecondStep'
        }),
        getAllRoomType() {
            return roomType.getRoomsType();
        }
    },
    methods: {
        onChoose(id) {
            this.facilities = this.facilities.map(item => {
                if(item.id !== id) return item;
                return { ...item, choose: !item.choose }
            });
        },
        onSelectedRoom({ code, data }) {
            Object.assign(this.roomType, { code, data });
            this.isRoomType = false;
        },

        validateRoomType() {
            if(this.roomType.data) return true;
            this.isRoomType = true;
            return false;
        },
        validateSquare() {
            if(this.square >= 5) return true;
            this.isSquare = true;
            setTimeout(() => this.isSquare = false, 3000);
            return false;
        },
        validateCapacity() {
            if(this.capacity >= 1) return true;
            this.isCapacity = true;
            setTimeout(() => this.isCapacity = false, 3000);
            return false;
        },
        validateSecondStep() {
            const isRoomType = this.validateRoomType();
            const isCapacity = this.validateCapacity();
            const isSquare = this.validateSquare();
            return isRoomType && isCapacity && isSquare;
        }
    },
    created() {
        this.facilities = this.facilities.map(item => {
            const value = this.postSecondStep.facility[item.code];
            return { ...item, choose: value }
        })
    },
    mounted() {
        this.capacity = this.postSecondStep.capacity;
        this.square = this.postSecondStep.square;
        Object.assign(this.roomType, this.postSecondStep.roomType);
    },
    destroyed() {
        const facility = {
            beds: 2,
            rooms: 3,
            baths: 1,
            tvs: false,
            ac: false,
            balcony: false,
            elevator: false,
            wifi: false,
            refrigerator: false,
            sd: false 
        };
        this.facilities.filter(item => item.choose).forEach(item => {
            facility[item.code] = item.choose
        })
        const payload = {
            capacity: this.capacity.toString().replace(/^0+/,''),
            square: this.square.toString().replace(/^0+/,''),
            roomType: this.roomType,
            facility
        }
        this.onData(payload);
    }
}
</script>
<style lang="scss" scoped>
.second-step {

    &--item {
        margin-bottom: 20px;

        &__title {
            font-size: 24px;
            font-weight: 600;
            color: #3E74FF;
            margin: 40px 0 20px 0;
        }

        &-error {
            margin-top: 5px;
        }

    }

    &--info {

        &__title {
            display: inline-block;
            padding-bottom: 5px;
            font-weight: 600;
            font-size: 20px;
        }
    }
}

</style>

