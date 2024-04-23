import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/main/Home.jsx'
import TestPage from './components/test/TestPage.jsx'
import AllSubjects from './components/main/subjects/AllSubjects.jsx'
import TestList from './components/test/TestList.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import ResultPage from './components/result/ResultPage.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'',
        element:<Home/>        
      },
      {
        path:'test-list/:slug',
        element:<TestList/> 
      },
      {
        path:'test-page/:slug',
        element:<TestPage/>
      },
      {
        path:'result-page',
        element:<ResultPage/>
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
  //</React.StrictMode>
  ,
)
