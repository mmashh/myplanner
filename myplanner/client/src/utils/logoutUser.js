import usersApi from './usersApi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const logoutUser = async (e)=> {
    // call logout (when working on login stuff)
    // await usersApi.logout();
    cookies.remove("Authorization");
}

export default logoutUser;

