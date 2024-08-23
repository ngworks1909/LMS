import { atom } from "recoil";

export const UserDetailsState = atom({
    key: 'UserDetailsState',
    default: {userId: '', username: ''}
})