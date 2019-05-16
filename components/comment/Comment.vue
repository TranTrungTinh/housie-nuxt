<template>
<div class="comment">
  <div class="comment-must-sign comment-list" v-if="!isUser">
    <div v-for="item in demos" :key="item.id">
      <a-skeleton :loading="true" active avatar>
          <a-list-item-meta description="description">
            <a slot="title">title</a>
            <a-avatar slot="avatar" icon="user" />
          </a-list-item-meta>
          <div slot="content">content</div>
      </a-skeleton>
    </div>
    <div class="comment-must-sign__button" @click="onPress">
      Đăng nhập để xem bình luận
    </div>
  </div>
  <div v-else>
    <a-list class="comment-list" :dataSource="comments" v-if="comments.length > 0">
      <a-list-item class="comment-list--item" slot="renderItem" slot-scope="comment, index" :key="index">
        <div class="comment-list--item__edit" v-if="isOwnerComment(comment.account)">
          <i class="fal fa-ellipsis-h-alt"></i>
          <div class="comment-list--item__edit--popup">
            <!-- <span><i class="fal fa-edit"></i>  Sửa</span>
            <div class="small"></div> -->
            <span @click="handleDelete(comment.id)"><i class="fal fa-trash"></i> Xoá</span>
          </div>
        </div>
        <a-comment>
          <span slot="author" class="title">{{ renderName(comment.account) }}</span>
          <a-avatar alt="Image cover" :src="renderAvatar(comment.account)" icon="user" slot="avatar" />
          <span slot="datetime">{{ comment.created | fromNow }}</span>
          <div slot="content">{{ comment.content.trim() }}</div>
        </a-comment>
      </a-list-item>
    </a-list>
    <div class="comment-list" v-else>
      <h4>Chưa có bình luận</h4>
    </div>
    <div class="comment-form">
        <a-row :gutter="20">
            <a-col :xs="18" :md="19" :lg="20">
                <a-input 
                  size="large" 
                  type="text" 
                  placeholder="Thêm bình luận của bạn"
                  @pressEnter="handleEnter"
                  v-model.lazy="text" 
                />
            </a-col>
            <a-col :xs="6" :md="5" :lg="4">
                <div class="comment-form--button" @click="handleEnter">
                    <i class="fal fa-pencil-alt"></i>
                    <span>Thêm</span>
                </div>
            </a-col>
        </a-row>
    </div>
  </div>
  
</div>
</template>
<script>
import { EventBus } from '@/helpers/event-bus';
import { mapActions } from 'vuex';
import { currentUser } from '@/mixins';
import { format } from '@/helpers';

export default {
  props: {
    postId: { type: String, required: true, default: () => '1' }
  },
  mixins: [currentUser],
  data () {
    return {
      demos: [ {id: 1}, {id: 2}, {id: 3} ],
      text: '',
      visible: false,
      comments: []
    }
  },
  methods: {
    ...mapActions({
      createComment: 'comment/createComment',
      getCommentsByPostId: 'comment/getCommentsByPostId',
      deleteComment: 'comment/deleteComment'
    }),
    onPress() { EventBus.$emit('open-login-modal') },
    renderName(account) {
      if(!account || !account.lastName) return Anonymous;
      return format.formatName(account.firstName, account.lastName);
    },
    renderAvatar(account) {
      if(!account || !account.avatar) return '';
      return format.formatImg(account.avatar);
    },
    isOwnerComment(account) {
      if(!account || !account.id) return false;
      return account.id === this.currentUser.id;
    },
    handleEnter(e) {
      if(this.text.trim() === '') return;
      const payload = {
        id: this.postId,
        content: this.text
      }

      this.createComment(payload)
      .then(({ id, content, created }) => {
        const comment = {
          account: {
            id: this.currentUser.id,
            avatar: this.currentUser.avatar || '',
            firstName: this.currentUser.firstName,
            lastName: this.currentUser.lastName
          },
          id: id,
          content: content,
          created: created
        }
        this.comments = [...this.comments, comment];
        this.text = '';
      })
      .catch(() => this.$message.error('Không thể thêm bình luận vào lúc này !!!'))
    },
    handleDelete(taskId) {
      this.deleteComment({ taskId, postId: this.postId })
      .then(() => {
        this.comments = this.comments.filter(item => item.id !== taskId)
      })
      .catch(() => this.$message.error('Không thể xoá bình luận !!! Thử lại sau.'))
    },
    scrollToEnd() {
      const container = document.querySelector(".comment-list");
      const scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  },
  created() {
    this.getCommentsByPostId(this.postId).then(result => this.comments = result.data);
  },
  updated() {
    this.scrollToEnd()
  }
}
</script>
<style lang="scss" scoped>
// @import '@/styles/app.scss';

.comment {
  overflow: hidden;

  &-list {
    min-height: 100px;
    max-height: 400px;
    overflow-y: scroll;
    scroll-behavior: smooth;

    &--item {
      position: relative;

      &__edit {
        position: absolute;
        right: 10px;
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
          font-size: 12px;

          background: #fff;
          color: #FD3D76;
          border-radius: 8px;
          width: 80px;
          text-align: center;
          box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.32);
          cursor: pointer;

          & > span {
            display: block;
            font-weight: 400;
            padding: 5px 0;
            &:hover {
              background: #FD3D76;
              border-radius: 8px;
              color: #fff;
            }
          }

        }
      } 
    }
  }

  &-form {
    margin: 20px 0 10px 0;

    &--button {
      height: 100%;
      width: 100%;
      padding: 8px 0;
      text-align: center;
      background: #FD3D76;
      color: #fff;
      border-radius: 3px;
      cursor: pointer;

      & i {
          font-size: 16px;
          padding-right: 10px;
      }
      & span {
          font-size: 16px;
          padding-bottom: 5px;
      }
    }
  }

  &-must-sign {
    position: relative;

    &__button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 250px;
      line-height: 30px;
      border-radius: 8px;
      font-size: 15px;

      border: 2px dashed #5C32FB;
      color: #5C32FB;
      text-align: center;
      cursor: pointer;
    }
  }

  
}
.title {
    font-size: 15px;
    font-weight: 600;
    color: #000;
}
.small {
  height: 2px;
  background: #f2f2f4;
  width: 100%;
}
</style>
