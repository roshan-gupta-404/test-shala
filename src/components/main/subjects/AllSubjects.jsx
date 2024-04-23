import React from 'react'
import Container from '../../Container'
import { Link } from 'react-router-dom'
import { subjects } from '../../question/question'
function AllSubjects({catId}) {
    console.log(subjects[catId]);
    return (
        <div className='flex flex-wrap gap-10'>
        {subjects[catId]?.map((subject)=>(
            <Link to={`/test-list/${subject.subjectId}`} key={subject.subjectId}>
                <div className="max-w-sm w-64 h-72 bg-white border hover:scale-105 overflow-hidden duration-300 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className='flex justify-center p-2 '>
                    <img className="rounded-t-lg w-60 h-60" src={subject.subjectImg} alt="" />
                    </div>
                    <div className="px-5">
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{subject.subjectName}</h5>
                    </div>
                </div>
            </Link>
        ))}
            
        </div>
    )
}

export default AllSubjects