
import Home from './pages/Home'
import { Provider, useDispatch } from 'react-redux'
import { useAuthState } from './utils/auth'
import store from './store'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPanel from './pages/adminPanel'
import ProjectNotes from './pages/projectNotes'
import Tutorials from './pages/tutorials'

import AskQuery from './pages/askAQuery'
import ErrorPage from './pages/404'
import { ThemeProvider } from '@mui/styles'
import { chosenTheme } from './theme'
function App() {
  const AuthWrapper = ({ children }) => {
    const dispatch = useDispatch()
    useAuthState(dispatch)
    return children
  }

  return (
    <>
      <Provider store={store}>
        {/* <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }}> */}
          <BrowserRouter>
          <ThemeProvider theme={chosenTheme}>
            <AuthWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/adminPanel" element={<AdminPanel />} />
                <Route path="/projectNotes" element={<ProjectNotes />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/askAQuery" element={<AskQuery />} />
                {/* error page */}
                <Route path="*" element={<ErrorPage/>} />

              </Routes>
            </AuthWrapper>
          </ThemeProvider>
          </BrowserRouter>
        {/* </SnackbarProvider> */}
      </Provider>
    </>
  )
}

export default App
