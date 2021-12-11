import usersApi from './usersApi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const logoutUser = async (e)=> {
    cookies.remove("Authorization");
    // call logout (when working on login stuff)
    // await usersApi.logout();
}

export default logoutUser;

