import { axios } from '@/api/axios.config';

export default {
    getAll() {
        return axios.get('/posts?limit=8');
    },
    getPostById(token, id) {
        const options = {
            headers: { 
                Authorization: token || '',
            }
        }
        return axios.get('/posts/' + id, options);
    },
    createPost(token, payload) {
        const options = {
            headers: { 
                Authorization: token
            }
        }
        return axios.post('/posts', payload, options);
    },
    deletePost(token, id) {
        const options = {
            headers: { 
                Authorization: token
            }
        }
        return axios.delete('/posts/' + id, {} , options);
    },
    upload(token, files) {
        const options = {
            headers: { 
                Authorization: token,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        return axios.post('/containers/s3-hoozing/upload', files, options);
    },
    getPostsByOwner(id) {
        return axios.get(`/posts?userId=${id}`);
    },
    getPostsByFiltered(payload) {
        const { keywords, type, districts, min, max, facilities, limit, current } = payload;
        
        let queryOptions = {};
        Object.assign(queryOptions, { offset: current ? current : 1 });
        if(keywords) Object.assign(queryOptions, { keywords: keywords })
        if(type) Object.assign(queryOptions, { type: type })
        if(districts) Object.assign(queryOptions, { districts: districts })
        if(limit) Object.assign(queryOptions, { limit: limit })
        if(max && max < 30000000) Object.assign(queryOptions, { min: min, max: max });
        if(facilities && facilities.length > 0) {
            Object.assign(queryOptions, 
                { facilities: facilities.map(item => item.id).join(',') })
        }
        return axios.get(`/posts/search`, { params: queryOptions });
    },
    createRent(token, payload) {
        const options = {
            headers: { 
                Authorization: token
            }
        }
        return axios.post('/postbuyers', payload, options);
    },
    getRentByOwner(token) {
        const options = {
            headers: { 
                Authorization: token
            }
        }
        return axios.get('/postbuyers', options);
    }
    
}