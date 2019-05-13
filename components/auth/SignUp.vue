<template>
<div class="login-form">
  <a-form :form="form" @submit="handleSubmit">
    <div class="login-form--welcome">
      <h1>
        <i class="fal fa-angle-left" @click="enableTab(1)"></i>
        <span>Tạo tài khoản mới</span>
      </h1>
    </div>
    <a-form-item class="login-form--item" label="Họ">
      <a-input
        size="large"
        v-decorator="[ 'firstName', { rules: rules.firstName }]"
        placeholder="Nhập họ của bạn"
      >
      </a-input>
    </a-form-item>
    <a-form-item class="login-form--item" label="Tên">
      <a-input
        size="large"
        v-decorator="[ 'lastName', { rules: rules.lastName }]"
        placeholder="Nhập tên của bạn"
      >
      </a-input>
    </a-form-item>
    <a-form-item class="login-form--item" label="Email">
      <a-input
        size="large"
        type="email"
        v-decorator="[ 'email', { rules: rules.email }]"
        placeholder="Nhập địa chỉ Email của bạn"
      >
      </a-input>
    </a-form-item>
    <a-form-item class="login-form--item" label="Mật khẩu">
      <a-input
        size="large"
        v-decorator="[ 'password', { rules: rules.password }]"
        :type="isShowPassword ? 'text' : 'password'"
        placeholder="Nhập mật khẩu"
      >
        <a-icon slot="suffix" :type="isShowPassword ? 'eye-invisible' : 'eye'" @click="toggleShowPassword" />
      </a-input>
    </a-form-item>
    <a-form-item class="login-form--item" label="Số điện thoại">
      <a-input
        size="large"
        v-decorator="[ 'phone', { rules: rules.phone }]"
        type="number"
        placeholder="Số điện thoại của bạn"
      >
        <a-select slot="addonBefore" style="width: 70px" defaultValue="84">
          <a-select-option value="84">+84</a-select-option>
        </a-select>
      </a-input>
    </a-form-item>
    
    <a-row type="flex" justify="center">
      <a-col :xs="24">
        <a-button html-type="submit" class="login-form--item__button">
          Đăng ký
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import { messageError } from '@/helpers/messageError';
import { EventBus } from '@/helpers/event-bus';

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  props: {
    enableTab: { type: Function, required: true }
  },
  data () {
      return {
          rules: {
            firstName: [{ required: true, message: 'Nhập họ của bạn!' }],
            lastName: [{ required: true, message: 'Nhập tên của bạn!' }],
            email: [
              { required: true, message: 'Nhập email !' },
              { validator: this.validatorEmail }
            ],
            password: [
              { required: true, message: 'Nhập password của bạn !' },
              { min: 8, message: 'Password phải có ít nhất 8 ký tự !' }
            ],
            phone: [
              { required: true, message: 'Nhập số điện thoại của bạn!' },
              { validator: this.validatorPhoneNumber }
            ],
          },
          isShowPassword: false
      }
  },
  methods: {
    ...mapActions({
      signUp: 'user/signUp'
    }),

    validatorEmail(rule, value, callback) {
      const rgex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (value && !rgex.test(value.toLowerCase())) {
        callback('Email của bạn không hợp lệ !!!');
      } else {
        callback();
      }
    },
    validatorPhoneNumber(rule, value, callback) {
      const rgex = /^([3|5|7|8|9]){1}[0-9]{8}$/i;
      if (value && !rgex.test(value)) {
        callback('Số điện thoại không hợp lệ !!!');
      } else {
        callback();
      }
    },
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, userProfile) => {
        if(err) return;

        this.signUp(userProfile)
        .then(this.signUpSuccess)
        .catch(this.signUpFail)
      });
    },
    toggleShowPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    signUpSuccess() {
      const initValue = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
      }
      this.$message.success('Đăng ký thành công');
      this.form.setFieldsValue(initValue);
      EventBus.$emit('signup-success');
    },
    signUpFail({ response }) {
      this.$message.error(messageError(response.status));
    }
  },
};
</script>
<style lang="scss" scoped>
.login-form {

  // max-width: 500px;
  
  &--welcome {

    & h1 {
      display: flex;
      align-items: center;

      font-size: 28px;
      font-weight: 700;

      & > i {
        padding-right: 10px;
        font-size: 38px;
        color: #FD3D76;
        cursor: pointer;
      }
    }
  }

  &--item {
    margin: 7px 0;

    &__checkbox {
      color: #000;
    }

    &__forgot {
      color: #FD3D76;
      float: right;

      &:hover {
        text-decoration: none;
        color: #FD3D76;
      }
    }

    &__button,
    &__button:focus {
      margin-top: 10px;
      font-size: 18px;
      color: #fff;
      border-radius: 10px;
      width: 100%;
      height: 50px;
      background: #FD3D76;
      border: none;

      &:hover {
        border: none;
        color: #fff;
        background: #FD3D76;
      }
    }
  }
  &--sign-up {
    margin-top: 30px;
    padding-top: 20px;
    text-align: center;

    & a {
      color: #333;
      text-decoration: underline;
    }
  }
}
</style>