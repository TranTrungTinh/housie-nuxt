<template>
    <div class="auth">
        <div class="auth-header">
            Đăng nhập
        </div>
        <div class="auth-body">
            <div class="auth-body--item">
                <v-facebook-login 
                    class="auth-body--item__button auth-body--item__bface"
                    :app-id="facebookID" 
                    @login="onFBSignInSuccess"
                    @logout="onFBLogout"
                >
                    <span slot="login">Đăng nhập bằng Facebook</span>
                    <span slot="logout">Đăng xuất tài khoản Facebook</span>
                    <span slot="working">Vui lòng chờ...</span>
                </v-facebook-login>
            </div>
            <div class="auth-body--item">
                <GoogleLogin 
                    class="auth-body--item__button auth-body--item__bgoogle"
                    :params="google" :onSuccess="onSignInSuccess" :onFailure="onSignInError"
                >
                    <i class="fab fa-google"></i>
                    Đăng nhập bằng Google
                </GoogleLogin>
            </div>
            <div class="auth-body--item">
                <a-button class="auth-body--item__button auth-body--item__bemail" @click="enableTab(2)">
                    Đăng nhập bằng Email
                </a-button>
            </div>
            <div class="auth-body--item">
                <div style="text-align: center">
                    <span class="auth-body--item__or">
                        <span class="auth-body--item__or-content">
                            Bạn chưa có tài khoản?
                        </span>
                    </span>
                </div>
            </div>
            <div class="auth-body--item">
                <a-button class="auth-body--item__button auth-body--item__bnew" @click="enableTab(3)">
                    Tạo tài khoản mới
                </a-button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
    props: {
        enableTab: { type: Function, required: true, default: () => {} }
    },
    data () {
        return {
            google: {
                client_id: '152052445460-v0069uh9l462hqk4uo2bp06ap9rd4701.apps.googleusercontent.com'
            },
            facebookID: '316767342341037'
        }
    },
    methods: {
        ...mapActions({
            loginGoogle: 'user/loginGoogle',
            loginFacebook: 'user/loginFacebook',
            logoutFacebook: 'user/logoutFacebook'
        }),
        onSignInSuccess (googleUser) {
            // console.log(googleUser.Zi.access_token);
            this.loginGoogle({ token: googleUser.Zi.access_token })
            .then(() => this.$message.success('Đăng nhập thành công'))
            .catch(() => this.$message.error('Không thể đăng nhập bằng Google lúc này.'))
        },
        onSignInError (error) {},
        onFBSignInSuccess (facebookUser) {
            this.loginFacebook({ token: facebookUser.authResponse.accessToken})
            .then(() => this.$message.success('Đăng nhập thành công'))
            .catch(() => this.$message.error('Không thể đăng nhập bằng Facebook lúc này.'))
        },
        onFBLogout(facebookUser) {
            this.logoutFacebook({ token: facebookUser.authResponse.accessToken });
        }
    }
}
</script>
<style lang="scss" scoped>
.auth {
    &-header {
        font-size: 36px;
        font-weight: 700;
    }
    &-body {
        margin: 40px 0;
        &--item {
            margin: 20px 0;

            &__button {
                width: 100%;
                height: 50px;
                border-radius: 16px !important;
                font-size: 18px;
                border: none;
            }

            &__or {
                position: relative;

                &-content {
                    font-size: 15px;
                    font-weight: 300;
                    color: rgb(118, 118, 118);
                    line-height: 20px;
                    padding: 0 15px;
                }

                &::before {
                    content: "" !important;
                    position: absolute !important;
                    border-bottom: solid 1px #e4e4e4 !important;
                    top: 50%;
                    right: 100%;
                    width: 500px;
                }

                &::after {
                    content: "";
                    position: absolute;
                    border-bottom: solid 1px #e4e4e4;
                    top: 50%;
                    left: 100%;
                    width: 500px;
                }
            }

            &__bface,
            &__bface:focus {
                
                background: #0066C5;
                color: #fff;
                cursor: pointer;

                &:hover {
                    background: #3b5998;
                    color: #fff;
                    border: none;
                }
                & > i {
                    padding-right: 20px;
                }
                
            }

            &__bgoogle,
            &__bgoogle:focus {
                background: #d62d20;
                color: #fff;
                outline: 0;
                cursor: pointer;

                &:hover {
                    background: #DB4437;
                    color: #fff;
                    border: none;
                }
                & > i {
                    padding-right: 20px;
                }
            }

            &__bemail,
            &__bemail:focus {
                background: #FD3D76;
                color: #fff;

                &:hover {
                    background: #FD3D76;
                    color: #fff;
                    border: none;
                }
            }

            &__bnew,
            &__bnew:focus {
                margin-top: 20px;
                background: #EFEFF4;

                &:hover {
                    background: #EFEFF4;
                    border: none;
                    color: #3E74FF;
                }
            }
        }
    }
}
.g-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
}
</style>


