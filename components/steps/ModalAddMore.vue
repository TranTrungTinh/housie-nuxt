<template>
  <a-modal v-model="visible" centered :footer="null" :closable="false">
    <span class="header-close" @click="close">
      <i class="far fa-times"></i>
    </span>
    <div class="add-more">
      <a-checkbox-group v-model="values" @change="onChecked">
        <div class="add-more--item">
          <div class="add-more--item__left">
            <a-checkbox value="A">Tiền rác</a-checkbox>
          </div>
          <div class="add-more--item__right">
            <a-input type="text" :disabled="!isActive('A')"/>
          </div>
        </div>
        <div class="add-more--item">
          <div class="add-more--item__left">
            <a-checkbox value="B">Tiền nuoc</a-checkbox>
          </div>
          <div class="add-more--item__right">
            <a-input type="text" :disabled="!isActive('B')"/>
          </div>
        </div>
        <div class="add-more--item">
          <div class="add-more--item__left">
            <a-checkbox value="C">Tiền dien</a-checkbox>
          </div>
          <div class="add-more--item__right">
            <a-input type="text" :disabled="!isActive('C')"/>
          </div>
        </div>
        
        
      </a-checkbox-group>
      <!-- <a-form :form="form" @submit="handleAddMore">
        <a-form-item class="add-more--item">
            <span class="add-more--item_title">Tên chi phí</span>
            <a-input v-decorator="[ 'title', { rules: rules.title }]" placeholder="Nhập tên chi phí" size="large"/>
        </a-form-item>
        <a-form-item class="add-more--item">
            <span class="add-more--item_title">Số tiền</span>
            <a-input v-decorator="[ 'data', { rules: rules.data }]" placeholder="Nhập số tiền" size="large" type="number" addonAfter="đ/tháng"/>
        </a-form-item>
        <div class="add-more-button">
          <div class="add-more-button--cancel" @click="close">Huỷ</div>
          <button class="add-more-button--add" html-type="submit">Thêm</button>
        </div>
      </a-form> -->
    </div>
  </a-modal>
</template>
<script>
export default {
  props: {
    onData: { type: Function }
  },
  data() {
    return {
      visible: false,
      rules: {
          title: [{ required: true, message: 'Nhập tên chi phí !!!' }],
          data: [{ required: true, message: 'Nhập số tiền !!!' }]
      },
      values: []
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    onChecked(checkedValues) {
      console.log('checked = ', checkedValues)
    },
    isActive(value) {
      return this.values.includes(value);
    }
    // handleAddMore (e) {
    //   e.preventDefault();
    //   this.form.validateFields((err, values) => {
    //     if (!err) {
    //       this.onData(values)
    //       this.close();
    //       this.form.setFieldsValue({ title: '', data: '' });
    //     }
    //   });
    // }
  }
};
</script>
<style lang="scss" scoped>
.header-close {
  color: #fd3d76;
  font-size: 24px;
  cursor: pointer;
}
.add-more {
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

