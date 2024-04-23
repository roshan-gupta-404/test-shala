import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import ResultPage from './components/result/ResultPage'


function App() {

  return (
    <div id='body'>
      <Header/>
      <main>
        <Outlet/>
        {/* <ResultPage/> */}
      </main>
      <Footer/>
      
    </div>
  )
}

export default App
