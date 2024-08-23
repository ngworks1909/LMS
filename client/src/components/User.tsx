import { useSetRecoilState } from "recoil";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { UserDetailsState } from "../atoms/UserDetailsState";

export default function User({userId, username}: {userId: string, username: string}) {
  const setUser = useSetRecoilState(UserDetailsState)
  const handleClick = () => {
    setUser({userId, username})
  }
  return (
    <Card className="w-[90%] bg-accent flex items-center px-3 justify-between">
       <div className="flex flex-col py-2 gap-1">
       <span className="line-clamp-1 w-[200px] text-sm font-semibold">{userId}</span>
       <span className="text-xs w-[180px] text-[#d2cfcf]">{username}</span>
       </div>
       <Button variant={"default"} onClick={(e) => {e.preventDefault(); handleClick()}}>Select</Button>
    </Card>
  )
}
