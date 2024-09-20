
import Home from './pages/Home'
import { Provider, useDispatch } from 'react-redux'
import { useAuthState } from './utils/auth'
import store from './store'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProviderWrapper } from './styles/ThemeWrapper'
import AdminPanel from './pages/adminPanel'
import ProjectNotes from './pages/projectNotes'
import Tutorials from './pages/tutorials'

import AskQuery from './pages/askAQuery'
import ErrorPage from './pages/404'
import Savetoken from './pages/saveToken'
import { QueryParamProvider } from 'use-query-params'
function App() {
  const AuthWrapper = ({ children }) => {
    const dispatch = useDispatch()
    useAuthState(dispatch)
    return children
  }

  return (
    <>
    <QueryParamProvider>    
      <ThemeProviderWrapper>
      <Provider store={store}>
          <BrowserRouter>
            <AuthWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/adminPanel" element={<AdminPanel />} /> 
                <Route path="/projectNotes" element={<ProjectNotes />} /> 
                 <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/askAQuery" element={<AskQuery />} />
                <Route path="/saveToken" element={<Savetoken/>}/>
                 <Route path="*" element={<ErrorPage/>} /> 

              </Routes>
            </AuthWrapper>
          </BrowserRouter>
      </Provider>
      </ThemeProviderWrapper>
      </QueryParamProvider>

    </>
  )
}

export default App
