import { useSetRecoilState } from "recoil";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { BookState } from "../atoms/BookState";


export default function BookCard({bookname, author, bookId, available}: {bookname: string, author: string, bookId: string, available: number}) {
  const setBook = useSetRecoilState(BookState)
  const handleClick = () => {
    setBook({bookId, bookname, author})
  }
  return (
    <Card className="w-[90%] bg-accent flex items-center px-3 justify-between">
       <div className="flex flex-col py-2 gap-1">
       <span className="line-clamp-1 w-[200px] text-sm font-semibold">{bookname}</span>
       <span className="text-xs w-[180px] text-[#d2cfcf]">{author}</span>
       </div>
       {available > 0 ? <Button variant={"default"} onClick={(e) => {e.preventDefault(); handleClick()}}  >Select</Button> : <Card className="p-2 bg-transparent border-red-400 text-sm text-red-400">Unavailable</Card>}
    </Card>
  )
}
