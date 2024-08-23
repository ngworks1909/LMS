import {
    User,
    View,
    Library,
    BookPlus,
    BookUp,
    BookDown
  } from "lucide-react"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "./ui/command"
import { useSetRecoilState } from "recoil";
import { MainState } from "../atoms/MainState";
  
  export default function Sidebar() {
    const setMain = useSetRecoilState(MainState)
    return (
      <Command className="rounded-lg border shadow-md h-full">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="h-full max-h-full">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Books">
            <div onClick={(e) => {e.preventDefault(); setMain(1)}}>
            <CommandItem className="py-2 bg-none data-[selected='true']:bg-transparent hover:bg-accimp">
              <Library className="mr-2 h-4 w-4" />
              <span>All Books</span>
            </CommandItem>
            </div>
            <div onClick={(e) => {e.preventDefault(); setMain(2)}}>
            <CommandItem className="py-2 bg-none data-[selected='true']:bg-transparent hover:bg-accimp">
              <BookPlus className="mr-2 h-4 w-4" />
              <span>Add Book</span>
            </CommandItem>
            </div>
            
            <div onClick={(e) => {e.preventDefault(); setMain(3)}}>
            <CommandItem className="py-2 bg-none data-[selected='true']:bg-transparent hover:bg-accimp">
              <BookUp className="mr-2 h-4 w-4" />
              <span>Assign Book</span>
            </CommandItem>
            </div>
            <div onClick={(e) => {e.preventDefault(); setMain(4)}}>
            <CommandItem className="py-2 bg-none data-[selected='true']:bg-transparent hover:bg-accimp">
              <BookDown className="mr-2 h-4 w-4" />
              <span>Return Book</span>
            </CommandItem>
            </div>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="User">
            <div onClick={(e) => {e.preventDefault(); setMain(5)}}>
            <CommandItem className="py-2 bg-none data-[selected='true']:bg-transparent hover:bg-accimp">
              <User className="mr-2 h-4 w-4" />
              <span>Register User</span>
              <CommandShortcut>⌘R</CommandShortcut>
            </CommandItem>
            </div>
            <div onClick={(e) => {e.preventDefault(); setMain(6)}}>
            <CommandItem className="py-2 bg-none data-[selected='true']:bg-transparent hover:bg-accimp">
              <View className="mr-2 h-4 w-4" />
              <span>User Detalils</span>
              <CommandShortcut>⌘V</CommandShortcut>
            </CommandItem>
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    )
  }
  