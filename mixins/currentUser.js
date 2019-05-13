import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            currentUser: 'user/currentUser'
        }),
        isUser() {
            return this.currentUser && this.currentUser.firstName;
        }
    }
} 