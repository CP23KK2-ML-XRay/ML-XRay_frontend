import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import PageNotFound from './views/PageNotFound/PageNotFound'
import UserInfo from './views/UserInfo/UserInfo'
import PatientsRecord from './views/PatientsRecord/PatientsRecord'
import ModelList from './views/ModelList/ModelList'
import SignIn from './views/SignIn/SignIn'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<UserInfo />} />
        <Route path="/patients" element={<PatientsRecord />} />
        <Route path="/about" element={<ModelList />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
