import React, { useEffect, useState } from 'react'
import Container from '../Container'
import QuestionIndex from '../buttons/QuestionIndex'
import { questionSet } from '../question/question'
import { useDispatch, useSelector } from 'react-redux'
import { addResponse, clearResponse, createResponseSheet, endTest } from '../../store/responseSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Countdown from '../timer/Countdown'
import { BiDownArrow, BiUpArrow } from "react-icons/bi";


function TestPage() {
    // const questions = questionSet // questionSet is an array of questions.
    const [quesNum, setQuesNum] = useState(0)
    const [disable, setDisable] = useState(false)
    const [showQuestionPallete, setShowQuestionPallete] = useState(true)
    const [testStarted, setTestStarted] = useState(false)
    let prevResponse = useSelector((state) => state.responseSheet[quesNum]) // if question is already answered it will return the optionId answered.
    let testActive = useSelector((state) => state.testActive) // if question is already answered it will return the optionId answered.
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { slug } = useParams()


    const questions = questionSet[slug]?.questions
    const duration = questionSet[slug]?.duration

    const previousQues = () => {
        // if (quesNum > 0) {
        //     setQuesNum((prev) => (prev - 1))
        // }
        // else {
        //     return
        // }
        (quesNum > 0) ? setQuesNum((prev) => (prev - 1)) : ''
    }

    const nextQues = () => {
        // if (quesNum < (questions.length - 1)) {
        //     setQuesNum((prev) => (prev + 1))
        // }
        // else {
        //     return
        // }
        ((questions.length - 1) > quesNum) ? setQuesNum((prev) => (prev + 1)) : ''
    }

    const clear = () => {
        dispatch(clearResponse({ quesNum }))
    }

    const questionIndexClick = (value) => {
        setQuesNum(value - 1)
    }

    const handleSubmit = () => {
        if (confirm('Are you sure you want to submit ? \n Click on "OK" to submit')) navigate('/result-page')
        else return

    }

    const handleBeforeUnload = (event) => {
        // Cancel the event
        event.preventDefault();
        // Chrome requires returnValue to be set
        event.returnValue = '';
        // Perform actions before unloading the page
    };

    const disableFunc = () => {
        setDisable(true)
    }

    // useEffect(() => {
    // }, [])

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        if (questions) {
            dispatch(createResponseSheet({ length: questions.length, questions }))
            if (!testActive) navigate('/')
        }
        else {
            alert('Test Not found')
            navigate('/')
        }
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            dispatch(endTest())
        };
    }, []);

    return (
        <Container>
            {
                testStarted
                    ? (<div className='flex flex-col min-h-[85vh]'>
                        <div className='flex flex-col-reverse sm:flex-row p-4'>

                            {/* QUESTION AREA */}
                            <div className=' sm:w-3/4 border-2'>
                                <div className='m-2 flex gap-2 pb-2 border-b-2'>
                                    <div>Q{quesNum + 1}.</div>
                                    <div>
                                        <div className='text-lg font-semibold'>
                                            {questions[quesNum]?.question}
                                        </div>
                                        <div>
                                            {/* this is image area */}
                                        </div>
                                    </div>

                                </div>
                                <div className='m-2'>
                                    {/* OPTIONS */}
                                    <div>
                                        {
                                            questions[quesNum]?.options?.map((item) => (
                                                <div key={item.optionId}>
                                                    <input id={item.optionId} value={item.optionId} type='radio' name='options'
                                                        onChange={(e) => { dispatch(addResponse({ quesNum, response: e.target.value })) }}
                                                        checked={prevResponse === item.optionId} disabled={disable}
                                                    />
                                                    <label htmlFor={item.optionId}> {item.option}</label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* QUESTION PALLETE */}
                            <div className='sm:w-1/4 border-2'>
                                <div>
                                    <div className='border-b-2'>
                                        <div className='flex text-xl border-b-2 justify-center'>
                                            <h1 className=''>Question Pallete</h1>
                                            <span className='flex items-center mx-4 ' onClick={()=>{setShowQuestionPallete((prev)=>!prev)}} >{showQuestionPallete ? <BiUpArrow /> : <BiDownArrow />}</span>
                                        </div>

                                        <div className={`flex flex-wrap justify-center m-4 p-2 gap-2 duration-400 ${showQuestionPallete ?'':'hidden'}`}>
                                            {/* <QuestionIndex /> */}

                                            {questions.length && questions?.map((item, index) => <QuestionIndex key={item?.questionId}
                                                quesId={item?.questionId} quesNum={index + 1} active={quesNum == index}
                                                onClickFunc={questionIndexClick} />)}

                                        </div>
                                    </div>
                                    <div className={`${showQuestionPallete ?'':'hidden'} duration-200`}>
                                        <h1 className='text-center text-xl border-b-2'> Informations</h1>
                                        <div className='flex flex-wrap m-4 p-2 gap-y-4'>
                                            <div className='text-left'>
                                                <span className={`rounded-full border-2 w-10 text-center py-1 px-3 bg-orange-200 `}
                                                >{'1'}</span> <span> Question is active.</span>
                                            </div>
                                            <div>
                                                <span className={`rounded-full border-2 w-10 text-center py-1 px-3 bg-green-200 `}
                                                >{'1'}</span> <span> Question is answered.</span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <Countdown duration={{ ...duration }} disableFunc={disableFunc} />
                                </div>

                            </div>
                        </div>

                        {/* CONTROLL PANNEL */}
                        <div className='mt-auto sm:flex border-t-2 pt-2'>
                            <div className='flex justify-between sm:w-3/4 mb-2 '>
                                <button className='text-white text-lg md:w-24 p-2 border-2 rounded-md bg-cyan-500' disabled={quesNum == 0 || disable}
                                    onClick={previousQues}
                                >
                                    {'<'}Previous
                                </button>

                                <button className='text-white text-lg md:w-24 p-2 border-2 rounded-md bg-red-500'
                                    onClick={clear} disabled={disable}
                                >
                                    Clear
                                </button>
                                <button className='text-white text-lg md:w-24 p-2 border-2 rounded-md bg-green-500'
                                    onClick={nextQues} disabled={disable}
                                >
                                    Next{'>'}
                                </button>
                            </div>
                            <div className='sm:w-1/4 flex justify-center mb-2'>
                                <button className='text-lg text-white w-2/3 p-2 border-2 rounded-md bg-blue-500'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>)
                    : (
                        <div>{
                            questions && (
                                <div className='border-2 shadow-md p-2 my-2'>
                                    <h2 className='text-2xl font-semibold border-b-2  border-black inline-block text-orange-600'>Test Instructions:</h2>
                                    <div className='px-2 my-2'>
                                        <li>Total number of questions: <span className='font-bold'>{questions.length}</span>.</li>
                                        <li>Time allotted: <span className='font-bold'>{duration.hr ? duration.hr + " hr " : ''} {duration.min ? duration.min + " minute " : ''}</span> </li>
                                        <li> For each  <span className='text-lg text-green-600 font-bold'>correct answer +4</span> marks will be rewarded.</li>
                                        <li> For each <span className='text-lg text-red-600 font-bold'>wrong answer -1</span> mark will be deducted.</li>
                                        <li><span className='text-lg text-red-700 font-bold'>DO NOT refresh the page OR press back button.</span></li>
                                        <li><span className='text-lg text-green-700 font-bold'>All the best!</span></li>
                                    </div>
                                    <div>
                                        <button className='text-lg text-white w-48 block mx-auto border-2 rounded-md bg-blue-500'
                                            onClick={() => { setTestStarted(true) }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        </div>
                    )
            }

        </Container >

    )
}

export default TestPage


//
//
//
// 