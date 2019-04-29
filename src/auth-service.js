import axios from 'axios';
import { urls } from './urls';

const UserRouteGuard = {
  shouldRoute: () => {
    const token = localStorage.getItem('token');

    if (!token) return Promise.resolve(false);
    return axios.post(urls.checkAuthentication, null, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.data) return Promise.resolve(true);
        return Promise.resolve(false);
      })
      .catch(error => localStorage.setItem('error', JSON.stringify(error)));
  },
};

export default UserRouteGuard;
