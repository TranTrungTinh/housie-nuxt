<template>
<div class="room-box">
  <div class="room-box--title">Phòng yêu cầu xem giúp</div>
  <div class="room-box--item">
    <div class="room-box--card">
      <img v-lazy="renderImg"/>
      <div class="room-box--card__price">{{ roomDetail.price | currency }} đ/tháng</div>
      <div class="room-box--card__title">{{roomDetail.title}}</div>
      <div class="room-box--card__des">{{roomDetail.address}}</div>
    </div>
  </div>
  <div class="room-box--item">
        <div class="room-box--fee">
        <a-row type="flex" justify="space-between">
            <a-col class="room-box--fee__title">Chi phí</a-col>
            <a-col class="room-box--fee__price">{{ 200000 | currency }} đ</a-col>
        </a-row>
    </div>
  </div>
</div>
</template>
<script>
import { format, storage } from '@/helpers';
export default {
  computed: {
      renderImg() {
          return format.formatImg(this.roomDetail.attactment[0])
      },
      roomDetail() {
          return storage.getItem('room-detail');
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
    color: cornflowerblue;
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
      font-weight: 700;
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

  &--fee {
    &__title {
      font-size: 17px;
      font-weight: 600;
      color: #000;
    }
    &__price {
      color: #FD3D76;
      font-weight: 600;
      font-size: 17px;
    }
  }
}
</style>
