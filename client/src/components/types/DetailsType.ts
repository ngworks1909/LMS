export type DetailsType = {
    userId: string,
    username: string,
    mobile: string,
    books: {
        bookId: string,
        title: string,
        author: string,
        count: number,
        description: string
    }[]
}