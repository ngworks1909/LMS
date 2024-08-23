import { Search } from "lucide-react";
import { Card } from "./ui/card";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ViewState } from "../atoms/ViewState";
import UserGroup from "./UserGroup";
import { useDebounce } from "../hooks/useDebounce";
import { DetailState } from "../atoms/DetailState";
import UserToggle from "./UserToggle";


export default function UserDetails() {
  const setSearch = useSetRecoilState(ViewState)
  const search = useRecoilValue(ViewState)
  const {users, loading} = useDebounce(search.toUpperCase(), 500)
  const userId = useRecoilValue(DetailState);
  return (
    <>
     <Card className='bg-transparent h-full flex flex-col overflow-hidden'>
       <div className="h-[48px] w-full border-b flex items-center px-5 justify-between shadow-2xl shadow-border">
        <span className="text-xl font-semibold">{'User Details'}</span>
       </div>
       
        {!userId ? <div className="p-4 h-available flex items-center justify-center"> <Card className="h-[500px] w-[500px] flex flex-col">
        <div className='h-[60px] flex items-center justify-center w-full shadow-2xl shadow-border py-4'>
          <div className="relative bg-transparent rounded-lg w-[85%] md:w-[75%]"> 
          <Search className='lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground'/>
          <input value={search} onChange={(e) => { e.preventDefault(); setSearch(e.target.value)}} className="flex h-9 w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="Search" />
          </div>
          
        </div>
        <div className="h-available overflow-hidden overflow-y-scroll p-4 gap-2 flex flex-col">
            {loading ? <div className="h-full flex items-center justify-center"><span>Loading...</span></div> : 
              users.length === 0 ?  <>{search ? <div className="h-full flex items-center justify-center"><span>No results found</span></div> : <div className="h-full flex items-center justify-center"><span>Search for user</span></div>}</>:
              users.map((user, index) => {
                return <UserGroup key={index} userId={user.userId} username={user.username} />
              })
            }
        </div>
        
        </Card> </div> : <UserToggle/>}
       
    </Card>
    </>
  )
}
