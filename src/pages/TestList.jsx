import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Container from '../components/Container'
import { useParams } from 'react-router-dom'
import { questionBank } from '../components/question/question'
import { useDispatch, useSelector } from 'react-redux'
import { startTest } from '../store/responseSlice'
import { setTestPapers } from '../store/testPapersSlice'
import appwriteServices from '../appwrite/crud'
import { ChevronRight, Clock, FileText, Filter, Users } from 'lucide-react';
function TestList() {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [subjectID, subjectName] = slug.split('_')
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [loading, setLoading] = useState(true)
    const testPapers = useSelector((state) => { return state.testPapersData.data })

    const filteredTests = selectedDifficulty === 'all'
        ? testPapers
        : testPapers.filter(testPaper => testPaper.Difficulty === selectedDifficulty);
    const availableDifficulties = ['all', 'easy', 'medium', 'hard', 'mix'];

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return 'bg-green-100 text-green-700 border-green-200';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'hard': return 'bg-red-100 text-red-700 border-red-200';
            case 'mix': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    useEffect(() => {
        appwriteServices.getTestPapers(subjectID)
            .then((res) => {
                dispatch(setTestPapers(res.documents))
                setLoading(false)

            })
            .catch((err) => {
                console.log("Some error occured");
            })
    }, [])

    return (
        <div className=''>
            <Container>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {subjectName} <span className="text-orange-500">Tests</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Practice with carefully curated {subjectName.toLowerCase()} test papers designed to help you master key concepts and improve your problem-solving skills.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <Filter className="w-5 h-5 text-gray-400" />
                                <span className="font-medium text-gray-700">Filter by Difficulty:</span>
                                <div className="flex space-x-2">
                                    {availableDifficulties.map((difficulty) => (
                                        <button
                                            key={difficulty}
                                            onClick={() => setSelectedDifficulty(difficulty)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedDifficulty === difficulty
                                                ? 'bg-orange-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-sm text-gray-500">
                                Showing {filteredTests.length} tests
                            </div>
                        </div>
                    </div>

                    {/* Test Cards Grid */}
                    {loading
                        ? (<div className="text-center py-12">
                            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-500 mb-2">Loading Tests...</h3>
                            <p className="text-gray-400">Thanks for your patience!</p>
                        </div>)
                        : (<><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTests.map((testPaper) => (
                                <div
                                    key={testPaper.$id}
                                    onClick={() => {
                                        dispatch(startTest())
                                        navigate(`/test-page/${testPaper.$id}`)
                                    }}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden group relative"
                                >
                                    {/* Gradient Top Bar */}
                                    <div className="h-2 bg-gradient-to-r from-orange-400 to-red-500"></div>

                                    <div className="p-6">
                                        {/* Header with difficulty badge */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                                                    {testPaper.Name}
                                                </h3>
                                            </div>

                                            {/* Difficulty Badge */}
                                            <div className="flex items-center text-yellow-500 ml-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor((testPaper?.Difficulty).toLowerCase())}`}>
                                                    {testPaper?.Difficulty.charAt(0).toUpperCase() + testPaper?.Difficulty.slice(1)}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Test Info */}
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center text-gray-600">
                                                <FileText className="w-4 h-4 mr-2 text-orange-500" />
                                                <span className="text-sm">{testPaper.NumberOfQuestions} Questions</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <Clock className="w-4 h-4 mr-2 text-orange-500" />
                                                <span className="text-sm">{testPaper.Duration} Minutes</span>
                                            </div>
                                        </div>

                                        {/* Attempts */}
                                        <div className="flex items-center text-gray-500 text-sm mb-4">
                                            <Users className="w-4 h-4 mr-2" />
                                            <span>{testPaper.Attempts?.toLocaleString()} students attempted</span>
                                        </div>

                                        {/* Start Test Button */}
                                        <div className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 ransition-colors">
                                            <span>Start Test</span>
                                            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                                        </div>
                                    </div>

                                    {/* Sliding Take Test Button */}
                                    <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center font-semibold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                                        <span>Take Test</span>
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </div>
                                </div>
                            ))}
                        </div>
                            {/* Empty State */}
                            {filteredTests.length === 0 && (
                                <div className="text-center py-12">
                                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-medium text-gray-500 mb-2">No tests found</h3>
                                    <p className="text-gray-400">Try adjusting your filters to see more tests.</p>
                                </div>
                            )}</>
                        )
                    }
                </div>

            </Container>
        </div>
    )
}

export default TestList