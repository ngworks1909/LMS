import { ChangeEvent, useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { useToast } from "./ui/use-toast"


export default function CreateUser() {
  const [user, setUser] = useState({userId: '', username: '', mobile: ''})
  const [loading , setLoading] = useState(false);
  const { toast } = useToast()

  const isAlphabet = (input: string) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(input);
  }

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.target.value;
    const last = val[val.length - 1]
    if(isAlphabet(last) || last === " "){
      setUser(prevUser => ({ ...prevUser, username: val }));
    }
  }

  const handleNumber = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser(prevUser => ({...prevUser, mobile: e.target.value}))
  }



  const handleSubmit = async() => {
    setLoading(true)
    const response = await fetch('http://localhost:5000/api/adduser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user.userId.toUpperCase().trim(),
        username: user.username.trim(),
        mobile: user.mobile
      })
    });
    const json = await response.json();
    setLoading(false)
    if(json.success){
      setUser({userId: '', username: '', mobile: ''})
      toast({
        description: json.message,
      })
    }
    else{
      toast({
        variant: "destructive",
        description: json.error,
      })
    }
  }

  return (
    
    <Card className='bg-transparent h-full flex flex-col overflow-hidden'>
       <div className="h-[48px] w-full border-b flex items-center px-5 justify-between shadow-2xl shadow-border">
        <span className="text-xl font-semibold">{'Add Books'}</span>
       </div>
       <div className="h-available flex items-center justify-center">
       <div className="rounded-xl border min-w-[350px] sm:w-[450px] bg-card text-card-foreground shadow">
       <div className="flex flex-col p-6 space-y-1">
                <h3 className="font-semibold tracking-tight text-2xl">Create User</h3>
                <p className="text-sm text-muted-foreground">Enter details below to add user</p>
            </div>

       <div className="p-6 pt-0 grid gap-y-4">
       <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={"userId"}>UserId</label>
        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" value={user.userId} onChange={(e) => {e.preventDefault(); setUser(prevUser => ({...prevUser, userId: e.target.value}))}} id={"userId"} placeholder={"Enter userId"} type={"text"}/>
      </div>
       <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={"username"}>Username</label>
        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" value={user.username} onChange={handleName} id={"username"} placeholder={"Enter username"} type={"text"}/>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={"mobile"}>Mobile</label>
        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" value={user.mobile} onChange={handleNumber} id={"mobile"} placeholder={"Enter mobile number"} type={"text"}/>
      </div>
      <Button onClick={async(e) => {e.preventDefault(); await handleSubmit()}} className="text-sm font-semibold mt-2" disabled = {user.username.length < 3 || user.mobile.length !== 10 || loading } >Add User</Button>
       </div>
       </div>
       </div>
    </Card>
  )
}

