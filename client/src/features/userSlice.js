import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile } from '../services/UserService';

const getLocalStoreItem = () => {
    if (localStorage.getItem('loginStatus') === null) {
        return false
    } else {
        return JSON.parse(localStorage.getItem('loginStatus'))
    }
}
const getLocalStoreAdmin = () => {
    if (localStorage.getItem('adminStatus') === null) {
        return false
    } else {
        return JSON.parse(localStorage.getItem('adminStatus'))
    }
}

export const userSlice = createSlice({
    name: 'users',
    initialState: { isLoggedin: getLocalStoreItem(), isAdmin: getLocalStoreAdmin(), userProfile: {} },
    reducers: {
        login: (state) => {
            localStorage.setItem('userId', state?.userProfile?.id);
            state.isLoggedin = getLocalStoreItem()

        },
        logout: (state) => {
            localStorage.setItem('loginStatus', 'false');
            state.isLoggedin = getLocalStoreItem()
            localStorage.setItem('adminStatus', 'false');
            state.isAdmin = getLocalStoreAdmin()
        },
        admin: (state) => {
            localStorage.setItem('adminStatus', 'true');
            state.isAdmin = getLocalStoreAdmin()
        },
    }

})

export const { login, logout, admin } = userSlice.actions;
export default userSlice.reducer