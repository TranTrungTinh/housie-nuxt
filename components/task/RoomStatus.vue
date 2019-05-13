<template>
<div class="room-status">
  <div class="room-status--title">Kết quả xem phòng</div>
  <a-tag class="room-status--tag" v-if="status === 0">Đang xử lý</a-tag>
  <a-tag class="room-status--tag" color="pink" v-if="status === 1">Đang chờ kết quả</a-tag>
  <a-tag class="room-status--tag" color="green" v-if="status === 2">Đã có kết quả</a-tag>
  <div class="room-status--content">
    <div class="room-status--box" v-if="status !== 2">
      <TaskInProgress v-show="status === 0"/>
      <TaskDoing v-show="status === 1"/>
    </div>
    <TaskDone :result="result" v-else />
  </div>
</div>
</template>
<script>
const TaskInProgress = () => import('@/components/task/TaskInProgress');
const TaskDoing = () => import('@/components/task/TaskDoing');
const TaskDone = () => import('@/components/task/TaskDone');

export default {
  components: { TaskInProgress, TaskDoing, TaskDone },
  props: {
    status: { type: Number, required: true, default: () => 0 },
    result: { type: Object, required: true, default: () => ({}) }
  }
}
</script>
<style lang="scss" scoped>
.room-status {

  &--title {
    font-size: 24px;
    font-weight: bold;
    color: #000;
  }

  &--tag {
    font-size: 16px;
    margin: 10px 0;
  }

  &--content {
    margin: 20px 0;
  }

  &--box {
    border: 2px solid #EFEFF4;
    border-radius: 8px;
    padding: 50px 150px;
  }
}
</style>
