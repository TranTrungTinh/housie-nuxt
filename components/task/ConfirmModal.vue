<template>
  <a-modal :visible="visible" :closable="false" :maskClosable="false" :footer="null" centered>
    <div class="confirm--modal">
      <div class="confirm--modal--content">
        Yêu cầu đã được tạo thành công.
        <br/>
        Bạn sẽ được thông báo ngay khi có kết quả
      </div>
      <img src="~@/assets/img/confirm.png"/> 
      <a-button class="confirm--modal--button" @click="handleOk">OK</a-button>
    </div>
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk (e) {
      this.visible = false;
      this.$router.push({ path: '/account' });
      this.$store.dispatch('utilities/updateCurrentTab', 2);
    }
  }
}
</script>
<style lang="scss" scoped>
  .confirm {

    &--modal {
      text-align: center;

      &--content {
        font-size: 18px;
        font-weight: 500;
      }

      & img {
        display: block;
        margin: 30px auto;
      }

      &--button {
        background-color: #FD3D76 !important;
        color: #FFFFFF !important;
        border-radius: 8px;
        width: 50%;
        height: 50px;
        outline: none;

        &:hover {
          background-color: #FD3D76;
          color: #FFFFFF;
          outline: none;
        }
        &:active {
          background-color: #FD3D76;
          color: #FFFFFF;
          outline: none;
        }
        &:focus {
          background-color: #FD3D76;
          color: #FFFFFF;
          outline: none;
        }
      }
    }
  }
</style>

