import React from 'react'
import { useSelector } from 'react-redux'

function QuestionIndex({quesNum , quesId, active, onClickFunc}) {
  const isResponded = useSelector((state)=>state.responseSheet[quesNum-1])
  return (
    <div className={`rounded-full border-2 w-10 text-center py-1 hover:bg-slate-200 cursor-pointer ${active?'bg-orange-200':(isResponded?'bg-green-200':'')}`} key={quesId}
    onClick={()=>{onClickFunc(quesNum)}}
    >{quesNum}</div>
  )
}

export default QuestionIndex