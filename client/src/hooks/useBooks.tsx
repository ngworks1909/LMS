import { useEffect, useState } from "react"
import { BookType } from "../components/types/BookType";

export const useBooks = () => {
    const [books, setBooks] = useState<BookType[]>([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/api/getallbooks', {
            method: 'GET'
        }).then(async(response) => {
            const json = await response.json();
            if(json.success){
                setBooks(json.books)
            }
            setLoading(false)
        })
    }, [])
    return {loading, books}
}