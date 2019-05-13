<template>
    <div class="type">
        <a-radio-group @change="onChange" v-model="value">
            <a-radio 
              v-for="(item, i) in rooms" :key="i"
              class="type--item" 
              :value="item.key" 
            >
              {{ item.value }}
            </a-radio>
        </a-radio-group>
    </div>
</template>
<script>
import { roomType } from '@/helpers';

export default {
  props: {
    onChoose: { type: Function, default: () => {} }
  },
  data () {
      return {
        value: 0
      }
  },
  computed: {
    rooms() {
      return roomType.getRoomsType()
    }
  },
  methods: {
    onChange (e) {
      const room = {
        code: e.target.value,
        name: roomType.getValueByCode(e.target.value)
      }
      this.onChoose(room);
    },
    reset() {
      this.value = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.type {

  &--item {
    display: block;
    height: 30px;
    line-height: 30px;
  }
}
</style>

