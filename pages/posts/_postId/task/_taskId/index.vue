<template>
  <section class="task-detail">
    <div class="container">
      <a-row :gutter="20">
        <a-col :lg="16">
          <RoomStatus v-if="isTask" :status="taskDetail.status" :result="taskResult" />
        </a-col>
        <a-col :lg="8">
          <RoomInfo 
            v-if="isTask"
            :post="taskDetail.post"
            :message="taskDetail.message"
            :duedate="taskDetail.duedate"
            :status="taskDetail.status"
          />
        </a-col>
      </a-row>
    </div>
    <Loading :isLoading="loading" />
  </section>
</template>
<script>
import { Loading } from '@/components/loading';
import { RoomInfo, RoomStatus } from '@/components/task';
import { storage } from '@/helpers';

export default {
  middleware: ["auth"],
  head() {
      return {
          title: 'Kết quả xem phòng - Housie'
      }
  },
  components: { RoomInfo, RoomStatus, Loading },
  data() {
      return {
          taskDetail: {},
          taskResult: {},
          loading: false
      }
  },
  computed: {
      isTask() {
          return this.taskDetail && this.taskDetail.id;
      }
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
        this.taskDetail = storage.getItem('task-detail');
        if(this.taskDetail.result) this.taskResult = { ...this.taskDetail.result }
        this.loading = false
    }, 500);
  }
}
</script>
<style lang="scss" scoped>
.task-detail {
  padding: 40px 0;
}
</style>


