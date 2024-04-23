import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../Container'
import { useParams } from 'react-router-dom'
import { questionBank } from '../question/question'
import { useDispatch } from 'react-redux'
import { startTest } from '../../store/responseSlice'

function TestList() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(questionBank[slug]?.questionSetList);
  return (
    <div className='my-4'>
      <Container>
        {
          questionBank[slug] ? (
            <>
              <div>
                <h2 className='text-2xl font-semibold'>{questionBank[slug].subjectName}</h2>
              </div>
              <div className='my-2 p-2 border-2'>
                <h3 className='text-xl'>General Questions</h3>
                {questionBank[slug].questionSetList.map((questionSet) => (
                  <div className='flex justify-around border-2 shadow-md my-4  hover:bg-slate-200 duration-300 cursor-pointer'
                    key={questionSet.questionSetId}
                    onClick={() => {
                      dispatch(startTest())
                      navigate(`/test-page/${questionSet.questionSetId}`)
                    }}
                  >
                    <div className='flex text-lg w-1/2 px-5'>{questionSet.questionSetName}</div>
                    <div className='w-1/2'></div>
                  </div>
                ))}
              </div>
            </>
          )
          : (<><h3 className='text-3xl text-center'> Adding Test Soon.</h3></>)
        }

      </Container>
    </div>
  )
}

export default TestList