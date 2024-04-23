import React from 'react'
import Container from '../Container'
import ResultTable from './ResultTable'
import { useSelector } from 'react-redux'

function ResultPage() {
  const questions = useSelector((state) => state.questionSet)
  const response = useSelector((state) => state.responseSheet)
  const testActive = useSelector((state)=>state.testActive)
  console.log(testActive);
  let positiveMarking = 0
  let negativeMarking = 0

  // CALCULATING MARKS 
  for (let i = 0; i < questions.length; i++) {
    if (response[i] !== null) {
      if (questions[i]?.correctOptionId === response[i]) positiveMarking += 4;
      else negativeMarking += -1;
    }
  }
  // console.log(questions);
  // console.log(response);
  return (
    <Container>
      <div className='text-center m-4'>
        <h3 className='text-2xl m-2'>Your Test Result</h3>
        <div className='sm:flex'>
          <div className='sm:w-2/3'>
            <ResultTable questions={questions} response={response} />
          </div>
          <div className='m-4 sm:w-1/3 text-left'>
            <span className='text-xl block'>Positive Mraking: <span className='font-semibold'>{positiveMarking}</span></span>
            <span className='text-xl block'>Negative Mraking: <span className='font-semibold'>{negativeMarking}</span></span>
            <span className='text-2xl block'>Total: <span className='font-extrabold text-'>{positiveMarking + negativeMarking}</span></span>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ResultPage