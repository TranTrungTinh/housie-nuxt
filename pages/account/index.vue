<template src="./index.html"></template>
<style src="./index.scss" lang="scss" scoped></style>

<script>
import { mapGetters, mapActions } from 'vuex';
import { initLoadProgress, currentUser } from '@/mixins';
import { UserInfo } from '@/components/user';
import { EventBus } from '@/helpers/event-bus';
import { format } from '@/helpers';
const UserRequest = () => import('@/components/user/UserRequest.vue');
const UserFindHouse = () => import('@/components/user/UserFindHouse.vue');
const UserForRent = () => import('@/components/user/UserForRent.vue');

export default {
  components: { UserInfo, UserRequest, UserFindHouse, UserForRent },
  mixins: [initLoadProgress, currentUser],
  data () {
    return {
      currentPage: 1,
      files: []
    };
  },
  computed: {
    ...mapGetters({ currentTab: 'utilities/currentTab'}),
    renderAvatar() {
      if(!this.currentUser.avatar) return '';
      return format.formatImg(this.currentUser.avatar);
    },
    renderName() {
      const { firstName, lastName } = this.currentUser;
      return format.formatName(firstName, lastName);
    }
  },
  created() {
    this.currentPage = this.currentTab;
  },
  mounted() {
    let loader = null;
    if(!this.isUser) { loader = this.$loading.show() }
    EventBus.$on('user-first-loading', () => {if(loader) loader.hide()});
  },
  methods: {
    ...mapActions({
        updateCurrentTab: 'utilities/updateCurrentTab',
        uploadFile: 'post/uploadFile',
        updateProfile: 'user/updateProfile'
    }),
    switchMenu(e) {
        this.currentPage = e.key;
        this.updateCurrentTab(e.key);
    },
    handleChange: () => [],
    
    async handleUploadAvatar({ data, file, onError, onProgress, onSuccess }) {
      const fileData = new FormData();
      fileData.append('file', file);
      const loader = this.$loading.show();
      // step 1: upload file
      const listFile = await this.uploadFile(fileData);
      // step 2: update profile
      this.updateProfile({  avatar: listFile[0] })
      .then(() => {
        loader.hide();
        this.$message.success('Upload avatar thành công');
      })
      .catch(() => this.$message.error('Có lỗi khi upload avatar'))
    }
  },
  destroyed() {
    EventBus.$off('user-first-loading');
  }
};
</script>

