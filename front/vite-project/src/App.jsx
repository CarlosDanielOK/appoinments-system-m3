import { useContext, useEffect, useState } from 'react'
import styles from './App.module.css'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Register from './views/Register/Register'
import Navbar from './components/NavBar/Navbar'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import NotFound from './views/NotFound/NotFound'
import { UsersContext } from './context/UsersContext'
import AgendarTurno from './components/AgendarTurno/AgendarTurno'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const [isNotFound, setIsNotFound] = useState(false)
  const { user } = useContext(UsersContext)

  useEffect(() => {
    const validRoutes = ['/', '/login', '/register', '/misturnos', '/agendarturno']
    if (!validRoutes.includes(location.pathname)) {
      setIsNotFound(true)
    } else {
      setIsNotFound(false)
    }

    if (!user && location.pathname !== '/login' && location.pathname !== '/register') {
      navigate('/login')
    }

    if (user && location.pathname === "/login" || user && location.pathname === '/register') {
      navigate('/')
    }
  }, [location.pathname, user, navigate])

  return (
    <>
      {
        !user ? (
          <main className={styles.mainLoggin}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        ) : (
          <>
            {!isNotFound && (
              <header>
                <Navbar />
              </header>
            )}
            <main className={styles.mainBienvenida}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/misturnos" element={<MisTurnos />} />
                <Route path="/agendarturno" element={<AgendarTurno />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </>
        )
      }

    </>
  )
}

export default App
