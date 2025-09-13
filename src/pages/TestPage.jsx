import React, { useEffect, useState } from 'react'
import Container from '../components/Container'
import QuestionIndex from '../components/buttons/QuestionIndex'
import { questionSet } from '../question'
import { useDispatch, useSelector } from 'react-redux'
import { addResponse, clearResponse, createResponseSheet, endTest, removeResponse } from '../store/responseSlice'
import { useNavigate, useParams } from 'react-router-dom'
import Countdown from '../components/timer/Countdown'
import { BiDownArrow, BiUpArrow } from "react-icons/bi";
import TimeUp from '../components/TimeUp'


function TestPage() {
    const { testPaperID } = useParams()
    const [quesNum, setQuesNum] = useState(0)
    const [disableTest, setDisableTest] = useState(false) // to disable the test as well as prev, clear and next button once timeup.
    const [showQuestionPallete, setShowQuestionPallete] = useState(true)
    const [testStarted, setTestStarted] = useState(false) //if tesstStarted is true, it will load the question sheet
    let prevResponse = useSelector((state) => state.responseData.responseSheet[quesNum]) // if question is already answered it will return the answered optionId for the purpose of selecting answered option in options.
    let testActive = useSelector((state) => state.responseData.testActive) // if question is already answered it will return the optionId answered.
    const testPaper = useSelector((state) => state.testPapersData.data.find((paper) => paper.$id === testPaperID))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    prevResponse = new Set(prevResponse) // CONVERTING RESPONSE ARRAY TO SET


    const questions = testPaper?.Questions && JSON.parse(testPaper?.Questions)
    const duration = parseInt(testPaper?.Duration)
    const testPaperName = testPaper?.Name
    const testEndTime = useSelector((state) => state.responseData.testEndTime)


    const previousQues = () => {
        (quesNum > 0) ? setQuesNum((prev) => (prev - 1)) : ''
    }

    const nextQues = () => {
        ((questions.length - 1) > quesNum) ? setQuesNum((prev) => (prev + 1)) : ''
    }

    const clear = () => {
        dispatch(clearResponse({ quesNum }))
    }

    const questionIndexClick = (value) => {
        disableTest ? '' : setQuesNum(value - 1) // if test is not disable then let the user navigate through questions
    }

    const handleSubmit = () => {
        if (confirm('Are you sure you want to submit ? \n Click on "OK" to submit')) navigate(`/result-page/${testPaperID}`)
        else return

    }

    const handleNavigateToTestResult = () => {
        navigate(`/result-page/${testPaperID}`)
    }

    const handleBeforeUnload = (event) => {
        // Cancel the event
        event.preventDefault();

        // Chrome requires returnValue to be set
        //Required by some browsers(e.g., Chrome) to show a warning popup before leaving the page.
        //The user will see a confirmation dialog like: "Are you sure you want to leave this site?"
        event.returnValue = '';

        // Perform actions before unloading the page
    };

    const disableTestFunc = () => {
        setDisableTest(true)
    }

    const handleOptionClick = (e) => {
        if (e.target.checked) dispatch(addResponse({ quesNum, response: e.target.value }))
        else dispatch(removeResponse({ quesNum, response: e.target.value }))


    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload); // adding this event on mounting of this page
        if (questions) {
            if (!testActive) navigate('/') // if test is not active, means user is directly came to this page then take the user to home page.
            else dispatch(createResponseSheet({ length: questions.length, questions, testPaperName , duration})) // creating response sheet of length equal to number of questions
        }
        else {
            alert('Test Not found')
            navigate('/')
        } // if questions not found take the user to home page.

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            dispatch(endTest())
        };

    }, []);

    return (
        <Container>
            {
                testStarted
                    ?
                    disableTest
                        ? <TimeUp handleNavigateToTestResult={handleNavigateToTestResult} />
                        : (<div className='flex flex-col min-h-[85vh]'>
                            <div className='flex flex-col-reverse sm:flex-row p-4'>

                                {/* QUESTION AREA */}
                                <div className=' sm:w-3/4 border-2'>
                                    <div className='m-2 flex gap-2 pb-2 border-b-2'>
                                        <div>Q{quesNum + 1}.</div>
                                        <div>
                                            <div className='text-lg font-semibold'>
                                                {questions[quesNum]?.question.problemStatement}
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
                                                questions[quesNum]?.answerChoices?.map((item) => (
                                                    <div key={item.optionID}>
                                                        <input id={item.optionID} value={item.optionID} type='checkbox' name={item.optionID}
                                                            onChange={handleOptionClick}
                                                            checked={prevResponse.has(item.optionID)} disabled={disableTest}
                                                        // it will select the option which is answered.
                                                        />
                                                        <label htmlFor={item.optionID}> {item.Option}</label>
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
                                                <span className='flex items-center mx-4 '
                                                    onClick={() => { setShowQuestionPallete((prev) => !prev) }} >{showQuestionPallete ? <BiUpArrow /> : <BiDownArrow />}</span>
                                            </div>

                                            <div className={`flex flex-wrap justify-center m-4 p-2 gap-2 duration-400 ${showQuestionPallete ? '' : 'hidden'}`}>
                                                {/* <QuestionIndex /> */}

                                                {questions.length && questions?.map((item, index) =>
                                                    <QuestionIndex
                                                        key={item?.questId}
                                                        quesId={item?.questId}
                                                        quesNum={index + 1}
                                                        active={quesNum == index}
                                                        onClickFunc={questionIndexClick}
                                                    />)}

                                            </div>
                                        </div>
                                        <div className={`${showQuestionPallete ? '' : 'hidden'} duration-200`}>
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
                                        <Countdown duration={duration} disableTestFunc={disableTestFunc} testEndTime={testEndTime} />
                                    </div>

                                </div>
                            </div>


                            {/* CONTROLL PANNEL */}
                            <div className='mt-auto sm:flex border-t-2 pt-2'>
                                <div className='flex justify-between sm:w-3/4 mb-2 '>
                                    <button className='text-white text-lg md:w-24 p-2 border-2 rounded-md bg-cyan-500' disabled={quesNum == 0 || disableTest}
                                        onClick={previousQues}
                                    >
                                        {'<'}Previous
                                    </button>

                                    <button className='text-white text-lg md:w-24 p-2 border-2 rounded-md bg-red-500'
                                        onClick={clear} disabled={disableTest}
                                    >
                                        Clear
                                    </button>
                                    <button className='text-white text-lg md:w-24 p-2 border-2 rounded-md bg-green-500'
                                        onClick={nextQues} disabled={disableTest}
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
                        <div>
                            {/* Test Instructions */}
                            {
                                questions && (
                                    <div className=' shadow-md p-2 '>
                                        <h2 className='text-2xl font-semibold border-b-2  border-black inline-block text-orange-600'>Test Instructions:</h2>
                                        <div className='px-2 my-2'>
                                            <li>Total number of questions: <span className='font-bold'>{questions.length}</span>.</li>
                                            <li>Time allotted: <span className='font-bold'>{duration ? duration + " Minutes " : ''}</span> </li>
                                            <li> For each  <span className='text-lg text-green-600 font-bold'>correct answer +4</span> marks will be rewarded.</li>
                                            <li> For each <span className='text-lg text-red-600 font-bold'>wrong answer -1</span> mark will be deducted.</li>
                                            <li><span className='text-lg text-red-700 font-bold'>DO NOT refresh the page OR press back button.</span></li>
                                            <li><span className='text-lg text-green-700 font-bold'>All the best!</span></li>
                                        </div>
                                        <div>
                                            <button className='text-lg text-white w-48 block mx-auto border-2 rounded-md bg-blue-500'
                                                onClick={() => { setTestStarted(true) }}
                                            >
                                                Start
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