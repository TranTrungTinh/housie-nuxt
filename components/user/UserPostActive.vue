<template>
    <div class="user-request">
        <div class="user-request--status__right">
          <i class="fal fa-ellipsis-h-alt"></i>
          <div class="user-request--status__right--popup">
            <span @click="handleHide(id)">Ẩn tin</span>
            <div class="small"></div>
            <span @click="handleDelete(id)">Xoá tin</span>
          </div>
        </div>
        <div @click="handleDetail(id)" style="cursor: pointer">
          <a-row :gutter="20" class="user-request--task">
            <a-col :lg="8">
              <img v-lazy="attactment" />
            </a-col>
            <a-col :lg="16" class="user-request--task-content">
              <div class="user-request--task-content--created">Tạo ngày {{ created }}</div>
              <div class="user-request--task-content--desc">{{title}}</div>
              <div class="user-request--task-content--address">{{description}}</div>
            </a-col>
          </a-row>
          <a-divider></a-divider>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        id: { type: Number, required: true, default: () => 1 },
        created: { type: String, required: true, default: () => '' },
        attactment: { type: String, required: true, default: () => '' },
        title: { type: String, required: true, default: () => '' },
        description: { type: String, required: true, default: () => '' },
        onHide: { type: Function, required: true, default: () => {} }
    },
    methods: {
        
        handleDetail(id) {
            this.$router.push({ path: `/posts/${id}` })
        },
        handleDelete(id) {
            this.$message.info('Chưa hổ trợ xoá tin đăng.')
        // this.deletePostById(id)
        // .then(() => {
        //   this.posts = this.posts.filter(post => post.id !== id)
        // })
        // .catch(() => this.$message.error('Không thể xoá tin !!! Thử lại sau.'))
        },
        handleHide(id) {
          const hide = this.onHide;
          this.$confirm({
              title: 'Bạn có chắc ẩn tin ?',
              content: 'Tin của bạn sẽ được ẩn ngay lập tức.',
              onOk() { hide(id) }
          });
        }
    }
}
</script>
<style lang="scss" scoped>
.user-request {
  position: relative;
  
  &--status {
    
    &__right {
      position: absolute;
      top: -10px;
      right: 0;
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
      }
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

      &--created {
        color: #3E74FF;
        font-size: 18px;
      }

    }
  }
}
</style>
