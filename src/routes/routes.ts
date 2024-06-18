// import SignIn from "@/views/SignIn/SignIn";
// import SignUp from "@/views/SignUp/SignUp";
// import UserInfo from "@/views/UserInfo/UserInfo"
import PatientsRecord from '@/views/PatientsRecord/PatientsRecord'
import PatientDetail from '@/views/PatientsRecord/PatientDetail'
import ModelList from '@/views/ModelList/ModelList'
import { Layout } from '@/components/_Layout'
import { createBrowserRouter } from 'react-router-dom'
import SignIn from '@/views/SignIn/SignIn'

export const routes = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [],
    },
    {
      path: '/patients',
      Component: PatientsRecord,
      children: [],
    },
    {
      path: '/models',
      Component: ModelList,
      children: [],
    },
    {
      path: '/signin',
      Component: SignIn,
      children: [],
    },
  ],
  { basename: '/kk2/' }
)
