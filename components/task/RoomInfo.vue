<template>
<div class="room-box">
  <div class="room-box--title">Phòng yêu cầu xem giúp</div>
  <div class="room-box--item">
    <div class="room-box--card">
      <img v-lazy="renderImg(post.attactment[0])"/>
      <div class="room-box--card__price">{{ post.price | currency }} đ/tháng</div>
      <div class="room-box--card__title">{{ post.title }}</div>
      <div class="room-box--card__des">{{ post.description }}</div>
    </div>
  </div>
  <div class="room-box--item" v-if="status !== 2">
    <div class="room-box--estimate">
      <div class="room-box--estimate__title">Bạn sẽ nhận kết quả sau...</div><!-- {{ duedate | fromNow }} -->
      <div class="room-box--estimate__des">(Tính từ lúc tìm được người xem phòng)</div>
    </div>
  </div>
  <div class="room-box--item">
    <div class="room-box--fee">
      <a-row type="flex" justify="space-between">
        <a-col class="room-box--fee__title">Chi phí</a-col>
        <a-col class="room-box--fee__price">{{ 200000 | currency }} đ</a-col>
      </a-row>
      <div class="room-box--fee__method">
        <a-divider></a-divider>
        <h5>Hình thức thanh toán:</h5>
        <p>Thẻ ATM nội địa/Internet Banking</p>
        <a-tag color="blue">Đã thanh toán</a-tag>
      </div>
    </div>
  </div>
  <div class="room-box--item" v-if="status !== 2">
    <div class="room-box--message">
      <a-row type="flex" justify="space-between">
        <a-col class="room-box--message__title">Lời nhắn của bạn</a-col>
        <a-col class="room-box--message__action">
          <a @click="beforeUpdateTask" v-show="!isEdit"><i class="fas fa-pencil"></i></a>
          <a style="color: red" @click="handleUpdateTask" v-show="isEdit"><i class="fas fa-save"></i></a>
        </a-col>
      </a-row>
      <!-- <p class="room-box--message__form" >{{ message }}</p> -->
      <a-textarea
        class="room-box--message__form" 
        size="large" 
        placeholder="VD: Lời nhắn của bạn" 
        :autosize="{ minRows: 2, maxRows: 8 }"
        :disabled="!isEdit"
        v-model="text"
      />
    </div>
  </div>
</div>
</template>
<script>
import { format } from '@/helpers';
import { mapActions } from 'vuex';

export default {
  props: {
    post: { type: Object, required: true, default: () => ({}) },
    message: { type: String, required: true, default: () => '' },
    duedate: { type: String, required: true, default: () => '' },
    status: { type: Number, required: true, default: () => 0 },
  },
  data() {
    return {
      isEdit: false,
      text: ''
    }
  },
  created() {
    this.text = this.message;
  },
  methods: {
    ...mapActions({
      updateTask: 'task/updateTask'
    }),
    toggleEdit() { this.isEdit = !this.isEdit },
    renderImg(img) {
      return format.formatImg(img);
    },
    beforeUpdateTask() {
      if(this.status !== 0) {
        this.$message.info('Yêu cầu của bạn đã được nhận, không thể thay đổi !!!');
        return;
      }
      this.toggleEdit()
    },
    handleUpdateTask() {
      if(!this.text) {
        this.$message.warning('Nhập lời nhắn của bạn !!!');
        return;
      }
      const { postId, taskId } = this.$route.params;
      this.updateTask({ postId, taskId, message: this.text })
      .then(() => this.toggleEdit());
    }
  }
}
</script>

<style lang="scss" scoped>
.room-box {
  border: 2px solid #EFEFF4;
  border-radius: 16px;

  &--title {
    font-size: 20px;
    font-weight: 700;
    padding: 18px 20px;
  }

  &--item {
    border-top: 2px solid #EFEFF4;
    padding: 24px 20px;
  }

  &--card {
    
    & > img {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    &__price {
      color: #FD3D76;
      font-weight: 600;
      font-size: 20px;
      margin-top: 15px;
    }
    &__title {
      font-weight: bold;
      font-size: 18px;
      margin: 5px 0;
      color: #000;
    }
    &__des {
      color: #8A8A8F;
      font-size: 16px;
    }
  }

  &--estimate {
    &__title {
      font-weight: bold;
      font-size: 18px;
      color: #000;
    }
    &__des {
      color: #8A8A8F;
      font-size: 16px;
    }
  }

  &--fee {
    &__title {
      font-size: 17px;
      font-weight: 600;
      color: #000;
    }
    &__price {
      color: #FD3D76;
      font-size: 17px;
    }

    &__method {

      & > h5 {
        font-size: 17px;
        color: #000;
        font-weight: 600;
      }
    }
  }

  &--message {
    &__title {
      font-size: 16px;
      color: #000;
    }
    &__action {
      font-size: 18px;
    }
    &__form {
      margin-top: 15px;
    }
  }
}
</style>
