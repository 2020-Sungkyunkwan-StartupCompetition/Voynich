import axios from 'axios';
import store from '../store/index';
import {setInterceptors} from'./common/interceptors';

function createInstance(){
  const instance =  axios.create({
    baseURL: process.env.VUE_APP_SERVER_URL,
  });

  return setInterceptors(instance);
};

const instance = createInstance();

function loginUser(data){
  return new Promise((resolve => {
    instance.get('/auth/google')
      .then((response) => {
        console.log(response);
        resolve(response.data);
      });
  }));
}

export { loginUser };