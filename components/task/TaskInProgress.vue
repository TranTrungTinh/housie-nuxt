<template>
<div class="task">
  <img src="~@/assets/img/checker.svg" alt="Checker icon">
  <div class="task--title">Bạn đợi nhé...</div>
  <div class="task--des">Chúng tôi đang tìm người đi xem phòng giúp bạn !!!</div>
</div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.task {
  text-align: center;
  
  & > img {
    display: block;
    margin: 0 auto;
  }

  &--title {
    font-size: 24px;
    margin: 7px 0;
    font-weight: bold;
    color: #FD3D76;
  }

  &--des {
    font-size: 18px;
    color: #8A8A8F;
  }
}
</style>


