<template>
<div class="owner">
  <div class="owner-task--title">Đã có người đi xem phòng giúp bạn</div>
  <a-avatar :size="128" src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" />
  <div class="owner-name">Thu Tran</div>
  <div class="owner-task--des">Bạn chờ Thu Tran gửi kết quả xem phòng về nhé !!!</div>
</div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
.owner {
  text-align: center;
  
  &-name {
    margin: 10px 0;
    font-size: 18px;
    font-weight: 600;
  }

  &-task--title {
    font-size: 24px;
    margin-bottom: 30px;
    font-weight: bold;
    color: #FD3D76;
  }

  &-task--des {
    margin-top: 20px;
    font-size: 18px;
    color: #8A8A8F;
  }
}
</style>


