<template>
    <Spiner 
      :active.sync="isLoading" 
      color="#FD3D76"
      :height="100"
      :width="100"
    />
</template>
<script>
export default {
  props: {
    isLoading: { type: Boolean, required: true, default: () => false }
  }
}
</script>

