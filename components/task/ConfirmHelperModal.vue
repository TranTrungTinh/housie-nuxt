<template>
    <a-modal v-model="visible" :footer="null" :closable="false">
        <span class="helper-close" @click="visible = false">
            <i class="far fa-times"></i>
        </span>
        <div class="helper-modal">
            <div class="helper-modal--title">Xem phòng giúp</div>
            <div class="helper-modal--des">Housie sẽ có người đến xem phòng và gửi lại hình ảnh thực tế giúp cho bạn</div>
            <div class="helper-modal--img">
                <img src="~@/assets/img/task-img.jpg" alt="Task img" />
            </div>
            <div class="helper-modal--checked">
                <a-checkbox @change="onChange">Không hiện lại thông báo này</a-checkbox>
            </div>
            <div class="helper-modal--button" @click="handleNext">Tiếp tục</div>
        </div>
    </a-modal>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            checked: false
        }
    },
    methods: {
        showModal() {
            this.visible = true;
        },
        onChange(e) {
            this.checked = e.target.checked;
        },
        handleNext() {
            // const existing = localStorage.getItem('confirm-task');
            if(this.checked) {
                localStorage.removeItem('confirm-task');
                localStorage.setItem('confirm-task', this.checked);
            };
            this.$router.push({ path: `${this.$route.path}/task` });
        }
    }
}
</script>
<style lang="scss" scoped>
.helper-close {
    color: #FD3D76;
    font-size: 24px;
    cursor: pointer;
}
.helper-modal {
    padding: 20px 0;

    &--title {
        font-size: 24px;
        font-weight: 600;
        color: #000;
    }

    &--des {
        font-size: 16px;
        padding: 20px 0;
        font-weight: 400;
    }

    &--img {

        & > img {
            display: block;
            margin: 0 auto;
            width: 300px;
            height: auto;
        }
    }

    &--button {
        background: #FD3D76;
        color: #fff;
        font-size: 18px;
        border-radius: 8px;
        margin-top: 20px;
        padding: 15px 0;
        text-align: center;
        cursor: pointer;
    }
}
</style>


