export default {
    created() {
        this.$Progress.start();
        setTimeout(() => this.$Progress.finish(), 500);
    }
} 