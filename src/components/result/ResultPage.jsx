import React, { useEffect, useState } from 'react'
import { Trophy, Target, TrendingUp, TrendingDown, CheckCircle, XCircle, } from 'lucide-react';
import Container from '../Container'
import ResultTable from './ResultTable'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import crud from '../../appwrite/crud'

function ResultPage() {
  const { testPaperID } = useParams()
  const [answerKeySheet, setAnswerKeySheet] = useState()
  const [marksPerQues, setMarksPerQues] = useState(null)
  const navigate = useNavigate()

  const questions = useSelector((state) => state.responseData.questionSet)
  const response = useSelector((state) => state.responseData.responseSheet)
  const testPaperName = useSelector((state) => state.responseData.testPaperName)

  const totalMarks = questions.length * 4
  let correctAnswers = 0
  let wrongAnswers = 0
  let unattempted = 0

  if (marksPerQues) {
    for (let i = 0; i < marksPerQues.length; i++) {
      if (marksPerQues[i] === 4) correctAnswers += 1
      else if (marksPerQues[i] === -1) wrongAnswers += 1
      else if (marksPerQues[i] === 'Unattempted') unattempted += 1
    }
  }

  let totalMarksObtained = (correctAnswers * 4 - wrongAnswers)


  const percentageScore = parseFloat(((totalMarksObtained < 0 ? 0 : totalMarksObtained) / totalMarks * 100).toFixed(2))

  useEffect(() => {
    // getting answer sheet
    async function getAnswerSheet() {
      if (testPaperID && response.length) {
        let marksArr = Array.from({ length: response.length }).fill(0)

        const fetchedData = await crud.getAnswerSheet(testPaperID)
        let answerKeySheet = JSON.parse(fetchedData.documents[0].CorrectOptions)

        // CALCULATING MARKS 
        for (let i = 0; i < questions.length; i++) {
          if (response[i].length !== 0) {
            if (response[i].length > 1 && response[i].length === answerKeySheet[i]?.optionID.length) {
              const correctOptionSet = new Set(answerKeySheet[i]?.optionID);
              const responseSet = new Set(response[i]);
              for (const item of responseSet) {
                if (correctOptionSet.has(item)) {
                  marksArr[i] += 2;
                }
                else {
                  marksArr[i] = -1;
                  break
                }
              }
            }
            else {
              if (response[i][0] === answerKeySheet[i]?.optionID[0]) {
                marksArr[i] = 4;
              }
              else {
                marksArr[i] = -1;
              }
            }

          }
          else {
            marksArr[i] = 'unattempted'
          }
        }
        setAnswerKeySheet(answerKeySheet)
        setMarksPerQues(marksArr)

      }
    }

    getAnswerSheet();

  }, [])

  return (
    <Container>
      {
        marksPerQues &&
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">

            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Test <span className="text-orange-500">Result</span>
                </h1>
                <h2 className="text-xl text-gray-600 font-medium">{testPaperName}</h2>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end mb-2">
                  <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">{percentageScore}%</span>
                </div>
                <p className="text-sm text-gray-600">Overall Score</p>
              </div>
            </div>
          </div>

          {/* Marks Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Score Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Total Score</h3>
                <Target className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  {correctAnswers * 4 - wrongAnswers}/{totalMarks}
                </div>
                <div className="text-gray-600 mb-4">Marks Scored</div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${percentageScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Positive Marks */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Positive Marks</h3>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">+{correctAnswers * 4}</div>
                <div className="text-sm text-gray-600">{correctAnswers} Correct</div>
              </div>
            </div>

            {/* Negative Marks */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Negative Marks</h3>
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">{wrongAnswers ? `-${wrongAnswers}` : '0'}</div>
                <div className="text-sm text-gray-600">{wrongAnswers} Wrong</div>
              </div>
            </div>
          </div>
          <ResultTable questions={questions} response={response} answerKeySheet={answerKeySheet} marksPerQues={marksPerQues} />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              onClick={() => {navigate(`/`)}}
              className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-xl font-semibold hover:bg-orange-500 hover:text-white transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      }

    </Container>
  )
}

export default ResultPage