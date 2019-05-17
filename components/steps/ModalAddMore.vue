<template>
  <a-modal v-model="visible" centered :footer="null" :closable="false">
    <!-- <span class="header-close" @click="close">
      <i class="far fa-times"></i>
    </span> -->
    <div class="add-more">
      <div class="add-more--title">Thêm chi phí</div>
      <a-checkbox-group class="add-more--group" v-model="values">
        <div class="add-more--item">
          <div class="add-more--item__left">
            <a-checkbox value="garbage">Tiền dọn rác</a-checkbox>
          </div>
          <div class="add-more--item__right">
            <a-input 
              size="large" 
              type="number" 
              addonAfter="đ/tháng" 
              placeholder="Nhập giá tiền dọn rác"
              :disabled="!isActive('garbage')"
              v-model="extensions.garbage"
            />
          </div>
        </div>
        <div class="add-more--item">
          <div class="add-more--item__left">
            <a-checkbox value="clean">Tiền dọn vệ sinh</a-checkbox>
          </div>
          <div class="add-more--item__right">
            <a-input 
              size="large" 
              type="number" 
              addonAfter="đ/tháng" 
              placeholder="Nhập giá tiền dọn vệ sinh"
              :disabled="!isActive('clean')"
              v-model="extensions.clean"
            />
          </div>
        </div>
        <div class="add-more--item">
          <div class="add-more--item__left">
            <a-checkbox value="parking">Tiền gửi xe</a-checkbox>
          </div>
          <div class="add-more--item__right">
            <a-input 
              size="large" 
              type="number" 
              addonAfter="đ/tháng" 
              placeholder="Nhập giá tiền gửi xe"
              :disabled="!isActive('parking')"
              v-model="extensions.parking"
            />
          </div>
        </div>
        <div class="add-more--item">
          <div class="add-more--item__left">
            <a-checkbox value="laundry">Tiền giặt ủi</a-checkbox>
          </div>
          <div class="add-more--item__right">
            <a-input 
              size="large" 
              type="number" 
              addonAfter="đ/tháng" 
              placeholder="Nhập giá tiền giặt ủi"
              :disabled="!isActive('laundry')"
              v-model="extensions.laundry"
            />
          </div>
        </div>
        <div class="add-more--item">
          <div class="add-more--item__left">
            <a-checkbox value="elevator">Chi phí thang máy</a-checkbox>
          </div>
          <div class="add-more--item__right">
            <a-input 
              size="large" 
              type="number" 
              addonAfter="đ/tháng" 
              placeholder="Nhập giá chi phí thang máy"
              :disabled="!isActive('elevator')"
              v-model="extensions.elevator"
            />
          </div>
        </div>
      </a-checkbox-group>
      <div class="add-more-button">
        <div class="add-more-button--cancel" @click="close">Huỷ</div>
        <button class="add-more-button--add" @click="handleAdd">Thêm</button>
      </div>
    </div>
  </a-modal>
</template>
<script>
export default {
  props: {
    onData: { type: Function, required: true, default: () => {} }
  },
  data() {
    return {
      visible: false,
      values: [],
      extensions: {
        garbage: 0,
        clean: 0,
        parking: 0,
        elevator: 0,
        laundry: 0
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    open() { this.visible = true },
    close() { this.visible = false },
    isActive(value) { return this.values.includes(value) },
    handleAdd() {
      this.onData(this.extensions);
      this.close();
    }
  }
};
</script>
<style lang="scss" scoped>
.add-more {
  &--group {
    width: 100%;
  }

  &--title {
    font-size: 18px;
    color: #fd3d76;
    font-weight: 600;
  }

  &--item {
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_title {
        display: inline-block;
        padding-bottom: 5px;
        font-weight: 600;
        font-size: 20px;
    }

    &__left {
      margin-right: 40px;
    }
  }

  &-button {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
    padding: 10px 0;
    font-size: 20px;
    font-weight: 600;

    &--cancel {
      cursor: pointer;
    }
    &--add {
      color: #fd3d76;
      border: none;
      outline: 0;
      font-weight: 600;
      cursor: pointer;
    }
  }
}
</style>

