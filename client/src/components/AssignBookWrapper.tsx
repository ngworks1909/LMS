import { Search } from "lucide-react";
import { useBooks } from "../hooks/useBooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import BookCard from "./BookCard";
import { Button } from "./ui/button";
import { BookState } from "../atoms/BookState";
import BookWrapper from "./BookWrapper";
import { UserDetailsState } from "../atoms/UserDetailsState";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { AssignState } from "../atoms/AssignState";

export default function AssignBookWrapper() {
  const {books, loading} = useBooks()
  const {toast} = useToast()
  const setSearch = useSetRecoilState(AssignState)
  const search = useRecoilValue(AssignState)
  const selected = useRecoilValue(BookState)
  const setSelected = useSetRecoilState(BookState)
  const user = useRecoilValue(UserDetailsState)
  const setUser = useSetRecoilState(UserDetailsState)
  const [pageloading, setPageLoading] = useState(false)
  const handleClick = async() => {
    setPageLoading(true)
    const response = await fetch('http://localhost:5000/api/assignbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userId: user.userId, bookId: selected.bookId})
    });

    const json = await response.json();
    if(json.success){
        toast({
            description: json.message,
        })
    }
    else{
        toast({
            variant: "destructive",
            description: json.error,
        })
    }

    setUser({userId: '', username: ''})
    setSelected({bookId: '', bookname: '', author: ''})

    setPageLoading(false)

  }
  return (
    <div className="h-available flex items-center justify-center">
       <div className="rounded-xl border min-w-[350px] sm:w-[450px] bg-card text-card-foreground shadow">
       <div className="flex flex-col p-6 space-y-1">
                <h3 className="font-semibold tracking-tight text-2xl">Assign book</h3>
                <p className="text-sm text-muted-foreground">Enter details below to find books</p>
            </div>

       <div className="p-6 pt-0 grid gap-y-4">
        {selected.bookId ? <BookWrapper/>: <>
            <div className="relative rounded-lg w-full"> 
        <Search className='lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'/>
        <input onChange={(e) => {e.preventDefault(); setSearch(e.target.value)}} value={search} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search for book" />
        </div>
        <div className="h-40 border rounded-md overflow-hidden overflow-y-scroll">
          <div className="py-2 flex h-available flex-col items-center gap-2">
             {loading ? <div className="h-full flex items-center"><span>Loading...</span></div> : books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())).map((book, index) => {
               return <BookCard key={index} bookname={book.title} author={book.author} bookId={book.bookId} available = {book.available} />
             })}
          </div>

        </div></>}

      <Button className="text-sm font-semibold mt-2" disabled = {!user.userId || !selected.bookId || pageloading}  onClick={async(e) => {e.preventDefault(); await handleClick()}} >Assign book</Button>
       </div>
       </div>
       </div>
  )
}
