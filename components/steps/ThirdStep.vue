<template>
    <div class="third-step">
        <div class="third-step--item">
            <span class="third-step--info__title">Giá thuê</span>
            <a-input 
                class="third-step--item__input" 
                size="large" type="number" 
                addonAfter="đ/tháng" 
                placeholder="VD: 3.000.000"
                v-model.lazy="cost.main"
            />
            <a-alert
                v-if="isMain"
                class="third-step--item-error"
                type="error" 
                message="Giá thuê phòng phải từ 100,000đ !!!" 
                showIcon 
            />
            <pre style="float: right" v-if="cost.main > 0">{{ cost.main | currency }} đ/tháng</pre>
        </div>
        <div class="third-step--item">
            <a-alert
                message="Nhập giá thuê/tháng bằn VNĐ"
                description="Ví dụ: Nhập 10.000.000đ/tháng thay vì 10. Tin của bạn có thể bị xoá nếu bạn báo giá không hợp lý."
                type="info"
                showIcon
            />
        </div>
        <a-divider></a-divider>
        <div class="third-step--item">
            <span class="third-step--info__title">Tiền điện</span>
            <a-input    
                size="large" 
                type="number" 
                addonAfter="đ/kwh" 
                placeholder="Nhập giá tiền điện" 
                v-model.lazy="cost.electric"
            />
            <a-alert
                v-if="isElectric"
                class="third-step--item-error"
                type="error" 
                message="Giá tiền điện phải từ 0đ !!!" 
                showIcon 
            />
            <pre style="float: right" v-if="cost.electric > 0">{{ cost.electric | currency }} đ/kí</pre>
        </div>
        <div class="third-step--item">
            <span class="third-step--info__title">Tiền nước</span>
            <a-input 
                size="large" 
                type="number" 
                addonAfter="đ/tháng" 
                placeholder="Nhập giá tiền nước" 
                v-model.lazy="cost.water"
            />
            <a-alert
                v-if="isWater"
                class="third-step--item-error"
                type="error" 
                message="Giá tiền nước phải từ 0đ !!!" 
                showIcon 
            />
            <pre style="float: right" v-if="cost.water > 0">{{ cost.water | currency }} đ/tháng</pre>
        </div>
        <div class="third-step--item">
            <span class="third-step--info__title">Internet/wifi</span>
            <a-input 
                size="large" 
                type="number" 
                addonAfter="đ/tháng" 
                placeholder="Nhập giá tiền internet/wifi" 
                v-model.lazy="cost.wifi"
            />
            <a-alert
                v-if="isWifi"
                class="third-step--item-error"
                type="error" 
                message="Giá tiền Internet/wifi phải từ 0đ !!!" 
                showIcon 
            />
            <pre style="float: right" v-if="cost.wifi > 0">{{ cost.wifi | currency }} đ/tháng</pre>
        </div>
        <div class="third-step--item">
            <a-alert
                message="Chi phí chính"
                description="Tiền điện, tiền nước, tiền internet/wifi có thể nhập hoặc không."
                type="info"
                showIcon
            />
        </div>
        <a-divider></a-divider>
        <div class="third-step--item">
            <span class="third-step--info__title">Chi phí khác</span>
            <div class="third-step--info__addon" v-if="showExtensions.garbage">
                <div class="third-step--info__addon-item">
                    <div>
                        <span>Tiền rác:</span>
                        <span>{{ showExtensions.garbage | currency }} đ/tháng</span>
                    </div>
                    <div class="third-step--info__addon-item-delete" @click="onRemove('garbage')">Xoá</div>
                </div>
            </div>
            <div class="third-step--info__addon" v-if="showExtensions.clean">
                <div class="third-step--info__addon-item">
                    <div>
                        <span>Tiền dọn vệ sinh:</span>
                        <span>{{ showExtensions.clean | currency }} đ/tháng</span>
                    </div>
                    <div class="third-step--info__addon-item-delete" @click="onRemove('clean')">Xoá</div>
                </div>
            </div>
            <div class="third-step--info__addon" v-if="showExtensions.parking">
                <div class="third-step--info__addon-item">
                    <div>
                        <span>Tiền gửi xe:</span>
                        <span>{{ showExtensions.parking | currency }} đ/tháng</span>
                    </div>
                    <div class="third-step--info__addon-item-delete" @click="onRemove('parking')">Xoá</div>
                </div>
            </div>
            <div class="third-step--info__addon" v-if="showExtensions.laundry">
                <div class="third-step--info__addon-item">
                    <div>
                        <span>Tiền giặt ủi:</span>
                        <span>{{ showExtensions.laundry | currency }} đ/tháng</span>
                    </div>
                    <div class="third-step--info__addon-item-delete" @click="onRemove('laundry')">Xoá</div>
                </div>
            </div>
            <div class="third-step--info__addon" v-if="showExtensions.elevator">
                <div class="third-step--info__addon-item">
                    <div>
                        <span>Chi phí thang máy:</span>
                        <span>{{ showExtensions.elevator | currency }} đ/tháng</span>
                    </div>
                    <div class="third-step--info__addon-item-delete" @click="onRemove('elevator')">Xoá</div>
                </div>
            </div>
            <div class="third-step--item__addition" @click="showModal">
              <i class="fal fa-plus"></i>
              <span>Thêm chi phí khác</span>
              <ModalAddMore ref="modal" :onData="onAddData"/>
            </div>
        </div>
    </div>
</template>
<script>
import ModalAddMore from '@/components/steps/ModalAddMore';
import { mapGetters } from 'vuex';

export default {
    props: {
        onData: { type: Function }
    },
    components: { ModalAddMore },
    data() {
        return {
            cost: {
                main: 0,
                electric: 0,
                water: 0,
                wifi: 0,
                extensions: {}
            },
            isMain: false,
            isElectric: false,
            isWater: false,
            isWifi: false
        }
    },
    computed: {
        ...mapGetters({
            postThirdStep: 'post/postThirdStep'
        }),
        showExtensions() {
            return this.cost.extensions;
        }
    },
    methods: {
        showModal() {
            this.$refs.modal.open();
        },
        onAddData(extensions) {
            Object.assign(this.cost, { extensions });
        },
        onRemove(attribute) {
            Object.assign(this.cost.extensions, { [attribute]: 0 })
        },

        validateMainPrice() {
            if(this.cost.main >= 100000) return true;
            this.isMain = true;
            setTimeout(() => this.isMain = false, 3000);
            return false;
        },
        validateElectricPrice() {
            if(this.cost.electric >= 0) return true;
            this.isElectric = true;
            setTimeout(() => this.isElectric = false, 3000);
            return false;
        },
        validateWaterPrice() {
            if(this.cost.water >= 0) return true;
            this.isWater = true;
            setTimeout(() => this.isWater = false, 3000);
            return false;
        },
        validateWifiPrice() {
            if(this.cost.wifi >= 0) return true;
            this.isWifi = true;
            setTimeout(() => this.isWifi = false, 3000);
            return false;
        },
        validateThirdStep() {
            const main = this.validateMainPrice();
            const electric = this.validateElectricPrice();
            const water = this.validateWaterPrice();
            const wifi = this.validateWifiPrice();
            return main && electric && water && wifi;
        }
    },
    created() {
        Object.assign(this.cost, this.postThirdStep);
    },
    destroyed() {
        this.onData(this.cost);
    }
}
</script>
<style lang="scss" scoped>
.third-step {

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

        &__addition {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #3E74FF;
          border-radius: 8px;
          padding: 15px 0;
          color: #3E74FF;
          cursor: pointer;

          &:hover {
            font-weight: 600;
          }

          & > i {
            font-size: 28px;
            padding-right: 20px;
          }

          & > span {
            font-size: 18px;
          }
        }

    }

    &--info {

        &__title {
            display: inline-block;
            padding-bottom: 5px;
            font-weight: 600;
            font-size: 20px;
        }

        &__addon {
            margin: 10px 0;
            &-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 18px;
                margin: 10px 0;

                & span {
                    padding: 0 5px;
                }

                &-delete {
                    font-weight: 600;
                    cursor: pointer;
                    color: #FD3D76;
                }
            }
        }
    }
}

</style>

