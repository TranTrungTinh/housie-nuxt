<template>
    <a-select :style="[styles]" class="selected" 
        :size="size ? size : 'default'"
        :placeholder="placeholder"
        :value="onSetSelected"
        @select="handleSelect"
    >
        <!-- <a-select-option value="any">Any</a-select-option> -->
        <a-select-option class="selected-item" v-for="item in selects" :key="item.key" :value="item.value" >
            <i v-if="icon" :class="icon"></i>
            <span v-if="text">{{ text }}</span>
            <span>{{ item.value }}</span>
        </a-select-option>
    </a-select>
</template>
<script>
export default {
    name: 'Selected',
    props: {
        selects: { type: Array, default: () => [] },
        icon: { type: String, default: () => '' },
        text: { type: String, default: () => '' },
        size: { type: String, default: () => '' },
        placeholder: { type: String, default: () => '' },
        firstSelected: { type: Boolean, default: () => false },
        styles: { type: Object, default: () => ({}) },
        onSelected: { type: Function, default: () => {} },
        setSelected: { type: Object, default: () => ({})}
    },
    methods: {
        handleSelect(value, { key }) {
            this.onSelected({ code: key, data: value })
        }
    },
    computed: {
        onSetSelected() {
            if(this.setSelected && this.setSelected.data) {
                const { code, data } = this.setSelected;
                this.onSelected({ code, data })
                return this.setSelected.data;
            } else {
                if(!this.firstSelected) return this.placeholder;
                
                const { key, value } = this.selects[0];
                this.onSelected({ code: key, data: value })
                return value;
            }
        }
    },
}
</script>
<style src="./Selected.scss" lang="scss" scoped></style>