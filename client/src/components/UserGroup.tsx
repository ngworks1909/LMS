import { useSetRecoilState } from "recoil";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { DetailState } from "../atoms/DetailState";
import { ViewState } from "../atoms/ViewState";

export default function UserGroup({userId, username}: {userId: string, username: string}) {
  const setUser = useSetRecoilState(DetailState)
  const setSearch = useSetRecoilState(ViewState)
  return (
    <Card className="py-2 px-4 flex items-center justify-between">
        <div className="flex flex-col gap-1"> 
            <span className="text-md font-semibold">{userId}</span>
            <span className="text-sm">{username}</span>
        </div>
        <Button onClick={(e) => {e.preventDefault(); setSearch(''); setUser(userId)}} >Select</Button>
    </Card>
  )
}
