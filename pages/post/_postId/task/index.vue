<template>
<section class="task">
  <div class="container">
    <a-row :gutter="20">
      <a-col :lg="16">
        <TaskForm />
      </a-col>
      <a-col :lg="8">
        <RoomDetail />
      </a-col>
    </a-row>
  </div>
</section>
</template>
<script>
import { TaskForm, RoomDetail } from '@/components/task';

export default {
  middleware: ["auth"],
  components: { TaskForm, RoomDetail },
  head() {
      return {
          title: 'Tạo tin nhờ xem phòng - Housie',
          meta: [
              // hid is used as unique identifier. Do not use `vmid` for it as it will not work
              { hid: 'description', name: 'description', content: 'My custom description' }
          ]
      }
  }
}
</script>
<style lang="scss" scoped>
.task {
  padding: 40px 0;
}
</style>

