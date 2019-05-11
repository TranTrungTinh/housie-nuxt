<template>
    <Typed
        :text="texts"
        :repeat='Infinity'
        :shuffle='false'
        initial-action='typing'
        :pre-type-delay='70'
        :type-delay='70'
        :pre-erase-delay='5000'
        :erase-delay='70'
        erase-style='backspace'
        :erase-on-complete='false'
        caret-animation='smooth'
    />
</template>
<script>

export default {
    data () {
        return {
            texts: [
                "XIN CHÀO SÀI GÒN",
                "Tìm phòng thật dễ với Housie",
                // "Căn hộ đầy đủ nội thất với nhiều tiện ích"
            ],
        }
    }
}
</script>
<style scoped>
.vue-typer >>> .char.custom.typed {
    color: #FD3D76;
}
.vue-typer >>> .char.custom.selected {
    color: #FD3D76;
}
</style>
