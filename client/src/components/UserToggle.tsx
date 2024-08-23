import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Book } from "lucide-react";
import bookimage from '../assets/book.jpeg'
import { DetailsType } from "./types/DetailsType";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DetailState } from "../atoms/DetailState";

export default function UserToggle() {
  const userId = useRecoilValue(DetailState)
  const setUserId = useSetRecoilState(DetailState);
  const [details, setDetails] = useState<DetailsType>({userId: '', username: '', mobile: '', books: []});
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        if(!userId){
            setDetails({userId: '', username: '', mobile: '', books: []})
            setLoading(false)
        }
        else{
            fetch(`http://localhost:5000/api/getuser/${userId}`, {method: 'GET'})
            .then((response) => {response.json().then((data) => { 
                if(data.success){
                    setDetails(data.user);
                    setLoading(false)
                }
             })})
        }
    }, [userId]);
  return (
    <>
    {loading ? <div className="flex h-full w-full items-center justify-center">Loading...</div>: 
    <div className="h-full w-full p-4 gap-4 flex flex-col">

    <Card className="flex h-16 items-center justify-between px-4">
    <span className="text-md font-medium">{details.userId}</span>
    <span className="text-sm">{details.username}</span>
    <span className="text-sm">{details.mobile}</span>
    <Button variant={"destructive"} onClick={(e) => {e.preventDefault(); setUserId('')}} >Remove</Button>
  </Card>
  <Card className="h-available w-full flex overflow-hidden">
    <div className="flex-1">
        <div className={`w-full h-10 bg-accent gap-2 flex items-center px-4`}>
            <Book size={15}/>
            <span className="text-sm font-medium">Books</span>
        </div>
    </div>
    <div className="border-l flex-[2] flex flex-col gap-2 p-4 overflow-hidden overflow-y-scroll">

         {details.books.map((book, index) => {
            return  <div key={index} className="bg-slate-700 w-full items-center h-16 justify-between px-4 flex rounded-md">
            <input type="image" src={bookimage} alt="B" className='h-8 w-8 rounded-md shadow-custom' />
            <span className='w-[120px] line-clamp-1'>{book.title}</span>
            <span className='w-[180px] line-clamp-1'>{book.author}</span>
           </div>
         })}
    </div>
  </Card>
</div>}
    </>
  )
}
