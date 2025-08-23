
import Welcome from "./pages/Welcome"
import Start from "./pages/Start"
import { BrowserRouter,Routes,Route } from 'react-router-dom'
function App() {
  return (
    <>
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>} />
           <Route path="/start" element={<Start/>} />
          
    
        </Routes>
      </BrowserRouter>
 
    </>
  )
}

export default App