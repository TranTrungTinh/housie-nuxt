<template>
<div class="login-form">
  <a-form :form="form" @submit="handleSubmit">
    <div class="login-form--welcome">
      <h1>
        <i class="fal fa-angle-left" @click="enableTab(1)"></i>
        <span>Đăng nhập</span>
      </h1>
    </div>
    <a-form-item class="login-form--item" label="Email">
      <a-input
        size="large"
        v-decorator="[ 'email', { rules: rules.email }]"
        type="email"
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
    <a-form-item v-if="error">
      <a-alert :message="error" type="error" showIcon closable @close="onStatusClose"/>
    </a-form-item>
    <a-row type="flex" justify="center">
      <a-col :xs="24">
        <a-button html-type="submit" class="login-form--item__button">
          <span>Đăng nhập</span>
        </a-button>
      </a-col>
    </a-row>
    <a-form-item class="login-form--item">
      <a class="login-form--item__forgot" @click="onToggleLogin">Quên mật khẩu?</a>
    </a-form-item>
  </a-form>
</div>
</template>

<script>
import { mapGetters, mapActions }  from 'vuex';

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  props: {
    onToggleLogin: { type: Function, required: true, default: () => {} },
    enableTab: { type: Function, required: true, default: () => {} }
  },
  data () {
      return {
          rules: {
              email: [{ required: true, message: 'Nhập địa chỉ email !' }],
              password: [{ required: true, message: 'Nhập password !' }],
              // remeber: { valuePropName: 'checked', initialValue: false }
          },
          isShowPassword: false,
      }
  },
  computed: {
    ...mapGetters({ error: 'user/currentError' }),
  },
  methods: {
    ...mapActions({
      userLogin: 'user/login',
      clearError: 'user/clearError'
    }),
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) return;
        this.userLogin(values);
      });
    },
    toggleShowPassword() { this.isShowPassword = !this.isShowPassword },
    onStatusClose() { this.clearError() }
  }
};
</script>
<style lang="scss" scoped>
.login-form {

  &--welcome {
    // text-align: center;

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
      margin: 15px 0;
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

  &--third-party {
    margin: 50px 0 10px 0;
    display: flex;
    align-items: center;

    &--item {
        margin-right: 10px;
    
        & > span {
            display: inline-block;
            width: 35px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            margin: 0 5px;
            border-radius: 5px;
            cursor: pointer;

            transition: transform 0.3s ease-out;

            &:hover {
                transform: scale(1.2);
            }

            & > i {
                color: #fff;
            }
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