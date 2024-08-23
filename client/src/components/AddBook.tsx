import { ChangeEvent, useState } from "react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"


export default function AllBooks() {
  const [book, setBook] = useState({title: '', author: '', description: '', copies: 0})
  const [loading , setLoading] = useState(false);
  const { toast } = useToast()

  const isAlphabet = (input: string) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(input);
  }
  const handleAuthor = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const val = e.target.value;
    const last = val[val.length - 1]
    if(isAlphabet(last) || last === " "){
      setBook(prevBook => ({ ...prevBook, author: val }));
    }
  }
  const handlecopy = (e: ChangeEvent<HTMLInputElement>) => {
     e.preventDefault();
     const val = Number(e.target.value)
     if(!isNaN(val)){
      setBook(prevBook => ({ ...prevBook, copies: val}))
     }
  }

  const hasSeven = (input: string) => {
    const words = input.trim().split(/\s+/);
    return words.length >= 7;
  }

  const handleSubmit = async() => {
    setLoading(true)
    const response = await fetch('http://localhost:5000/api/addbook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: book.title.trim(),
        author: book.author.trim(),
        count: book.copies,
        description: book.description.trim()
      })
    });
    const json = await response.json();
    setLoading(false)
    if(json.success){
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
                <h3 className="font-semibold tracking-tight text-2xl">Add new book</h3>
                <p className="text-sm text-muted-foreground">Enter details below to add book</p>
            </div>

       <div className="p-6 pt-0 grid gap-y-4">
       <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={"title"}>Title</label>
        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" value={book.title} onChange={(e) => {e.preventDefault(); setBook(prevBook => ({...prevBook, title: e.target.value}))}} id={"title"} placeholder={"Enter book title"} type={"text"}/>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={"author"}>Author</label>
        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" value={book.author} onChange={handleAuthor} id={"author"} placeholder={"Enter author name"} type={"text"}/>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={"description"}>Description</label>
        <Textarea id="description" placeholder="Enter book description" value={book.description} onChange={(e) => {e.preventDefault(); setBook(prevBook => ({...prevBook, description: e.target.value}))}} />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={"copies"}>Copies</label>
        <input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" value={book.copies === 0 ? '' : book.copies} onChange={handlecopy} id={"copies"} placeholder={"Enter no of copies"} type={"text"}/>
      </div>
      <Button onClick={async(e) => {e.preventDefault(); await handleSubmit()}} className="text-sm font-semibold mt-2" disabled = {book.title.length < 3 || book.author.length < 3 || !hasSeven(book.description) || book.copies < 1 || loading } >Add book</Button>
       </div>
       </div>
       </div>
    </Card>
  )
}

