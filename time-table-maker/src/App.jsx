import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MyAccount from './Components/MyAccount/MyAccount'
import Verify from './Pages/Verify';
import ResetPass from './Pages/ResetPass';
import TimetableForm from './Pages/TimeTableForm';
import TimetableView from './Pages/TimeTableView';
import Login from './Components/MyAccount/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MyAccount/>} />
          <Route path='/signup' element={<Login/>} />
          <Route path='/forgotpass' element={<Verify />} />
          <Route path='/resetpass' element={<ResetPass />} />
          <Route path='/timetableform' element={<TimetableForm />} />
          <Route path='/timetableview' element={<TimetableView />} />
        </Routes>
      </BrowserRouter >
    </>
  )
}

export default App
