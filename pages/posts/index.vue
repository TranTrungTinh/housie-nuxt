<template src="./index.html"></template>
<style src="./index.scss" lang="scss" scoped></style>

<script>
import { Type, Range } from '@/components/filtered';
import { Selected } from '@/components/selected';
import { Utilities } from '@/components/utils';
import { Thumbnail } from '@/components/thumbnail';
import { mapActions } from 'vuex';
import { initLoadProgress } from '@/mixins';
import { location, facility, roomType } from '@/helpers';
const initFitered = () => ({
    districts: {
        code: '',
        data: ''
    },
    roomType: {
        code: 0,
        name: 'Phòng trọ'
    },
    priceRange: {
        min: 100000,
        max: 30000000000
    }
});
const blankFiltered = () => ({
    keywords: '',
    districts: '',
    districtsName: '',
    type: '',
    typeName: '',
    min: 0,
    max: 0,
    facilities: []
});
const sortOption = () => ([
    { key: 'new', value: 'Mới nhất.' },
    { key: 'price.asc', value: 'Giá từ thấp đến cao.' },
    { key: 'price.desc', value: 'Giá từ cao đến thấp.' }
])
export default {
    head() {
        return {
            title: 'Tìm phòng với Housie'
        }
    },
    components: { Type, Range, Utilities, Thumbnail, Selected },
    mixins: [initLoadProgress],
    data () {
      return {
        facilities: facility.getFacilities(),
        pagination: {
            pageSize: 8,
        },
        posts: [],
        value: 1,
        filtered: initFitered(),
        filteredOptions: blankFiltered(),
        sorts: sortOption(),
        sortSelected: {
            code: 'new',
            data: 'Mới nhất.'
        }
      }
    },
    watch: {
        '$route.query' (query) {
            this.detectParams(query);
        }
    },
    computed: {
        showFilteredOption() {
            const { keywords, districts, typeName, 
                max, facilities } = this.filteredOptions;
            return !keywords && !districts && !typeName
                        && !max && facilities.length === 0 ? false : true;
        },
        getDistricts() {
            return location.getDistrictsByCode('79');
        },
        filteredPosts() {
            const { posts } = this;
            const { code } = this.sortSelected;
            if(code.includes('price.asc')) return posts.sort((a, b) => a.price - b.price);
            if(code.includes('price.desc')) return posts.sort((a, b) => b.price - a.price);
            return posts.sort((a, b) => a.created.localeCompare(b.created));
        }
    },
    methods: {
        ...mapActions({ 
            getPostsByFiltered: 'post/getPostsByFiltered' 
        }),
        loadPosts() {
            const loader = this.$loading.show();
            this.getPostsByFiltered(this.filteredOptions)
            .then(data => {
                this.posts = data;
                loader.hide();
            });
        },
        onChoose(id) {
            this.facilities = this.facilities.map(item => {
                if(item.id !== id) return item;
                return { ...item, choose: !item.choose }
            });
        },
        onRoomType(roomType) {
            Object.assign(this.filtered, { roomType })
        },
        onRangePrice(priceRange) {
            Object.assign(this.filtered, { priceRange })
        },
        onSelectedDistrict({ code, data }) {
            Object.assign(this.filtered.districts, { code, data })
        },
        onSelectedSort({ code, data }) {
            Object.assign(this.sortSelected, { code, data })
        },
        detectParams(query) {
            const { keywords, type, districts, min, max, facilities } = query;
            let queryOptions = {}
            if(keywords) Object.assign(queryOptions, { keywords });
            if(+type > -1 && +type < 3) {
                Object.assign(queryOptions, 
                    { type: +type },
                    { typeName: roomType.getValueByCode(+type) }
                );
            }
            if(districts) {
                Object.assign(queryOptions, 
                    { districts: districts },
                    { districtsName: location.getNameDistrict(districts) }
                );
            }
            if(min && max) Object.assign(queryOptions, { min , max });
            if(facilities) {
                const newFacilities = [];
                facilities.split(',').map(id => {
                    if(+id < 0 || +id > 7) return;
                    const title = this.facilities.find(item => item.id === +id).title;
                    newFacilities.push({ id: +id, title: title });
                });
                Object.assign(queryOptions, { facilities: newFacilities });
            }
            Object.assign(this.filteredOptions, queryOptions);
            this.loadPosts();
        },

        handleFilter() {
            const { priceRange, districts, roomType } = this.filtered;
            const { keywords } = this.filteredOptions;
            if((+priceRange.min < 0 || +priceRange.max < 0) || +priceRange.max < 100000) {
                this.$message.warning('Mức giá tối thiểu phải từ 0 đ và tối đa từ 100,000 đ !!!');
                return;
            }
            if(+priceRange.min > +priceRange.max) {
                this.$message.warning('Mức giá không hợp lệ !!!');
                return;
            }
            if(+priceRange.max > 30000000000) {
                this.$message.warning('Mức giá tối đa là 30 tỷ !!!');
                return;
            }
            if(+priceRange.min === +priceRange.max) {
                this.$message.warning('Mức giá phải khác nhau !!!');
                return;
            }
            let queryOptions = {};
            Object.assign(queryOptions, { type: roomType.code })
            if(keywords) Object.assign(queryOptions, { keywords: keywords });
            if(districts.code) Object.assign(queryOptions, { districts: districts.code })
            if(+priceRange.max < 30000000000 && +priceRange.max > 99999) {
                Object.assign(queryOptions, { 
                    min: Math.floor(+priceRange.min / 1000), 
                    max: Math.floor(+priceRange.max / 1000)
                });
            }
            const choose = this.facilities.filter(item => item.choose);
            if(choose.length > 0) {
                Object.assign(queryOptions, 
                    { facilities: choose.map(item => item.id).join(',') })
            }
            this.$router.push({ path: '/posts', query: queryOptions });
        },
        handleClearFiltered() {
            this.$router.replace({ path: '/posts' });
            // step 1: Reset state
            Object.assign(this.filteredOptions, blankFiltered());
            // step 2: load posts
            this.loadPosts();
            // step 3: Reset child state
            Object.assign(this.filtered, initFitered());
            this.$refs.type.reset();
            this.$refs.range.reset();
            this.facilities = this.facilities.map(item => ({ ...item, choose: false }))
        },

        districtsNameClear() {
            const queryOptions = { ...this.$route.query };
            delete queryOptions.districts;
            this.$router.push({ path: '/posts', query: queryOptions });
            Object.assign(this.filteredOptions, { districts: '', districtsName: '' })
        },
        keywordsClear() {
            const queryOptions = { ...this.$route.query };
            delete queryOptions.keywords;
            this.$router.push({ path: '/posts', query: queryOptions });
            Object.assign(this.filteredOptions, { keywords: '' })
        },
        roomTypeClear() {
            const queryOptions = { ...this.$route.query };
            delete queryOptions.type;
            this.$router.push({ path: '/posts', query: queryOptions });
            Object.assign(this.filteredOptions, { type: '', typeName: '' })
        },
        priceRangeClear() {
            const queryOptions = { ...this.$route.query };
            delete queryOptions.min;
            delete queryOptions.max;
            this.$router.push({ path: '/posts', query: queryOptions });
            Object.assign(this.filteredOptions, { min: 0, max: 0 })
        }
    },
    mounted() {
        this.detectParams(this.$route.query);
    }
}
</script>