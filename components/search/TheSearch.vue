<template>
  <div class="search">
    <a-auto-complete
      dropdownClassName="search--category"
      :dropdownMatchSelectWidth="false"
      :dropdownStyle="{width: '300px'}"
      size="large"
      style="width: 100%"
      v-model="search"
      placeholder='Từ khoá "Căn hộ Quận 7"'
      optionLabelProp="value"
    >
      <template slot="dataSource">
        <a-select-opt-group v-for="(group, i) in dataSource" :key="i">
            <span slot="label">
                <span class="search--group__title">{{group.title}}</span>
            </span>
            <a-select-option
              class="search--category--item" 
              v-for="opt in group.children"
              :key="opt.title"
            >
                <span class="search--group__sub">{{opt.title}}</span>
            </a-select-option>
        </a-select-opt-group>
        <a-select-option disabled key="all">
            <router-link class="search--group__all" to="/posts">Xem thêm</router-link>
        </a-select-option>
      </template>
    <a-input-search size="large" @search="onSearch" />
    </a-auto-complete>
  </div>
</template>
<script>
import { storage } from '@/helpers';
export default {
  data() {
    return {
      dataSource: [
        {
          title: 'TÌM KIẾM NHANH',
          children: [
              { title: 'Nhà nguyên căn Quận 2' }, 
              { title: 'Phòng trọ Quận 10' }, 
              { title: 'Căn hộ Quận 7' }
          ]
        },
        // {
        //   title: 'TÌM KIẾM GẦN ĐÂY',
        //   children: [{title: '' }]
        // }
      ],
      search: ''
    }
  },
  methods: {
    onSearch(value) {
      // if(!value) return;
      // this.$router.push({ path: '/posts', query: { keywords: value }});

      // this.dataSource[1].children = this.dataSource[1].children
      //                               .filter(item => item.title !== value);
      // this.dataSource[1].children.unshift({title: value});
      
      // if(this.dataSource[1].children.length > 3) {
      //   this.dataSource[1].children.pop();
      // }
      // storage.saveItem('recentSearch', { recentSearch: this.dataSource[1].children });
    },
  },
  created() {
    // const recent = storage.getItem('recentSearch');
    // if(recent.recentSearch && recent.recentSearch.length > 0) {
    //   this.dataSource[1].children = recent.recentSearch;
    // }
    // const { keywords } = this.$route.query;
    // if(keywords) this.search = keywords;
  }
}
</script>
<style lang="scss" scoped>
.search {
    width: 350px;
    // &--category {

    //     &--item {
    //         border-bottom: 1px solid #F6F6F6 !important;
    //     } 
    // }

    &--group {
        &__title {
            font-weight: 400;
        }

        &__sub {
            font-size: 18px;
            font-weight: 500;
        }

        &__all {
            display: block;
            padding: 5px 0;
            text-align: center;
            color: #FD3D76;
        }
    }
}
</style>
<style>
    .search--category .ant-select-dropdown-menu-item-group {
        border-bottom: 1px solid #F6F6F6;
    }
</style>

