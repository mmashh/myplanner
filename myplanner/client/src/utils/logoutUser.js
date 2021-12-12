import usersApi from './usersApi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const logoutUser = async (e)=> {
    // call logout (when working on login stuff)
    const response = await usersApi.logout();
    cookies.remove("Authorization");
    return response;
}

export default logoutUser;

