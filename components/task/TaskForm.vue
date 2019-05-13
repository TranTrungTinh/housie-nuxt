<template>
<div class="task-form">
  <div class="task-form--date">
    <h4>Thời gian có kết quả (dự kiến)</h4>
    <!-- <a-date-picker
      format="YYYY-MM-DD"
      :disabledDate="disabledDate"
      size="large"
      @change="onSelectedDay"
    /> -->
    <div class="task-form--date__selected">
      <Selected 
        :selects="getDay"
        :firstSelected="true"
        :onSelected="onSelectedDay"
        placeholder="Bấm để chọn ngày dự kiến"
        size="large"
        :setSelected="estimateDay"
      />
    </div>
  </div>
  <a-divider></a-divider>
  <div class="task-form--pay">
    <h4>Phương thức thanh toán</h4>
    <a-radio-group v-model="value">
      <a-radio class="task-form--pay--radio" :value="1">
        Thanh toán bằng thẻ quốc tế Visa, Master card, JCB
      </a-radio>
        <div class="task-form--pay__visa" v-if="value === 1">
          <a-form :form="form">
            <a-form-item label="Mã số thẻ">
              <a-input size="large" placeholder="Nhập mã số thẻ" />
            </a-form-item>
              <a-form-item label="Tên in trên thẻ">
                <a-input size="large" placeholder="Nhập tên in trên thẻ" />
            </a-form-item>
            <a-row :gutter="20">
              <a-col :xs="12">
                <a-form-item label="Ngày hết hạn">
                  <a-input size="large" placeholder="MM/YY" />
                </a-form-item>
              </a-col>
              <a-col :xs="12">
                <a-form-item label="Mã CVV">
                  <a-input size="large" placeholder="Nhập mã CVV" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
      </div>
      <a-radio class="task-form--pay--radio" :value="2">
        Thanh toán bằng thẻ nội địa/Internet Banking
      </a-radio>
      <div class="task-form--pay__banking" v-if="value==2">
        <a-row :gutter="16">
          <a-col :lg="6" v-for="item in banks" :key="item.id">
            <div 
              @click="bankSelected = item.id"
              :class="['task-form--pay__banking--item', 
              {'active' : bankSelected === item.id}]"
            >
              <img v-lazy="item.img" alt="Bank tranfer" />
            </div>
          </a-col>
        </a-row>
      </div>
    </a-radio-group>
  </div>
  <a-divider></a-divider>
  <div class="task-form--message">
    <h4>Thêm lời nhắn</h4>
    <a-textarea
      size="large" 
      placeholder="Lời nhắn của bạn" 
      :autosize="{ minRows: 4, maxRows: 8 }"
      v-model.lazy="messages"
    />
    <a-alert
      v-if="isError"
      class="task-form--message--feedback"
      message="Lỗi"
      description="Bạn phải đặt ngày dự kiến, viết lời nhắn."
      type="error"
      showIcon
    />
    <a-button class="task-form--message--button" @click="handleCreateRequest">
        Tạo yêu cầu
    </a-button>
  </div>
  <confirm-modal ref="confirm"/>
</div>
</template>
<script>
import { mapActions } from 'vuex';
import { Selected } from '@/components/selected';
import moment from 'moment';
import { rangeDay } from '@/helpers';

const ConfirmModal = () => import('@/components/task/ConfirmModal.vue');

export default {
  components: { ConfirmModal, Selected },
  beforeCreate () { this.form = this.$form.createForm(this) },
  data() {
    return {
      value: 1,
      banks: [
        { id: 1, img: 'https://www.travel688.com/wp-content/uploads/2016/02/ACB.jpg?w=640'},
        { id: 2, img: 'https://thebank.vn/uploads/posts/78d46868e9d8bfc384bf6a792865cbee_vietcombanklogo300x216.jpg'},
        { id: 3, img: 'https://www.graceskinclinic.com/wp-content/uploads/2017/06/sacombank.jpg'},
        { id: 4, img: 'https://upload.wikimedia.org/wikipedia/vi/2/20/Logo_c%E1%BB%A7a_Vietinbank.png'},
        { id: 5, img: 'https://thebank.vn/images/bank/donga.png'},
        { id: 6, img: 'https://upload.wikimedia.org/wikipedia/commons/5/55/LOGO-VIB-Blue.png'},
        { id: 7, img: 'http://pluspng.com/img-png/bidv-logo-png-bidv-logo-816.png'},
        { id: 8, img: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Logo-TPB.png'},
        { id: 9, img: 'https://www.vpbank.com.vn/sites/default/files/logo.jpg'},
        { id: 10, img: 'https://upload.wikimedia.org/wikipedia/vi/7/7c/Techcombank_logo.png'},
        { id: 11, img: 'https://vnpro.vn/upload/user/images/Logo%20Doanh%20Nghi%E1%BB%87p/Eximbank.png'},
        { id: 12, img: 'https://i2.wp.com/www.vietcv.net/wp-content/uploads/2018/01/maritime-bank.png?resize=700%2C400'},
        { id: 13, img: 'https://seeklogo.net/wp-content/uploads/2016/07/Agribank-logo.png'},
        { id: 14, img: 'https://cdn.vba.vn/wp-content/uploads/2018/05/Logo-MB-bank-02.png'},
        { id: 15, img: 'http://shb.thebank.vn/images/bank/SHB.png'},
        { id: 16, img: 'http://file.vforum.vn/hinh/2017/07/seabank.png'},
        { id: 17, img: 'https://www.hdbank.com.vn/static/image/Logo.png'},
        { id: 18, img: 'https://cdn.itviec.com/employers/viet-a-bank/logo/social/jugqghN5r7CcKagUXBuhcmot/viet-a-bank-logo.png'},
        { id: 19, img: 'http://dichvuxedap.com/wp-content/uploads/2017/05/ocean-bank-logo.png'},
        { id: 20, img: 'https://upload.wikimedia.org/wikipedia/vi/e/e5/Logo-Ngan_hang_Phuong_Dong.png'},
        { id: 21, img: 'https://images.careerbuilder.vn/employer_folders/lot0/138690/220856bacabank.png'},
        { id: 22, img: 'https://saobacdau.vn/Data/Sites/1/News/776/namabank.png'},
        { id: 23, img: 'http://static.ybox.vn/2018/11/1/1542031453283-Untitled%20design%20(34).png'},
        { id: 24, img: 'http://bankwork.com.vn/public/uploads/2018/12/IsxEPIan3UPbEfohtjBT-Bao-Viet-Life-Bao-Viet-Nhan-Tho-Ha-Noi-BVL.png'},
        { id: 25, img: 'https://vignette.wikia.nocookie.net/logopedia/images/0/09/GPBank_Vector.png/revision/latest?cb=20170204125046'},
        { id: 26, img: 'http://satra.com.vn/upload/source/company/logo-saigonbank.png'},
        { id: 27, img: 'https://upload.wikimedia.org/wikipedia/vi/d/d5/Logo_c%E1%BB%A7a_ABBank.png'},
        { id: 28, img: 'http://baochinhphu.vn//Uploaded/nguyenthikimhue/2018_02_05/PG_Bank-Logo.jpg'}
      ],
      bankSelected: 0,
      isError: false,

      estimateDay: {
        code: '',
        data: ''
      },
      duedate: '',
      messages: ''
    }
  },
  computed: {
    getDay() {
      return rangeDay.getTaskDay();
    },
  },
  methods: {
    ...mapActions({
      createTask: 'task/createTask'
    }),
    handleCreateRequest() { 
      if(!this.messages) return 
      const payload = {
        id: this.$route.params.id,
        duedate: +this.estimateDay.code,
        message: this.messages
      }
      this.createTask(payload)
      .then(res => this.$refs.confirm.showModal())
      .catch(err => this.$message.error('Không thể tạo tin xem giúp ngay bây giờ.'))
    },
    disabledDate(current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    },
    // onSelectedDay(date, dateString) {
    //   if(!dateString) return;
    //   this.isError = false;
    //   this.estimateDay = moment.utc(dateString).format();
    // }
    onSelectedDay({ code, data }) {
      this.duedate = moment().add(code, 'day').utc().format();
      Object.assign(this.estimateDay, { code, data });
    }
  }
}
</script>
<style lang="scss" scoped src="./TaskForm.scss" ></style>
