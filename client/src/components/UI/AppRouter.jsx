import React, { useContext } from 'react'
import { AuthContext } from '../../context'
import { publicRoutes, privateRoutes} from '../../routes/index'
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom"


function AppRouter() {
  const { isAuth } = useContext(AuthContext)


  return (
    <Router>
      {isAuth 
      ?<Routes>
        {privateRoutes.map((route, key) => 
          <Route key={key} path={route.path} element={route.element} />
        )}
      </Routes>

      :<Routes>
        {publicRoutes.map((route, key) => 
          <Route key={key} path={route.path} element={route.element} />
        )}
      </Routes>
    }
    </Router>
  )
}

export default AppRouter