<template>
  <div class="user-info">
    <div class="user-info--title">Thông tin tài khoản</div>
    <a-divider></a-divider>
    <div class="user-info--body">
      <a-form :form="form">
        <a-form-item class="user-info--body__item">
          <div class="user-info--body__item-label">Họ</div>
          <div class="user-info--body__item-input">
            <a-input
              size="large"
              v-decorator="[ 'firstName', { rules: rules.firstName, initialValue: user.firstName || ''}]"
              placeholder="Nhập họ của bạn"
              :disabled="!isEdit"
            />
          </div>
        </a-form-item>

        <a-form-item class="user-info--body__item">
          <div class="user-info--body__item-label">Tên</div>
          <div class="user-info--body__item-input">
            <a-input
              size="large"
              v-decorator="[ 'lastName', { rules: rules.lastName, initialValue: user.lastName || ''}]"
              placeholder="Nhập tên của bạn"
              :disabled="!isEdit"
            />
          </div>
        </a-form-item>

        <a-form-item class="user-info--body__item">
          <div class="user-info--body__item-label">Số điện thoại</div>
          <div class="user-info--body__item-input">
            <a-input
              size="large"
              v-decorator="[ 'phone', { initialValue: user.phone || '' }]"
              type="number"
              placeholder="Nhập số điện thoại của bạn"
              :disabled="!isEdit"
            />
          </div>
        </a-form-item>

        <a-form-item class="user-info--body__item">
          <div class="user-info--body__item-label">Email</div>
          <div class="user-info--body__item-input">
            <a-input
              size="large"
              v-decorator="[ 'email', { initialValue: user.email || ''}]"
              placeholder="Nhập email của bạn"
              disabled
            />
          </div>
        </a-form-item>
      </a-form>
      
      <div class="user-info--body__item">
        <div class="user-info--body__item-label">Mật khẩu</div>
        <a-button class="user-info--body__item-button" @click="showChangePassword">
          Đổi mật khẩu
        </a-button>
      </div>
    </div>
    <a-divider></a-divider>
    <div class="user-info--footer">
      <div v-if="isEdit">
        <a-button type="dashed" size="large" @click="toggleEdit">Huỷ</a-button>
        <a-button class="user-info--footer-button" size="large" @click="handleSubmit" >
          Lưu thay đổi
        </a-button>
      </div>
      <a-button type="primary" size="large" @click="toggleEdit" v-else>
        Thay đổi thông tin
      </a-button>
    </div>
    <change-password ref="changePassword"/>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
const ChangePassword = () => import('@/components/user/ChangePassword.vue');

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  components: { ChangePassword },
  props: {
    user: { type: Object, required: true }
  },
  data() {
    return {
      rules: {
        firstName: [{ required: true, message: 'Nhập họ của bạn !'}],
        lastName: [{ required: true, message: 'Nhập tên của bạn !'}]
      },
      isEdit: false
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'user/updateProfile'
    }),
    showChangePassword () {
      this.$refs.changePassword.showModal();
    },
    toggleEdit() {
      this.isEdit = !this.isEdit
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, userProfile) => {
        if(err) return;

        this.updateProfile(userProfile)
        .then(() => {
          this.toggleEdit();
          this.$message.success('Thay đổi thông tin thành công');
        })
        .catch(() => {
          this.toggleEdit();
          this.$message.error('Có lỗi khi thay đổi thông tin')
        })
      });
    }
  },
  created() {
    document.title = 'Hồ sơ cá nhân - Housie';
  }
}
</script>
<style lang="scss" scoped>
.user-info {

  &--title {
    font-weight: bold;
    font-size: 24px;
    padding: 15px 0 0 30px;
  }

  &--body {
    padding: 0px 30px;

    &__item {
      margin: 20px 0;
      font-size: 18px;

      &-label {
        font-weight: 600;
        margin-bottom: 10px;
      }

      &-button {
        border: none;
        padding: 0;
        color: #FD3D76;
        font-weight: bold;
      }
    }
  }

  &--footer {
    padding: 0 30px 30px 30px;

    &-button,
    &_button:focus {
      background: #FD3D76;
      color: #fff;
      border: none;

      margin-left: 20px;
    }

  }
}
</style>


