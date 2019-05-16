<template>
  <div class="user-request">
    <h2 class="user-request--title">Phòng nhờ xem giúp</h2>
    <a-divider></a-divider>
    <div class="user-request-wrap">
      <div
        v-for="(task, i) in tasks" :key="i" 
        @click="handleClick(task.id, task.postId)"
        style="cursor: pointer"
      >
        <a-row class="user-request--task" :gutter="20">
          <a-col :lg="8">
            <img v-lazy="renderImg(task.post.attactment[0])" />
          </a-col>
          <a-col :lg="16" class="user-request--task-content">
            <div>
              <a-tag v-if="task.status === 0">Đang xử lý</a-tag>
              <a-tag color="pink" v-if="task.status === 1">Đang chờ kết quả</a-tag>
              <a-tag color="green" v-if="task.status === 2">Đã có kết quả</a-tag>
            </div>
            <div class="user-request--task-content--price">{{ task.post.price | currency}} đ/tháng</div>
            <div class="user-request--task-content--desc">
              {{task.post.title}}
            </div>
            <div class="user-request--task-content--address">
              {{task.post.description}}
            </div>
          </a-col>
        </a-row>
        <a-divider></a-divider>
      </div>
    </div>
    <div class="user-request_loading" v-if="tasks.length === 0">
        <i class="fal fa-spinner fa-spin" v-if="loading"></i>
        <p v-else>Không có dữ liệu</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { format, storage } from '@/helpers';

export default {
  props: {
    idUser: { type: Number, required: true, default: () => 1 }
  },
  data() {
    return {
      tasks: [],
      loading: false
    }
  },
  methods: {
    ...mapActions({
      getMyTask: 'task/getMyTask'
    }),
    handleCheckResult() {},
    handleClick(taskId, postId) {
      this.$router.push({ path: `/posts/${postId}/task/${taskId}` });
      const data = this.tasks.find(item => item.id === +taskId);
      storage.saveItem('task-detail', data);
    },
    renderImg(img) {
      return format.formatImg(img);
    }
  },
  created() {
    this.loading = true;
    this.getMyTask(this.idUser).then(result => {
        this.tasks = result.data;
        this.loading = false;
    });
  },
  head() {
    return {
      title: 'Phòng nhờ xem giúp - Housie'
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

  &-wrap {
    padding: 10px 20px;
    // max-height: 600px;
    // overflow-y: scroll;
  }

  &--task {

    & img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-right: 10px;
    }

    &-content {
      padding-left: 20px !important;
      line-height: 30px;

      &--price {
        margin-top: 10px;
        font-size: 20px;
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
</style>

