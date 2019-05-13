import { axios } from '@/api/axios.config';

/*
userProfile: {
    firstname, lastname, email, password, phone
}
*/
export default {
    signUp(userProfile) {
        return axios.post('/Accounts', userProfile);
    },
    login(email, password) {
        return axios.post('/Accounts/login', { email, password });
    },
    logout(token) {
        return axios.post('/Accounts/logout', {} , { headers: { Authorization: token } });
    },
    fetchUser(token) {
        return axios.get('/Accounts/me', { headers: { Authorization: token } });
    },
    loginGoogle(token) {
        return axios.post('/Accounts/google', { token });
    },
    loginFacebook(token) {
        return axios.post('/Accounts/facebook', { token });
    },
    updateProfile(token, profile) {
        return axios.patch('/Accounts', profile, { headers: { Authorization: token } })
    },
    changePassword(token, profile) {
        const options = {
            headers: { 
                Authorization: token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return axios.post('/Accounts/change-password', profile, options)
    }
}