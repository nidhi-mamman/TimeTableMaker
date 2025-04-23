import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import MyAccount from './Components/MyAccount/MyAccount'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='signup' element={<MyAccount type='Sign-Up' />} />
            <Route path='signin' element={<MyAccount type='Sign-In' />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
