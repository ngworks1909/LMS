import { useRecoilValue, useSetRecoilState } from "recoil";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { AssignType } from "./types/AssignType";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { ReturnState } from "../atoms/ReturnState";
import { Search } from "lucide-react";

export default function ReturnBook() {
  const {toast} = useToast()
  const setSearch = useSetRecoilState(ReturnState)
  const [assigns, setAssigns] = useState<AssignType[]>([])
    const [loading, setLoading] = useState(true)
    const handleDate = (d: Date) => {
      const date = new Date(d)
      const day = date.getDate()
      const month = date.getMonth()
      const monthString = month === 0 ? "Jan" : month === 1 ? "Feb" : month === 2 ? "Mar": month === 3? "Apr": month === 4? "May": month === 5? "Jun":
                  month === 6? "Jul": month === 7? "Aug": month === 8? "Sep": month === 9? "Oct": month === 10? "Nov": "Dec"
      const year = date.getFullYear()
      return `${day} ${monthString} ${year}`
    }
    useEffect(() => {
        fetch('http://localhost:5000/api/getallassigns', {method: "GET"})
        .then((response) => {
            response.json().then((data) => {if(data.success) {
                setAssigns(data.assigns)
            }
            setLoading(false)
        })
        })
    },[]);
  const search = useRecoilValue(ReturnState)
  const handleClick = async(removeId: string) => {
    const response = await fetch(`http://localhost:5000/api/returnbook/${removeId}`, {method: "DELETE"});
    const json = await response.json();
    if(json.success){
      const newAssigns = assigns.filter(assign => assign.assignId !== removeId);
      setAssigns(newAssigns)
      toast({
        description: json.message,
      })
    }
    else{
      toast({
        variant: "destructive",
        description: json.message,
      })
    }
  }
  return (
    <Card className='bg-transparent h-full flex flex-col overflow-hidden'>
       <div className="h-[53px] w-full border-b flex items-center px-5 justify-between">
        <span className="text-xl font-semibold">{'Return Books'}</span>
       </div>
       <div className='h-[60px] flex items-center justify-center w-full shadow-2xl shadow-border py-4'>
          <div className="relative bg-transparent rounded-lg w-[85%] md:w-[75%]"> 
          <Search className='lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'/>
          <input value={search} onChange={(e) => { e.preventDefault(); setSearch(e.target.value)}} className="flex h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search" />
          </div>
       </div>
       <div className=" h-available overflow-hidden overflow-y-scroll px-4 pb-2">
              {
                  loading ? <div className="h-full w-full flex items-center justify-center">
                      <span>Loading...</span>
                      </div> : 
                       assigns.filter((assign) => assign.userId.toLowerCase().includes(search.toLowerCase())).length === 0 ? <div className="h-full w-full flex items-center justify-center"><span>{search ? 'No results found...': 'You doesnt have any books'}</span>
                       </div>: 
                       <div className="grid grid-cols-2 pt-4 gap-x-5 gap-y-2">
                          {
                              
                              assigns.filter((assign) => assign.userId.toLowerCase().includes(search.toLowerCase())).map((assign, index) => {
                                  return <Card key={index} className="flex flex-col py-4 px-6 gap-6" onClick={async(e) => {e.preventDefault(); await handleClick(assign.assignId)}} >
                                  <div className="flex justify-between">
                                  <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">{assign.userId}</span>
                                    <span className="text-sm font-light line-clamp-1 overflow-ellipsis w-[100px]">{assign.bookname}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <span className="text-sm">{handleDate(assign.assignedAt)}</span>
                                  </div>
                                  </div>
                                  <div className="w-full flex justify-end">
                                  <Button className="w-max px-8 text-sm font-semibold">Collect</Button>
                                  </div>
                                </Card>
                              })
                          }
                       </div>
              }
       </div>
    </Card>
  )
}
