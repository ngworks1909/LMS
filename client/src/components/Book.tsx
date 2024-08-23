import { Card } from "./ui/card";
import bookimage from '../assets/book.jpeg'
import { BookType } from "./types/BookType";

export default function Book({book}: {book: BookType}) {
  return (
    <Card className="p-4 flex flex-col h-[180px]">
       <div className="flex gap-5">
       <input type="image" className="h-24 w-24 rounded-md" src={bookimage} alt="book" />
       <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-2">
        <span className="text-lg font-medium line-clamp-1">{book.title}</span>
        <span className="line-clamp-3 text-[#918f8f] text-sm min-h-[3.8rem]">{book.description}</span>
        </div>
        <span className="self-end text-sm font-medium line-clamp-1 max-w-[250px]">{"-- "}{book.author}</span>
       </div>
       </div>
        <span className="text-sm font-medium bg-accent w-max py-1.5 pl-4 pr-6 rounded-md">Copies Available: {`${book.available}/${book.count}`}</span>
    </Card>
  )
}
