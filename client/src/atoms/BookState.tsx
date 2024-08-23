import { atom } from "recoil";

export const BookState = atom({
    key: 'BookState',
    default: {bookId: '', bookname: '', author: ''}
})