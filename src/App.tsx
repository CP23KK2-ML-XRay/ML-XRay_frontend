import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PageNotFound } from "@/views/PageNotFound/PageNotFound";
import "./App.css";
import UserInfo from "./views/UserInfo/UserInfo";
import PatientsRecord from "./views/PatientsRecord/PatientsRecord";
import ModelList from "./views/ModelList/ModelList";
import SignIn from "./views/SignIn/SignIn";

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
  );
}

export default App;
