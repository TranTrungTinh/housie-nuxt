<template>
<div class="task">
  <div class="task-owner">
    <a-avatar :size="64" src="https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg" />
    <div class="task-owner--name">Thu Tran</div>
  </div>
  <a-divider></a-divider>
  <div class="task-content">
    <div class="task-content--title">Ghi chú</div>
    <div class="task-content--des">{{ result.description }}</div>
  </div>
  <a-divider></a-divider>
  <div class="task-attachment">
    <div class="task-attachment--title">Kết quả của bạn</div>
    <div class="task-attachment--file" @click="handleDowloadFile">
      <i class="fal fa-download"></i>
      <span>Tải về</span>
    </div>
    <!-- <div class="task-attachment--img">
      <img v-lazy="'https://images.unsplash.com/photo-1459535653751-d571815e906b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60'"/>
    </div>
    <div class="task-attachment--img">
      <img v-lazy="'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60'"/>
    </div>
    <div class="task-attachment--img">
      <img v-lazy="'https://images.unsplash.com/photo-1501876725168-00c445821c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60'"/>
    </div> -->
  </div>
</div>
</template>
<script>
import { format } from '@/helpers';
import axios from 'axios';

export default {
  props: {
    result: { type: Object, required: true, default: () => ({}) }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    forceFileDownload(response){
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      const index = response.data.type.indexOf('/');
      const sub = response.data.type.substring(index + 1);
      link.href = url;
      link.setAttribute('download', `file.${sub}`) //or any other extension
      document.body.appendChild(link);
      link.click();
    },
    handleDowloadFile() {
      axios({
        url: format.formatImg(this.result.attachment),
        method: 'GET',
        responseType: 'blob', // important
      })
      .then(response => {
        this.forceFileDownload(response);
      })
      .catch(err => this.$message.error('Không thể download file vào lúc này !!!'))
    }
  }
}
</script>
<style lang="scss" scoped>
.task {
  &-owner {
    display: flex;
    align-items: center;

    &--name {
      font-size: 20px;
      font-weight: 600;
      margin-left: 15px;
    }
  }

  &-content {

    &--title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    &--des {
      font-size: 16px;
      color: #8A8A8F;
    }
  }

  &-attachment {

    &--title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    &--file {
      font-size: 16px;
      font-weight: 500;
      background: #FD3D76;
      color: #fff;
      text-align: center;
      padding: 5px 0;
      width: 130px;
      border-radius: 8px;
      cursor: pointer;

      & > span {
        padding: 0 10px;
      }
    }

    &--img {
      margin: 10px 0;

      & > img {
        width: 100%;
        height: auto;
        border-radius: 8px;
      }
    }
  }
}
</style>

