import { useRecoilValue } from "recoil"
import { useBooks } from "../hooks/useBooks"
import Book from "./Book"
import { SearchState } from "../atoms/SearchState"
import SearchBar from "./SearchBar"
import { Card } from "./ui/card"

export default function AllBooks() {
  const search = useRecoilValue(SearchState)
  const {books, loading} = useBooks()
  return (
    
    <Card className='bg-transparent h-full flex flex-col overflow-hidden'>
       <div className="h-[53px] w-full border-b flex items-center px-5 justify-between">
        <span className="text-xl font-semibold">{'All Books'}</span>
       </div>
       <SearchBar/>
       <div className=" h-available overflow-hidden overflow-y-scroll px-4 pb-2">
              {
                  loading ? <div className="h-full w-full flex items-center justify-center">
                      <span>Loading...</span>
                      </div> :
                       books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())).length === 0 ? <div className="h-full w-full flex items-center justify-center"><span>{search ? 'No results found...': 'You doesnt have any books'}</span>
                       </div>: 
                       <div className="grid grid-cols-2 pt-4 gap-x-5 gap-y-2">
                          {
                              books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase())).map((book, index) => {
                                  return <Book key={index} book = {book} />
                              })
                          }
                       </div>
              }
       </div>
    </Card>
  )
}
