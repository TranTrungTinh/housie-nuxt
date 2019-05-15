<template>
    <a-modal v-model="visible" :footer="null" :closable="false" :maskClosable="false" :width="800">
        <span class="header-close" @click="visible = false">
            <i class="far fa-times"></i>
        </span>
        <div class="modal-body">
            <div class="modal-step--item">
                <span class="modal-step--info__title">Tiêu đề bài đăng</span>
                <span style="float: right">{{ 20 }}/50</span>
                <a-input 
                    size="large" 
                    type="text" 
                    placeholder="Điền tiêu đề để thu hút nhiều lượt xem tin hơn."
                    maxlength="50"
                    v-model="postUpdate.title"
                />
                <!-- <a-alert
                    class="modal-step--item-error"
                    type="error" 
                    message="Nhập tiêu đề bài đăng!!!" 
                    showIcon 
                /> -->
            </div>
            <div class="modal-step--item">
                <span class="modal-step--info__title">Nội dung mô tả</span>
                <span style="float: right">{{ 20 }}/50</span>
                <a-textarea 
                    size="large"
                    maxlength="1500" 
                    placeholder="Mô tả bằng tiếng Việt có dấu.
            - Giờ đóng cửa, mở cửa, chung chủ không, có chìa khoá riêng,...
            - Nội thất cơ bản, hoặc liệt kê nội thất có sẳn.
            - Khu sinh hoạt chung, riêng: Phòng khách, phòng ngủ, bếp, nhà vệ sinh.
            - Thời gian đi đến (chợ, siêu thị, trung tâm mua sắm), tiện ích gần nhất." 
                    :autosize="{ minRows: 6, maxRows: 15 }"
                    v-model="postUpdate.description"
                />
            </div>
            <div class="modal-step--item">
                <span class="modal-step--info__title">Giá thuê</span>
                <a-input 
                    size="large" type="number" 
                    addonAfter="đ/tháng" 
                    placeholder="VD: 3.000.000"
                    v-model="postUpdate.price"
                />
            </div>
            <a-row :gutter="16">
                <a-col :xs="12">
                    <div class="modal-step--item">
                        <span class="modal-step--info__title">Diện tích</span>
                        <a-input 
                            size="large" 
                            type="number"
                            addonAfter="m2"
                            v-model="postUpdate.square"
                        />
                    </div>
                </a-col>
                <a-col :xs="12">
                    <div class="modal-step--item">
                        <span class="modal-step--info__title">Sức chứa</span>
                        <a-input 
                            size="large" 
                            type="number"
                            addonAfter="người"
                            value="4"
                        />
                    </div>
                </a-col>
            </a-row>
            <div class="modal-step--item">
                <span class="modal-step--info__title">Tiện ích</span>
            </div>
        </div>
    </a-modal>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            postUpdate: {
                title: '',
                description: '',
                price: 0,
                square: 0
            }
        }
    },
    methods: {
        showModal() {
            this.visible = true;
        },
        receiveData(postDetail) {
            Object.assign(this.postUpdate, postDetail);            
        }
    }
}
</script>
<style lang="scss" scoped>
.header-close {
    color: #FD3D76;
    font-size: 24px;
    cursor: pointer;
}

.modal { 
    &-body {
        padding: 10px 30px;
    }

    &-step {
        &--item {
            margin: 20px 0;
        }

        &--info {

            &__title {
                display: inline-block;
                padding-bottom: 5px;
                font-weight: 600;
                font-size: 20px;
            }

            &__sub {
                font-weight: 400;
                font-size: 18px;
            }
        }
    }
}
</style>



