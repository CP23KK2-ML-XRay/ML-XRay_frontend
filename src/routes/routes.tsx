import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components/_Layout'
import SignIn from '@/views/SignIn/SignIn'
import SignUp from '@/views/SignUp/SignUp'
// import { isAuthentication } from "@/utils/AuthenticationUtils";
import { ListPatient } from '@/views/Patiant/ListPatiant'
import { DetailPatient } from '@/views/Patiant/DetailPatient'
import { isAuthentication } from '@/utils/AuthenticationUtils'
import ModelList from '@/views/ModelList/ModelList'


const requireAuth = (element: React.ReactElement) => {
  return isAuthentication() ? element : <Navigate to="/signin" />
}

export const routes = createBrowserRouter([
  {
    path: '/',
    element: requireAuth(<Layout />),
    children: [
      { path: '/', element: <ListPatient /> },
      { path: '/detail/:id', element: <DetailPatient /> },
      { path: '/model', element: <ModelList /> },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])
