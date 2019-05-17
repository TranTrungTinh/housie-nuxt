<template>
    <div class="step-confirm">
        <div class="step-confirm--item">
            <div class="step-confirm--item__title flex">
                <span>Tiêu đề</span>
                <a class="edit" @click="rollback(4)"><i class="fas fa-pencil"></i></a>
            </div>
            <div class="step-confirm--item__content" v-if="post.title">{{ post.title }}</div>
        </div>
        <div class="step-confirm--item">
            <div class="step-confirm--item__title flex">
                <span>Mô tả chi tiết</span>
                <a class="edit" @click="rollback(4)"><i class="fas fa-pencil"></i></a>
            </div>
            <div class="step-confirm--item__content" v-if="post.description">{{ post.description }}</div>
        </div>
        <div class="step-confirm--item">
            <div class="step-confirm--item__title flex">
                <span>Địa chỉ</span>
                <a class="edit" @click="rollback(1)"><i class="fas fa-pencil"></i></a>
            </div>
            <div class="step-confirm--item__content" v-if="post.address.town.data">
                {{ address }}
            </div>
        </div>
        <div class="step-confirm--item">
            <div class="step-confirm--item__title flex">
                <span>Thông tin</span>
                <a class="edit" @click="rollback(2)"><i class="fas fa-pencil"></i></a>
            </div>
            <div class="step-confirm--item__group">
                <div class="step-confirm--item__content flex first" v-if="post.roomType.data">
                    <span>Loại phòng</span>
                    <span>{{ post.roomType.data }}</span>
                </div>
                <div class="step-confirm--item__content flex middle" v-if="post.square">
                    <span>Diện tích</span>
                    <span>{{ post.square }}m<sup>2</sup></span>
                </div>
                <div class="step-confirm--item__content flex final" v-if="post.capacity">
                    <span>Sức chứa</span>
                    <span>{{ post.capacity }} người</span>
                </div>
            </div>
        </div>
        <div class="step-confirm--item">
            <div class="step-confirm--item__title flex">
                <span>Chi phí chính</span>
                <a class="edit" @click="rollback(3)"><i class="fas fa-pencil"></i></a>
            </div>
            <div class="step-confirm--item__group">
                <div class="step-confirm--item__content flex first">
                    <span>Giá thuê</span>
                    <span class="fill">{{ post.cost.main | currency }} đ/tháng</span>
                </div>
                <div class="step-confirm--item__content flex middle">
                    <span>Tiền điện</span>
                    <span class="fill">{{ post.cost.electric | currency }} đ/tháng</span>
                </div>
                <div class="step-confirm--item__content flex middle">
                    <span>Tiền nước</span>
                    <span class="fill">{{ post.cost.water | currency }} đ/tháng</span>
                </div>
                <div class="step-confirm--item__content flex final">
                    <span>Wifi/Internet</span>
                    <span class="fill">{{ post.cost.wifi | currency }} đ/tháng</span>
                </div>
            </div>
        </div>
        <div class="step-confirm--item">
            <div class="step-confirm--item__title flex">
                <span>Chi phí khác</span>
                <a class="edit" @click="rollback(3)"><i class="fas fa-pencil"></i></a>
            </div>
            <div class="step-confirm--item__group">
                <div class="step-confirm--item__content flex first">
                    <span>Tiền dọn rác</span>
                    <span class="fill">{{ post.cost.extensions.garbage | currency }} đ/tháng</span>
                </div>
                <div class="step-confirm--item__content flex middle">
                    <span>Tiền dọn vệ sinh</span>
                    <span class="fill">{{ post.cost.extensions.clean | currency }} đ/tháng</span>
                </div>
                <div class="step-confirm--item__content flex middle">
                    <span>Tiền gửi xe</span>
                    <span class="fill">{{ post.cost.extensions.parking | currency }} đ/tháng</span>
                </div>
                <div class="step-confirm--item__content flex middle">
                    <span>Tiền giặt ủi</span>
                    <span class="fill">{{ post.cost.extensions.laundry | currency }} đ/tháng</span>
                </div>
                <div class="step-confirm--item__content flex final">
                    <span>Chi phí thang máy</span>
                    <span class="fill">{{ post.cost.extensions.elevator | currency }} đ/tháng</span>
                </div>
            </div>
        </div>
        <div class="step-confirm--item">
            <div class="step-confirm--item__title flex">
                <span>Hình ảnh</span>
                <a class="edit" @click="rollback(4)"><i class="fas fa-pencil"></i></a>
            </div>
            <div class="step-confirm--item__imgs">
                <a-upload
                    name="files"
                    listType="picture"
                    :fileList="post.attachment"
                    @preview="handlePreview"
              >
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>  
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    props: { 
        onData: { type: Function } 
    },
    data () {
        return {
            previewVisible: false,
            previewImage: '',
        }
    },
    computed: {
        ...mapGetters({
            post: 'post/postState'
        }),

        address() {
            const { town, district, city, home } = this.post.address;
            return `${home}, ${town.data}, ${district.data}, ${city.data}`
        }
    },
    methods: {
        rollback(step) {
            this.onData(step);
        },
        handleCancel () {
            this.previewVisible = false;
        },
        handlePreview (file) {
            this.previewImage = file.url || file.thumbUrl
            this.previewVisible = true
        }
    }
}
</script>
<style lang="scss" scoped>
.step-confirm {

    &--item {
        margin-bottom: 10px;
        padding: 15px 20px;
        border: solid 1px #C8C7CC;
        border-radius: 8px;
        
        &__title {
            font-size: 24px;
            font-weight: 600;
            color: #3E74FF;
            padding-bottom: 7px;
            margin-bottom: 5px;
        }

        &__content {
            font-size: 18px;
            margin: 5px 0;
            padding: 15px 20px;
            font-weight: 500;
            border-radius: 30px;
            // border: solid 1px #FD3D76;
            color: #000;
            background: #f9f9f9;
        }
    }
}
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.first {
    border-radius: 30px 30px 30px 0;
}
.middle {
    border-radius: 0 30px 30px 0;
}
.final {
    border-radius: 0px 30px 30px 30px;
}
.fill {
    color: #FD3D76;
    font-weight: 600;
}
.edit {
    font-size: 18px;
    font-weight: 600;
}
</style>


