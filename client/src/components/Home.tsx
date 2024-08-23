import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable"
import Sidebar from "./Sidebar"

 
export default function Home({children}: {children: React.ReactNode}): JSX.Element {

  return (
    <div className={`h-dvh w-dvw min-w-[1024px] p-2`}>
      <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={25} minSize={25} maxSize={30} ><Sidebar/></ResizablePanel>
      <ResizableHandle withHandle/>
      <ResizablePanel>{children}</ResizablePanel>
    </ResizablePanelGroup>
    </div>
  )
}

