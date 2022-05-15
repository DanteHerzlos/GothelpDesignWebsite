import Admin from "../pages/AdminPage/Admin"
import CreateItemPage from "../pages/CreateItemPage/CreateItemPage"
import Home from "../pages/HomePage/Home"
import LoginPage from "../pages/LoginPage/LoginPage"

export const privateRoutes = [
    { path: '/', element: <Home/> },
    { path: '/admin', element: <Admin/> },
    { path: '/admin/:id', element: <CreateItemPage/> },
    { path: '*', element: <Home/> }
]

export const publicRoutes = [
    { path: '/', element: <Home/> },
    { path: '/login', element: <LoginPage/> },
    { path: '*', element: <Home/> }
]