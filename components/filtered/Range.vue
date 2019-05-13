<template>
    <div class="money-range">
        <div class="money-range--show">
            <span class="money-range--show__min">{{ priceRange.min | currency }} đ</span>
            <span>-</span>
            <span class="money-range--show__max">
                {{ priceRange.max | currency }}<span v-if="priceRange.max === 30000000000">+</span> đ
            </span>
        </div>
        <div class="money-range--title">
            <span>Giá tối thiểu</span>
            <span>Giá tối đa</span>
        </div>
        <div class="money-range--slider">
            <a-slider 
                range 
                :step="100000"
                :value="[priceRange.min, priceRange.max]" 
                :min="100000"
                :max="30000000000"
                :tipFormatter="null"
                @change="onPriceChange" 
            />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        onChange: { type: Function, default: () => {} }
    },  
    data() {
        return {
            priceRange: {
                min: 100000,
                max: 30000000000
            }
        }
    },
    methods: {
        onPriceChange(value) {
            const obj = {
                min: value[0],
                max: value[1]
            }
            Object.assign(this.priceRange, obj);
            this.onChange(obj);
        },
        reset() {
            const priceRange = {
                min: 100000,
                max: 30000000000
            }
            this.priceRange = { ...priceRange }
        }
    }
}
</script>
<style lang="scss" scoped>
.money-range {
    margin: 10px 0;
    padding: 5px 10px;
    border: dashed 1px #666;
    border-radius: 8px;

    &--title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 400;
        margin-top: 15px;
    }
    &--show {

        display: flex;
        align-items: center;
        justify-content: center;
        color: #3E74FF;
        font-size: 15px;
        font-weight: 500;

        & span:nth-child(2) {
            padding: 0 5px;
        }
    }
}
</style>


