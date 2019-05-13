<template>
  <a-modal v-model="visible" :footer="null" :closable="false">
    <span class="user--close" @click="close">
      <i class="far fa-times"></i>
    </span>
    <div class="user--title">Đổi mật khẩu</div>
    <a-form class="user-passowrd--form" :form="form" @submit="handleSubmit">
      <a-form-item class="user-info--body__item">
        <div class="user-info--body__item-label">Mật khẩu hiện tại</div>
        <div class="user-info--body__item-input">
          <a-input
            size="large"
            type="password"
            v-decorator="[ 'oldPassword', { rules: rules.oldPassword }]"
            placeholder="Nhập mật khẩu hiện tại"
          />
        </div>
      </a-form-item>
      <a-form-item class="user-info--body__item">
        <div class="user-info--body__item-label">Mật khẩu mới</div>
        <div class="user-info--body__item-input">
          <a-input
            size="large"
            type="password"
            v-decorator="[ 'newPassword', { rules: rules.newPassword }]"
            placeholder="Nhập mật khẩu mới"
          />
        </div>
      </a-form-item>
      <a-form-item class="user-info--body__item">
        <div class="user-info--body__item-label">Xác nhận mật khẩu mới</div>
        <div class="user-info--body__item-input">
          <a-input
            size="large"
            type="password"
            v-decorator="['confirmNewPassword', { rules: rules.confirmNewPassword }]"
            placeholder="Xác nhận mật khẩu mới"
          />
        </div>
      </a-form-item>
      <a-form-item>
        <a-button class="user-info--footer-button" size="large" html-type="submit">
          Cập nhật mật khẩu mới
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      visible: false,
      rules: {
        oldPassword: [{ required: true, message: 'Nhập mật khẩu củ của bạn !'}],
        newPassword: [
          { required: true, message: 'Nhập mật khẩu mới của bạn !'},
          { min: 8, message: 'Password phải có ít nhất 8 ký tự !' }
        ],
        confirmNewPassword: [
          { required: true, message: 'Xác nhận lại mật khẩu mới của bạn !'},
          { validator: this.compareToFirstPassword }
        ]
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    ...mapActions({
      changePassword: 'user/changePassword'
    }),
    showModal() { this.visible = true },
    close() { this.visible = false },

    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('newPassword')) {
        callback('Mật khẩu không trùng nhau !!!');
      } else {
        callback();
      }
    },

    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, data) => {
        if(err) return;
        const userProfile = `oldPassword=${data.oldPassword}&newPassword=${data.newPassword}`;
        
        this.changePassword(userProfile)
        .then(this.onSuccess)
        .catch(() => this.$message.error('Mật khẩu củ không đúng'))
      })
    },
    onSuccess() {
      this.$message.success('Thay đổi mật khẩu thành công');
      this.form.setFieldsValue({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      this.close();
    }
  }
}
</script>
<style lang="scss" scoped>
.user--close {
    color: #FD3D76;
    font-size: 24px;
    cursor: pointer;
}
.user--title {
  margin-top: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #000;
}
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

    &-button,
    &_button:focus {
      background: #FD3D76;
      color: #fff;
      border: none;
      width: 100%;
    }

  }
}
</style>

