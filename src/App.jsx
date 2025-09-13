import './App.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import appwriteServices from './appwrite/crud'
import { setExamAndSubject } from './store/examSubjectSlice'
import { useDispatch } from 'react-redux'

function App() {
  
  const dispatch = useDispatch()

  useEffect(() => {
    // get the examCategories -> get all the subjects
    async function fetchExamAndSub() {
      // get all categories
      let res = await appwriteServices.getExamCategories()
      let ExamAndSub = res.documents

      // get subjects for each category id and save it into ExamAndSub
      for (let i = 0; i < ExamAndSub.length; i++) {
        let sub = await appwriteServices.getSubjects(ExamAndSub[i].$id)
        ExamAndSub[i]["Subjects"] = sub.documents
        
      }
      
      // console.log(ExamAndSub);
      //saving exam and subjects into state
      dispatch(setExamAndSubject(ExamAndSub))
    }
    fetchExamAndSub()
  })
  return (
    <div id='body'>
      <Header />
      <main className='flex-grow'>
        {/* <Loader/> */}
        <Outlet />
        {/* <ResultPage/> */}
      </main>
      <Footer />

    </div>
  )
}

export default App
