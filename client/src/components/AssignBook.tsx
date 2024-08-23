import { Card } from "./ui/card";
import AssignBookWrapper from "./AssignBookWrapper";

export default function AssignBook() {
  return (
    <Card className='bg-transparent h-full flex flex-col overflow-hidden'>
       <div className="h-[48px] w-full border-b flex items-center px-5 justify-between shadow-2xl shadow-border">
        <span className="text-xl font-semibold">{'Add Books'}</span>
       </div>
       <AssignBookWrapper/>
       
    </Card>
  )
}
