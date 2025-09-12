import React from 'react'
import Container from '../components/Container'
import TestList from './TestList'
import AllSubjects from '../components/main/subjects/AllSubjects'
import { examCategories } from '../components/question/question'
import { useSelector } from 'react-redux'
import * as Icons from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom'

function Home() {
  const ExamAndSub = useSelector((state) => { return state.examAndSubjectData.data })

  return (
    <>
      <Container>
        {/* HERO BANNER START */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                Test<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Shala</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-4 font-medium">
                Practice. Prepare. Perform.
              </p>
              <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
                Master your exams with our comprehensive demo tests. Practice with real exam patterns and boost your confidence.
              </p>
              <a
                href='#categories'
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Test
                <ChevronRight className="inline w-5 h-5 ml-2" />
              </a>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-red-200 rounded-full opacity-30 blur-2xl"></div>
        </section>
        {/* HERO BANNER END */}

        {/* EXAM CATEGORIES START */}
        <section id='categories' className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Exam Categories</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Choose from our wide range of exam categories and start practicing with subject-wise tests
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {ExamAndSub.map((data, index) => {
                const Icon = Icons[data.Icon]
                return (
                  <div
                    key={data?.ExamCategoryName}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 border border-gray-100 overflow-hidden group relative"
                  >
                    <div className={`h-2 bg-gradient-to-r ${index % 2 ? 'from-orange-500 to-amber-500' : 'from-orange-400 to-red-500'}`}></div>

                    <div className="p-8">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${index % 2 ? 'from-orange-500 to-amber-500' : 'from-orange-400 to-red-500'} rounded-xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform duration-200`}>
                          {<Icon />}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{data?.ExamCategoryName}</h3>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {data?.Description}
                      </p>

                      <div className="mb-8">
                        <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">Subjects:</h4>
                        <div className="flex flex-wrap gap-2">
                          {data.Subjects.map((subject) => (
                            <Link to={`/test-list/${subject?.$id}_${subject?.SubjectName}`} key={subject?.$id}>
                              <span
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors duration-200"
                              >
                                {subject?.SubjectName}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sliding Explore Button - positioned behind the card */}
                    {/* <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center font-semibold transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                      <span>Explore</span>
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </div> */}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
        {/* EXAM CATEGORIES END */}

        {/* STATS STARTS*/}
        <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-orange-100">Free Practice Tests</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Zero Hassle</div>
              <div className="text-orange-100">No Registration Required</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">Instant</div>
              <div className="text-orange-100">Feedback & Results</div>
            </div>
          </div>
        </div>
      </section>
        {/* STATS END */}
      </Container>
    </>
  )
}

export default Home