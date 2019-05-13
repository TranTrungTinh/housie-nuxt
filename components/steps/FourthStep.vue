<template>
    <div class="fourth-step">
        <div class="fourth-step--item__title">Thông tin</div>
        <div class="fourth-step--item">
            <p class="fourth-step--info__sub">- Bạn vui lòng đăng ít nhất 1 ảnh</p>
            <p class="fourth-step--info__sub">- Bạn có thể đăng tối đa 4 ảnh</p>
            <div class="fourth-step--item__upload">
              <a-upload
                name="files"
                accept=".png, .jpg, .jpeg"
                :beforeUpload="beforeUpload"
                :customRequest="handleUpload"
                listType="picture-card"
                :fileList="fourthStep.attachment"
                @preview="handlePreview"
                @change="handleChange"
              >
                <div v-if="fourthStep.attachment.length < 4">
                  <a-icon type="plus" />
                  <p class="ant-upload-text">Thêm ảnh</p>
                </div>
              </a-upload>
              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
              </a-modal>        
            </div>
            <a-alert
                v-if="isAttachment"
                class="fourth-step--item-error"
                type="error" 
                message="Bạn cần đăng ít nhất 1 ảnh!!!" 
                showIcon 
            />
        </div>
        <div class="fourth-step--item">
            <span class="fourth-step--info__title">Tiêu đề bài đăng</span>
            <span style="float: right">{{ fourthStep.title.length }}/50</span>
            <a-input 
              size="large" 
              type="text" 
              placeholder="Điền tiêu đề để thu hút nhiều lượt xem tin hơn." 
              v-model.lazy="fourthStep.title"
              maxlength="50"
            />
            <a-alert
                v-if="isTitle"
                class="fourth-step--item-error"
                type="error" 
                message="Nhập tiêu đề bài đăng!!!" 
                showIcon 
            />
        </div>
        <div class="fourth-step--item">
          <div class="fourth-step--item__sub--title">Chọn tiêu đề gợi ý</div>
          <a-tag class="fourth-step--item__sub--tag" color="orange"
            @click="fourthStep.title = `${referTitle}2`"
          >
            {{referTitle}}<sup>2</sup>
          </a-tag>
        </div>
        <div class="fourth-step--item">
          <a-alert
            message="Nên nhập Tiêu đề bằng tiếng Việt có dấu."
            description="Không nên chèn giá và số điện thoại ở tiêu đề."
            type="info"
            showIcon
          />
        </div>
        <a-divider></a-divider>
        <div class="fourth-step--item">
            <span class="fourth-step--info__title">Nội dung mô tả</span>
            <span style="float: right">{{ fourthStep.description.length }}/1500</span>
            <a-textarea 
              size="large"
              maxlength="1500" 
              placeholder="Mô tả bằng tiếng Việt có dấu.
      - Giờ đóng cửa, mở cửa, chung chủ không, có chìa khoá riêng,...
      - Nội thất cơ bản, hoặc liệt kê nội thất có sẳn.
      - Khu sinh hoạt chung, riêng: Phòng khách, phòng ngủ, bếp, nhà vệ sinh.
      - Thời gian đi đến (chợ, siêu thị, trung tâm mua sắm), tiện ích gần nhất." 
              :autosize="{ minRows: 6, maxRows: 15 }" 
              v-model.lazy="fourthStep.description"
            />
            <a-alert
                v-if="isDescription"
                class="fourth-step--item-error"
                type="error" 
                message="Nhập mô tả phòng!!!" 
                showIcon 
            />
            <div class="fourth-step--item__hint">
              <a-popover trigger="click" placement="leftBottom" v-model="visible">
                <div slot="title">
                  Mẹo đăng phòng liền tay
                </div>
                <div slot="content" class="fourth-step--item__hint--content">
                  <p>- Cho thuê phòng đầy đủ tiện nghi, giờ tự do (chìa khóa riêng), có chổ để xe.</p>
                  <p>- Trang bị (Mới 100%): Smart Tivi Led, truyền hình cáp, tủ lạnh, bình tắm nóng lạnh, máy lạnh, giường nệm, Tủ quần áo, bàn ghế, wifi ...miễn phí</p>
                  <p>- Hẻm xe hơi, khu vực an ninh tốt, ngay ngã 3 Bùi Viện (gần vòng xoay Cống Quỳnh - Nguyễn Cư Trinh)</p>
                  <p>- Đi bộ tới chợ Bến Thành, phố Tây ba lô, công viên 23/9, chợ Thái Bình, Coop Mart… Không quá 5 phút</p>
                  <p>- Gần trường học, bệnh viện, siêu thị BigC, Coop-mart,...</p>
                </div>
                <i 
                  class="fal fa-lightbulb-on"
                  :style="visible ? 'color: #FD3D76' : ''"
                  @click="visible = true"
                />
              </a-popover>
            </div>
        </div>
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    onData: { type: Function }
  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      fourthStep: {
        title: '',
        description: '',
        attachment: []
      },

      isTitle: false,
      isDescription: false,
      isAttachment: false,

      visible: false
    }
  },
  computed: {
    ...mapGetters({
      postReferTitle: 'post/postReferTitle',
      postFourthStep: 'post/postFourthStep'
    }),
    referTitle() {
      const { area, district, square } = this.postReferTitle;
      return `${area} ${district} ${square}m`;
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {      
      this.fourthStep.attachment = fileList.filter(file => file.size / 1024 / 1024 < 2);
    },
    beforeUpload (file) {
      const size = file.size / 1024 / 1024 < 2
      if (!size) {
        this.$message.error('Upload ảnh nhỏ hơn 2MB!');
      }
      return size;
    },
    handleUpload({ data, file, onError, onProgress, onSuccess }) {
      // onProgress({ percent: 10 })
      // setTimeout(() => onProgress({ percent: 20 }), 500);
      // setTimeout(() => onProgress({ percent: 50 }), 1000);
      // setTimeout(() => onProgress({ percent: 80 }), 1500);
      setTimeout(() => onProgress({ percent: 100 }), 50);
      setTimeout(() => onSuccess(), 100);
    },

    validateAttachment() {
      if(this.fourthStep.attachment.length >= 1) return true;
      this.isAttachment = true;
      setTimeout(() => this.isAttachment = false, 3500);
      return false;
    },
    validateTitle() {
      if(this.fourthStep.title) return true;
      this.isTitle = true;
      setTimeout(() => this.isTitle = false, 3500);
      return false;
    },
    validateDescription() {
      if(this.fourthStep.description) return true;
      this.isDescription = true;
      setTimeout(() => this.isDescription = false, 3500);
      return false;
    },
    validateFourthStep() {
      const title = this.validateTitle();
      const description = this.validateDescription();
      const attachment = this.validateAttachment();
      return title && description && attachment;
    }
  },
  mounted() {
    Object.assign(this.fourthStep, this.postFourthStep)
  },
  destroyed() {
    this.onData(this.fourthStep);
  }
}
</script>
<style lang="scss" scoped>
.fourth-step {

    &--item {
        margin: 20px 0;

        &__title {
            font-size: 24px;
            font-weight: 600;
            color: #3E74FF;
            margin: 0px 0 20px 0;
        }

        &-error {
          margin-top: 5px;
        }

        &__addition {
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #3E74FF;
          border-radius: 8px;
          padding: 15px 0;
          color: #3E74FF;
          cursor: pointer;

          &:hover {
            font-weight: 600;
          }

          & > i {
            font-size: 28px;
            padding-right: 20px;
          }

          & > span {
            font-size: 18px;
          }
        }

        &__upload {
          margin: 20px 0;
        }

        &__sub {

          &--title {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
          }

          &--tag {
            font-size: 15px;
          }
        }
        
        &__hint {
          // display: flex;
          // align-items: center;
          // justify-content: space-between;
          // font-size: 16px;
          margin-top: 5px;

          & > i {
            font-size: 18px;
            cursor: pointer;
          }

          &--content {
            max-width: 300px;
          }
        }

    }

    &--info {

        &__title {
            display: inline-block;
            padding-bottom: 5px;
            font-weight: 600;
            font-size: 20px;
        }

        &__sub {
          font-weight: 400;
          font-size: 18px;
        }
    }
}
</style>

