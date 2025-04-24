import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import MyAccount from './Components/MyAccount/MyAccount'
import Verify from './Pages/Verify';
import ResetPass from './Pages/ResetPass';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route path='signup' element={<MyAccount type='Sign-Up' />} />
            <Route path='signin' element={<MyAccount type='Sign-In' />} />
            <Route path='forgotpass' element={<Verify />} />
            <Route path='resetpass' element={<ResetPass />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
