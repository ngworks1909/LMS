import { useRecoilValue } from "recoil";
import AllBooks from "./AllBooks";
import { MainState } from "../atoms/MainState";
import AddBook from "./AddBook";
import AssignBook from "./AssignBook";
import ReturnBook from "./ReturnBook";
import CreateUser from "./CreateUser";
import UserDetails from "./UserDetails";


export default function Main() {
  const main = useRecoilValue(MainState)
  return (
    <>
    {main === 1 ? <AllBooks/> : main === 2 ? <AddBook/> : main === 3 ? <AssignBook/>: main === 4 ? <ReturnBook/>:
    main === 5 ? <CreateUser/> : <UserDetails/>}
    </>
  )
}
