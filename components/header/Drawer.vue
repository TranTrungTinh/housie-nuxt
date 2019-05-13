<template>
  <a-drawer
    title="MENU"
    placement="left"
    :closable="false"
    @close="onClose"
    :visible="visible"
  >
    <div class="drawer" v-for="(item, i) in navLinks" :key="i">
      <router-link :to="item.link" tag="div">
        <div class="drawer-item" @click="onSelected(i)">
          <span class="drawer-item--title">{{ item.title }}</span>
          <span :class="{active: selected === i}"></span>
        </div>
      </router-link>
    </div>
    <div class="drawer-user">
    </div>

  </a-drawer>
</template>
<script>
import { EventBus } from '@/helpers/event-bus';

export default {
  props: {
    navLinks: { type: Array, default: () => [] },
    showUser: { type: Boolean, default: false },
  },
  data() {
    return {
      visible: false,
      selected: -1
    }
  },
  methods: {
    open() {
      this.visible = true;
      EventBus.$emit('toggleDrawer', true);
    },
    onClose() {
      this.visible = false;
      EventBus.$emit('toggleDrawer', false);
    },
    onSelected(id) {
        this.selected = id;
        this.onClose();
    }
  },
}
</script>
<style lang="scss" scoped>
.drawer {
  position: relative;
  font-size: 16px;

  &-item {
    padding: 10px 0px;
    border-radius: 10px;
    margin: 10px 0;
    cursor: pointer;
  
    &:hover {
      font-weight: bold;
    }
    
  }
}

.active {
    width: 10px;
    height: 10px;
    background: #27ae60;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    top: 16px;
    right: 0;
}
</style>

