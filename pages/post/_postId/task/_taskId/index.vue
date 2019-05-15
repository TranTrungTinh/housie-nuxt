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
  </section>
</template>
<script>
import { RoomInfo, RoomStatus } from '@/components/task';
import { storage } from '@/helpers';

export default {
    head() {
        return {
            title: 'Kết quả xem phòng - Housie',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: 'My custom description' }
            ]
        }
    },
    components: { RoomInfo, RoomStatus },
    data() {
        return {
            taskDetail: {},
            taskResult: {}
        }
    },
    computed: {
        isTask() {
            return this.taskDetail && this.taskDetail.id;
        }
    },
    mounted() {
        const loader = this.$loading.show();
        setTimeout(() => {
            this.taskDetail = storage.getItem('task-detail');
            if(this.taskDetail.result) this.taskResult = { ...this.taskDetail.result }
            loader.hide();
        }, 500)
    }
}
</script>
<style lang="scss" scoped>
.task-detail {
  padding: 40px 0;
}
</style>


