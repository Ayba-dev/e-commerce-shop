import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '../shared/components/layout/layout'
import { HomePage } from '../pages/home/HomePage'
import Register from '../pages/register/Register'
import { useAppDispatch, useAppSelector } from '../shared/store/hooks'
import { selectUser } from '../features/userSlice/userSlice'
import { AdminPage } from '../pages/adminPage/Admin'
import { useEffect } from 'react'
import { checkAuth } from '../features/userSlice/thunk'
import { CategoryPage } from '../pages/categoryPage/CategoryPage'
import CartPage from '../pages/cartPage/cartPage'
import { Login } from '../pages/login/Login'
import '../styles/index.css'
export function App() {
  const user = useAppSelector(selectUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(checkAuth())
  }, [checkAuth])

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={'/'} element={<Layout />}>
          <Route path={'/'} element={<HomePage />} />
          <Route path={"/category/:category"} element={<CategoryPage/>}/>
          <Route path={"/cart"} element={user ? <CartPage/> : <Navigate to={'/login'}/>}/>
          <Route path={'/signup'} element={user ? <Navigate to={'/'} /> : <Register />} />
          <Route path={'/login'} element={user ? <Navigate to={'/'} /> : <Login />} />
          <Route path={'/secret-dashboard'} element={user?.role === 'admin' ? <AdminPage/> : <Navigate to={'/login'}/>}/>
        </Route>
      </>,
    ),
  )

  return (
    <div className="min-h-screen bg-gray-800 text-white relative overflow-hidden">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}
