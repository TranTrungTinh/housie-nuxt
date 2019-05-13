<template>
  <a-popover trigger="click" placement="bottomRight" v-model="visible">
    <div slot="title">
      <div class="notification--title">
        <span>Bạn có {{ countNoti }} thông báo</span>
        <a @click="clearAll">Xoá tất cả</a>
      </div>
    </div>
    <div slot="content">
      <div class="notification--list">
        <a-list itemLayout="horizontal" :dataSource="data">
          <a-list-item slot="renderItem" slot-scope="item">
            <a-list-item-meta description="04/08/2019">
              <img class="notification--list__img" slot="avatar" v-lazy="item.image" alt="Img">
              <a class="notification--list__title" slot="title" href="https://vue.ant.design/">{{item.title}}</a>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </div>
      <div class="notification--sync">
        <span class="notification--sync__text">Đồng bộ lúc: {{this.syncTime()}}</span>
        <span class="notification--sync__icon" @click="toggleSync">
          <span v-if="loading" style="opacity: 0.5">
            <a-icon type="sync" spin/> Đang tải...
          </span>
          <a-icon type="sync" v-else/>
        </span>
      </div>
    </div>
    <a-badge :count="countNoti" @click="open" class="notification">
        <i class="fas fa-bell"></i>
    </a-badge>
  </a-popover>
</template>
<script>
import moment from 'moment';
const data = [
  {
    title: 'Tam đã bình luận về Tiêu đề bài đăng phòng lorem ipsum dol...',
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
  },
  {
    title: 'Anh đã bình luận về Tiêu đề bài đăng phòng lorem ipsum dol...',
    image: 'https://images.unsplash.com/photo-1472224371017-08207f84aaae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  },
  {
    title: 'Da đã bình luận về Tiêu đề bài đăng phòng lorem ipsum dol...',
    image: 'https://images.unsplash.com/photo-1494203484021-3c454daf695d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60'
  },
  {
    title: 'Den đã bình luận về Tiêu đề bài đăng phòng lorem ipsum dol...',
    image: 'https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
  }
]
export default {
  data () {
    return {
      visible: false,
      data,
      loading: false
    }
  },
  computed: {
    countNoti() { return this.data.length }
  },
  methods: {
    open () { this.visible = true },
    hide () { this.visible = false },
    syncTime() {
      return moment().format('DD/MM/YYYY HH:mm');
    },
    toggleSync () {
      this.loading = true
      setTimeout(() => {
        this.data = this.data.concat(data);
        this.loading = false;
        this.syncTime();
      }, 1500)
    },
    clearAll() { this.data = [] }
  }
}
</script>
<style lang="scss" scoped>
.notification {
  cursor: pointer;
  & > i {
    font-size: 28px;
    padding: 0 5px;
  }

  &--title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &--list {
    max-height: 300px;
    min-width: 500px;
    overflow-y: scroll;

    &__title {
      display: inline-block;
      width: 350px;
      font-size: 16px;
      font-weight: 600;
    }

    &__img {
      display: block;
      margin: 0 auto;
      width: 100%;
      height: auto;
      max-width: 100px;
      max-height: 100px;
      border-radius: 10px;
    }
  }
  &--sync {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px 0 5px;

    &__icon {
      cursor: pointer;
      font-size: 16px;
    }
  }
}
</style>
<style lang="scss">
.notification {
  & .ant-badge-count {
    background: #FD3D76;
  }

  & sup {
    top: -0.9em !important;
  }
}
</style>
