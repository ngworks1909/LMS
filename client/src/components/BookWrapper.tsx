import { useRecoilValue, useSetRecoilState } from "recoil";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { BookState } from "../atoms/BookState";
import { Search } from "lucide-react";
import { UserState } from "../atoms/UserState";
import User from "./User";
import { UserDetailsState } from "../atoms/UserDetailsState";
import { useUsers } from "../hooks/useUsers";

export default function BookWrapper() {
  const selected = useRecoilValue(BookState)
  const setSelected = useSetRecoilState(BookState)
  const setUser = useSetRecoilState(UserState)
  const selectedUser = useRecoilValue(UserDetailsState)
  const setSelectedUser = useSetRecoilState(UserDetailsState)
  const handleUserClick = () => {
    setSelectedUser({userId: '', username: ''})
  }
  const {users, loading} = useUsers()
  const handleClick = () => {
    setSelected({bookId: '', bookname: '', author: ''})
  }
  return (
    <>
    <Card className="w-full bg-accent flex items-center px-3 justify-between">
       <div className="flex flex-col py-2 gap-1">
       <span className="line-clamp-1 w-[200px] text-sm font-semibold">{selected.bookname}</span>
       <span className="text-xs w-[180px] text-[#d2cfcf]">{selected.author}</span>
       </div>
       <Button variant={"destructive"} onClick={(e) => {e.preventDefault(); handleClick()}}>Remove</Button>
    </Card>
    {!selectedUser.userId ? <>
        <div className="relative rounded-lg w-full"> 
        <Search className='lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'/>
        <input onChange={(e) => {e.preventDefault(); setUser(e.target.value)}} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search for user" />
        </div>
        <div className="h-40 border rounded-md overflow-hidden overflow-y-scroll">
          <div className="py-2 flex h-available flex-col items-center gap-2">
            {loading ? <div className="h-full flex items-center"><span>Loading...</span></div> : users.map((user, index) => {
                return <User key={index} userId={user.userId} username={user.username}/>
            })}
          </div>
        </div></> : <>
        <Card className="w-full bg-accent flex items-center px-3 justify-between">
       <div className="flex flex-col py-2 gap-1">
       <span className="line-clamp-1 w-[200px] text-sm font-semibold">{selectedUser.userId}</span>
       <span className="text-xs w-[180px] text-[#d2cfcf]">{selectedUser.username}</span>
       </div>
       <Button variant={"destructive"} onClick={(e) => {e.preventDefault(); handleUserClick()}}>Remove</Button>
    </Card>
        </>}
    </>
  )
}
