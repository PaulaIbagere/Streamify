import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import HomePage from "./pages/HomePage.jsx"
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import OnboardingPage from'./pages/OnboardingPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import CallPage from './pages/CallPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'

import {Toaster} from 'react-hot-toast'
import PageLoader from './components/PageLoader.jsx'
import Layout from './components/Layout.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {

  const {isLoading, authUser} = useAuthUser();
  const {theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  
  if(isLoading) return <PageLoader/>;

  return (
    <div className='h-screen' data-theme={theme}>

      <Routes>
        <Route path='/' element={
          isAuthenticated && isOnboarded === "true" ? (
          <Layout showSidebar={true}>
            <HomePage/>
          </Layout>
          ): (
            <Navigate to={isAuthenticated === "false" ? "/login" : "/onboarding"} />)}
          />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />
        <Route path='/login' element={!isAuthenticated ? <LoginPage/> : <Navigate to={isOnboarded ? "/" : "/onboarding"}/>}/>
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              isOnboarded === "false" ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path='/chat/:id' element={
          isAuthenticated && isOnboarded === "true" ?(
            <Layout showSidebar={false}>
              <ChatPage/>
            </Layout>
          ): (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
          )
        } />

        <Route path='/call/:id' element={
          isAuthenticated && isOnboarded === "true" ? (
            <CallPage/>
          ):(
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
          )
        }/>
        <Route path='/Notification' element={isAuthenticated && isOnboarded === "true"? (
          <Layout showSidebar={true}>
            <NotificationsPage/>
          </Layout>
        ) :(
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
        )}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App