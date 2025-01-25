import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './output.css'
import Navbar from './components/navbar'
import RideMode from './components/ridemode'
import Details from './components/details'
import Slider from './components/slider'
import Login from './components/login'
import Mainpage from './components/mainpage'
import Homepage from './components/homepage'
import AvailableRides from './components/availablerides'
import Agentbutton from './components/agentbutton'
import DriverSignup from './components/driversignup'
import DriverHome from './components/driverhome'
import DriverSignin from './components/driversignin'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
function App() {
  const router=createBrowserRouter([
    {
      path:'/',
      element:(
        <>
      <Navbar/>
      <RideMode/>
      <Details/>
      <Slider/>
      <Agentbutton/>
        </>
      )
    },
    {
      path:'login',
      element:(
        <>
        <Navbar/>
        <Login/>
        </>
      )
    },
    {
      path:'rider',
      element:(
        <>
        <Mainpage/>
        </>
      )
    },
    {
      path:'home',
      element:(
        <>
        <Homepage/>
        </>
      )
    },
    {
      path:'available-rides',
      element:(
        <>
        <AvailableRides/>
        </>
      )
    },
    {
      path:'driver-signup',
      element:(
        <>
        <DriverSignup/>
        </>
      )
    },
    {
      path:'driver-home',
      element:(
        <>
        <DriverHome/>
        </>
      )
    },
    {
      path:'driver-signin',
      element:(
        <>
        <DriverSignin/>
        </>
      )
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
