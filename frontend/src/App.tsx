import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import HomePage from "./pages/home/HomePage.tsx";
import Login from "./pages/login/Login.tsx";
import Register from "./pages/register/Register.tsx";
import {useEffect} from "react";
import {useLazyCheckAuthQuery} from "./store/slices/userSlice/userApi.ts";
import {ToastContainer} from "react-toastify";
import Layout from "./components/layout/layout.tsx";

import AdminPage from "./pages/admin/Admin.tsx";
import {useAppSelector} from "./store/hooks.ts";
import {selectUser} from "./store/slices/userSlice/userSlice.ts";




function App() {

    const [checkAuth] = useLazyCheckAuthQuery()
    const user = useAppSelector(state => state.user)

    useEffect(() => {
        checkAuth()
    }, [checkAuth]);


    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Layout/>}>
                    <Route exact path="/" element={<HomePage/>}/>
                </Route>
                <Route exact path={"/secret-dashboard"} element={ user?.role === 'admin' ?  <AdminPage/> : <Navigate to={'/'}/> }/>
                <Route exact path={"/login"} element={<Login/>}/>
                <Route exact path={"/signup"} element={<Register/>}/>
            </>
        )
    )

    return (
        <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
            {/*<div className='absolute inset-0 overflow-hidden'>*/}
            {/*    <div className='absolute inset-0'>*/}
            {/*        <div*/}
            {/*            className=' absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]'/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <RouterProvider router={router}/>
            <ToastContainer/>
        </div>
    )
}

export default App
