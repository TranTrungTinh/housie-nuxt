<template src="./index.html"></template>
<style src="./index.scss" lang="scss" scoped></style>
<script>
import { Loading } from '@/components/loading';
import { Selected } from '@/components/selected';
import { CardHire } from '@/components/card-hire';
import { Thumbnail } from '@/components/thumbnail';
import { Typed } from '@/components/utils';
 
import { getCitiesByCode, getDistrictsByCode } from '@/helpers/readLocation.js';
import { mapActions } from 'vuex';
import { initLoadProgress } from '@/mixins';

export default {
  components: { CardHire, Typed, Selected, Thumbnail, Loading },
  mixins: [initLoadProgress],
  data () {
    return {
      address: {
        city: {
            code: '79',
            data: ''
        },
        district: {
            code: '',
            data: ''
        }
      },
      newPosts: [],
      apartments: []
    }
  },
  methods: {
    ...mapActions({
      getPostsByFiltered: 'post/getPostsByFiltered'
    }),
    onSelectedCity({ code, data }) {
      Object.assign(this.address.city, { code, data })
    },
    onSelectedDistrict({ code, data }) {
      Object.assign(this.address.district, { code, data })
    },
    handleSearch() {
      this.$router.push({ path: '/posts', query: { districts: this.address.district.code } })
    }
  },
  computed: {
    getCities() {
      return getCitiesByCode(this.address.city.code)
    },
    getDistricts() {
        if(!this.address.city.code) return [];
        return getDistrictsByCode(this.address.city.code)
    }
  },
  mounted() {
    Promise.all([
      this.getPostsByFiltered({ limit: 8 }), 
      this.getPostsByFiltered({ limit: 8, type: 2})
    ]).then(data => {
        this.newPosts = data[0].data;
        this.apartments = data[1].data;
    });
  }
}
</script>


