import Home from "./components/Home"
import Main from "./components/Main"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Home><Main/></Home>
      <Toaster/>
    </ThemeProvider>
  )
}

export default App
