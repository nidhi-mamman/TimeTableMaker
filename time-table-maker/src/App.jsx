import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import MyAccount from './Components/MyAccount/MyAccount'
import Verify from './Pages/Verify';
import ResetPass from './Pages/ResetPass';
import TimetableForm from './Pages/TimeTableForm';
import TimetableView from './Pages/TimeTableView';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/signup' element={<MyAccount type='Sign-Up' />} />
          <Route path='/signin' element={<MyAccount type='Sign-In' />} />
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
