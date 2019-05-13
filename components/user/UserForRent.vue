<template>
  <div class="user-request">
    <h2 class="user-request--title">Phòng cho thuê</h2>
    <a-divider></a-divider>
    <div class="user-request-wrap">
      <div class="user-request--status" v-for="(post, i) in posts" :key="i">
        <div class="user-request--status__right">
          <i class="fal fa-ellipsis-h-alt"></i>
          <div class="user-request--status__right--popup">
            <span @click="handleDetail(post.id)">Chi tiết</span>
            <div class="small"></div>
            <span @click="handleDelete(post.id)">Xoá tin</span>
          </div>
        </div>
        <a-row :gutter="20" class="user-request--task">
          <a-col :lg="8">
            <img v-lazy="renderImg(post.attactment[0])" />
          </a-col>
          <a-col :lg="16" class="user-request--task-content">
            <div class="user-request--task-content--price">{{ post.price | currency }} đ/tháng</div>
            <div class="user-request--task-content--desc">
              {{post.title}}
            </div>
            <div class="user-request--task-content--address">
              {{post.description}}
            </div>
          </a-col>
        </a-row>
        <a-divider></a-divider>
      </div>
    </div>
    <div class="user-request_loading" v-if="posts.length === 0">
        <i class="fal fa-spinner fa-spin" v-if="loading"></i>
        <p v-else>Không có dữ liệu</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { format } from '@/helpers';

export default {
  props: {
    idUser: { type: Number, required: true, default: () => 1  }
  },
  data() {
    return {
      posts: [],
      loading: false
    }
  },
  methods: {
    ...mapActions({
      getPostsByOwner: 'post/getPostsByOwner',
      deletePostById: 'post/deletePostById'
    }),
    renderImg(image) {
      return format.formatImg(image);
    },
    handleDetail(id) {
      this.$router.push({ path: `/post/${id}` })
    },
    handleDelete(id) {
      // this.deletePostById(id)
      // .then(() => {
      //   this.posts = this.posts.filter(post => post.id !== id)
      // })
      // .catch(() => this.$message.error('Không thể xoá tin !!! Thử lại sau.'))
    }
  },
  created() {
    document.title = 'Phòng cho thuê - Housie';
    this.loading = true;
    this.getPostsByOwner(this.idUser)
    .then(data => {
      this.posts = data;
      this.loading = false;
    })
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

  &--status {
    
    &__right {
      position: relative;
      float: right;
      z-index: 10;
      cursor: pointer;

      &:hover &--popup {
        display: block;
      }

      & > i {
        cursor: pointer;
        font-size: 24px;
        color: #8A8A8F;
      }

      &--popup {
        display: none;
        position: absolute;
        right: 0px;

        background: #fff;
        color: #FD3D76;
        border-radius: 8px;
        width: 100px;
        text-align: center;
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.32);
        cursor: pointer;
        opacity: 0.5;

        & > span {
          display: block;
          padding: 7px 0;

          &:first-child {
            border-radius: 8px 8px 0 0;
          }
          &:last-child {
            border-radius: 0 0 8px 8px;
          }
          &:hover {
            background: #FD3D76;
            color: #fff;
          }
        }

        &:hover {
          opacity: 1;
        }
      }
    } 
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

  &--task {

    & img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    &-content {
      padding-left: 20px !important;
      line-height: 30px;

      &--price {
        font-size: 20px;
        margin-top: 10px;
        font-weight: 700;
        color: #FD3D76;
      }

      &--desc {
        font-size: 18px;
        padding: 5px 0;
        font-weight: bold;
      }

      &--address {
        color: #8A8A8F;
      }

      &--btn-inprogess {
        background-color: #FDEAF0 !important;
        color: #FD3D76 !important;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
        border-color: #FD3D76 !important;

        &:hover {
          border-color: #FD3D76 !important;
        }
        
      }

    }
  }
}
.small {
  height: 2px;
  background: #f2f2f4;
  width: 100%;
}
</style>