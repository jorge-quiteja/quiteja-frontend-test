import api from '@/plugins/axios';

export default {
    get(route) {
        return new Promise((resolve, reject) => {
            api.get(route)
                .then(res => {
                    let { data } = res.data;
                    resolve(data);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                })
        })
    },
    getById(route) {
        return new Promise((resolve, reject) => {
            api.get(route)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    console.error(err);
                    reject(err);
                });
        })
    },
    update(route, data) {
        return new Promise((resolve, reject) => {
            api.put(route, data)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    },
    create(route, data) {
        return new Promise((resolve, reject) => {
            api.post(route, data)
              .then(() => {
                resolve("OK");
              })
              .catch(err => {
                console.log(err);
                reject(err);
              });
          })
    },
    delete(route) {
        return new Promise((resolve, reject) => {
            api.delete(route)
              .then(res => {
                resolve(res);
              })
              .catch(err => {
                console.error(err);
                reject(err);
              });
          })
    }
};