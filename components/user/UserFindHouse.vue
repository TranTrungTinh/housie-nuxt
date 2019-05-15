<template>
  <div class="user-request">
    <h2 class="user-request--title">Tin cần thuê</h2>
    <a-divider></a-divider>
    <div class="user-request-wrap">
      <div v-for="item in rents" :key="item.id">
        <div class="user-request--status">
          <div class="user-request--status__left">
            <a-tag color="pink" v-if="item.room.length === 0">Đang chờ kết quả</a-tag>
            <a-tag color="cyan" v-else>Đã xong</a-tag>
            <span>Tạo ngày {{ formatDay(item.created) }}</span>
          </div>
          <div class="user-request--status__right">
            <i class="fal fa-ellipsis-h-alt"></i>
            <div class="user-request--status__right--popup" @click="handleDelete(item.id)">
              Xoá tin này
            </div>
          </div>
        </div>
        <div class="user-request--content">
          Cần tìm {{ getRoomType(item.type) }} tại {{ item.district.name_with_type }} diện tích {{ item.square }}m2
        </div>
        <div class="user-request--sub">
          <div class="user-request--sub__found">
            Đã tìm được <span style="font-weight: bold">{{ item.room.length }}</span> phòng 
          </div>
          <div class="user-request--sub__button">
            Xem ngay
          </div>
        </div>
        <a-divider></a-divider>
      </div>
    </div>
    <div class="user-request_loading" v-if="rents.length === 0">
      <i class="fal fa-spinner fa-spin" v-if="loading"></i>
      <p v-else>Chưa hổ trợ tính năng này</p>
    </div>
  </div>
</template>
<script>

import { mapActions } from 'vuex';
import { roomType } from '@/helpers'
import moment from 'moment';

export default {
  data() {
    return {
      rents: [ 
        // {
        //   created:"2019-05-09T07:10:08.730Z"
            // district: {
              // code:"771"
              // name_with_type:"Quận 10"
            // }
            // duedate:"2019-05-14T00:00:00.000Z"
            // id:9
            // maxPrice:10000
            // minPrice:5000
            // modified:"2019-05-09T07:10:08.730Z"
            // room:Array[0]
            // square:50
            // status:0
            // type:0
            // userId:3
        // }
      ],
      loading: false
    }
  },
  methods: {
    ...mapActions({
      getRentByOwner: 'post/getRentByOwner'
    }),
    handleDelete(id) {
      this.rents = this.rents.filter(item => item.id !== id);
    },
    formatDay(day) {
      return moment(day).format('DD/MM/YYYY');
    },
    getRoomType(type) {
      return roomType.getValueByCode(type);
    }
  },
  created() {
    // this.loading = true;
    // this.getRentByOwner().then(result => {
    //   this.loading = false;
    //   this.rents = result;
    // })
  },
  head() {
    return {
      title: 'Tin cần thuê - Housie'
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

  &--status {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
      display: flex;
      align-items: center;

      & span {
        padding-left: 7px;
        color: #8A8A8F;
      }
    }

    &__right {
      position: relative;

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
        border-radius: 10px;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.32);
        cursor: pointer;
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }
    } 
  }

  &--content {
    font-size: 20px;
    font-weight: 600;
    color: #000;
    margin: 15px 0;
  }

  &--sub {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__found {
      color: #FD3D76;
      font-size: 18px;
      font-weight: 500;
    }

    &__button {
      font-size: 18px;
      color: #fff;
      border-radius: 10px;
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #FD3D76;
      cursor: pointer;
    }
  }

  &-blank {
    font-size: 18px;
    margin: 10px 30px;
  }
}
</style>