<template>
  <div class="user-request">
    <h2 class="user-request--title">Phòng cho thuê</h2>
    <a-divider></a-divider>
    <div class="user-request-wrap">
      <div class="user-request--status" v-for="(post, i) in posts" :key="i">
        <PostActive 
          v-if="post.status === 'active'"
          :id="post.id"
          :attactment="renderImg(post.attactment[0])"
          :title="post.title"
          :description="post.description"
          :created="formatDay(post.created)"
          :onHide="onHandleHide"
        />
        <PostDeActive 
          v-if="post.status === 'deactive'"
          :id="post.id"
          :attactment="renderImg(post.attactment[0])"
          :title="post.title"
          :description="post.description"
          :created="formatDay(post.created)"
          :onShow="onHandleShow"
        />
      </div>
    </div>
    <div class="user-request_loading" v-if="posts.length === 0">
        <i class="fal fa-spinner fa-spin" v-if="loading"></i>
        <p v-else>Không có dữ liệu</p>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import { mapActions } from 'vuex';
import { format } from '@/helpers';
const PostActive = () => import('./UserPostActive');
const PostDeActive = () => import('./UserPostDeActive');

export default {
  props: {
    idUser: { type: Number, required: true, default: () => 1  }
  },
  components: { PostActive, PostDeActive },
  data() {
    return {
      posts: [],
      loading: false
    }
  },
  methods: {
    ...mapActions({
      getPostsByOwner: 'post/getPostsByOwner',
      deletePostById: 'post/deletePostById',
      updatePostByOwner: 'post/updatePostByOwner'
    }),
    loadPosts() {
      this.loading = true;
      this.getPostsByOwner(this.idUser).then(result => {
        this.posts = result.data;
        this.loading = false;
      })
    },
    renderImg(image) {
      return format.formatImg(image);
    },
    formatDay(day) {
      return moment(day).format('DD/MM/YYYY');
    },
    onHandleHide(id) {
      this.updatePostByOwner({ id, status: 'deactive' })
      .then(() => this.loadPosts())
      .catch(() => this.$message.error('Không thể ẩn tin ngay lúc này.'))
    },
    onHandleShow(id) {
      this.updatePostByOwner({ id, status: 'active' })
      .then(() => this.loadPosts())
      .catch(() => this.$message.error('Không thể ẩn tin ngay lúc này.'))
    }
  },
  created() {
    this.loadPosts()
  },
  head() {
    return {
      title: 'Phòng cho thuê - Housie'
    }
  }
}
</script>
<style lang="scss" scoped>
.user-request {
  padding: 15px 0;

  &--title {
    font-weight: bold;
    font-size: 24px;
    padding-left: 30px;
  }

  &-wrap {
    // margin: 20px 0;
    padding: 10px 20px;
    // max-height: 600px;
    // overflow-y: scroll;
  }

  &_loading {
    text-align: center;
    line-height: 50px;

    & > i {
      font-size: 50px;
      font-weight: 500;
      color: #FD3D76;
    }

    & > p {
      font-size: 15px;
      color: #8A8A8F;
    }
  }

}
.small {
  height: 2px;
  background: #f2f2f4;
  width: 100%;
}
</style>