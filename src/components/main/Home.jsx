import React from 'react'
import Container from '../Container'
import TestList from '../test/TestList'
import AllSubjects from './subjects/AllSubjects'
import { examCategories } from '../question/question'

function Home() {
  return (
    <Container>
      <div className='m-2'>
        {examCategories.map((category) => (
          <div className='border-2 shadow-md  p-4 m-2' key={category.catId}>
            <div className=''>
              <h2 className='text-xl font-semibold text-orange-500 inline-block mb-4'>{category?.catName}</h2>
            </div>
            <div>
              <AllSubjects catId = {category?.catId} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default Home