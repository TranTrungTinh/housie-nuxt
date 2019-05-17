<template>
  <section class="task-detail">
    <div class="container">
      <a-row :gutter="20">
        <a-col :lg="16">
          <RoomStatus v-if="isTask" :status="formatStatus(taskDetail.status)" :result="taskResult" />
        </a-col>
        <a-col :lg="8">
          <RoomInfo 
            v-if="isTask"
            :post="postDetail.post"
            :message="taskDetail.message"
            :duedate="taskDetail.duedate"
            :status="formatStatus(taskDetail.status)"
          />
        </a-col>
      </a-row>
    </div>
    <Loading :isLoading="loading" />
  </section>
</template>
<script>
import { mapActions } from 'vuex';
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
          postDetail: {},
          loading: false
      }
  },
  methods: {
    ...mapActions({
      getTaskById: 'task/getTaskById'
    }),
    formatStatus(status) {
      if(status === 'new') return 0;
      if(status === 'inprogress') return 1;
      if(status === 'completed') return 2;
      if(status === 'cancelled') return 3;
      return 4;
    }
  },
  computed: {
      isTask() {
          return this.taskDetail && this.taskDetail.id;
      }
  },
  mounted() {
    this.loading = true;
    const { postId, taskId } = this.$route.params;
    this.getTaskById({ postId, taskId })
    .then(result => {
      console.log(result)
      this.taskDetail = { ...result }
      this.postDetail = storage.getItem('task-detail');
      if(this.taskDetail.result) this.taskResult = { ...this.taskDetail.result }
      this.loading = false;
    })
    .catch(() => this.loading = false);
  }
}
</script>
<style lang="scss" scoped>
.task-detail {
  padding: 40px 0;
}
</style>


