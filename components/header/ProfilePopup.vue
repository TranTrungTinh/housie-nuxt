<template>
  <a-popover trigger="click" placement="bottomRight" v-model="visible">
    <div slot="content">
      <div class="profile-item" @click="handleNavigate(1)">
        <i class="fal fa-address-card"></i>
        <a>Hồ sơ cá nhân</a>
      </div>
      <div class="small-divider"></div>
      <div class="profile-item" @click="handleCreatePost">
        <a>Đăng phòng</a>
      </div>
      <div class="profile-item" @click="handleCreateRent">
        <a>Tạo tin tìm phòng</a>
      </div>
      <div class="small-divider"></div>
      <div class="profile-item" @click="handleNavigate(4)">
        <!-- <i class="fal fa-home-heart"></i> -->
        <a>Phòng cho thuê</a>
      </div>
      <div class="profile-item" @click="handleNavigate(2)">
        <!-- <i class="fas fa-home-lg-alt"></i> -->
        <a>Phòng nhờ xem giúp</a>
      </div>
      <div class="profile-item" @click="handleNavigate(3)">
        <!-- <i class="fas fa-home-lg-alt"></i> -->
        <a>Tin cần thuê</a>
      </div>
      <div class="small-divider"></div>
      <div class="profile-item logout" v-show="!loading" @click="handleLogout">
        <i class="fal fa-sign-out-alt"></i>
        <a>Đăng xuất</a>
      </div>
      <div class="profile-item--loading" v-show="loading">
        <i class="fas fa-spinner fa-pulse" ></i>
      </div>
    </div>
    <a-avatar :size="40" :src="renderAvatar" icon="user" @click="open"/>
  </a-popover>
</template>
<script>
import { mapActions } from 'vuex';
import { format } from '@/helpers';

export default {
  props: {
    avatar: { type: String }
  },
  data () {
    return {
      visible: false,
      loading: false
    }
  },
  computed: {
    renderAvatar() {
      if(!this.avatar) return '';
      return format.formatImg(this.avatar);
    }
  },
  methods: {
    ...mapActions({
      logout: 'user/logout',
      updateCurrentTab: 'utilities/updateCurrentTab'
    }),
    open () { this.visible = true },
    hide() { this.visible = false },
    handleNavigate(index) {
      this.$router.push('/account');
      this.updateCurrentTab(index);
      this.hide();
    },
    handleLogout() {
      this.loading = true;
      this.logout()
      .then(() => {
        this.loading = false;
        this.$router.push('/');
      })
      .catch(() => this.loading = false)
    },
    handleCreatePost() {
      this.$router.push({ path: '/post' });
      this.hide();
    },
    handleCreateRent() {
      this.$router.push({ path: '/rent' });
      this.hide();
    }
  }
}
</script>
<style lang="scss" scoped>
.user-profile {
  cursor: pointer;
}
.profile-item {

  display: flex;
  align-items: center;
  margin: 7px 0;
  & a {
    color: #555;
  }

  & i {
    padding-right: 10px;
  }

  &:hover {
    color: #FD3D76;
  }
  & a:hover {
    color: #FD3D76;
  }

  &--loading {
    text-align: center;
    color: #FD3D76;
    font-size: 16px;
  }
}
.logout {
  color: #FD3D76;
  & a {
    color: #FD3D76;
  }
}
.small-divider {
  border-top: 1px solid #ddd;
  margin: 5px 0;
}
</style>
