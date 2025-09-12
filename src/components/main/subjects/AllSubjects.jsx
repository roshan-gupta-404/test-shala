import React from 'react'
import Container from '../../Container'
import { Link } from 'react-router-dom'
import { subjects } from '../../question/question'
function AllSubjects({ Subjects }) {
    // console.log(Subjects);// SUBJECT IS AN ARRAY OF SUBJECT, ID, etc.. ( [{},{},{}...])

    return (
        <div className='flex justify-center sm:justify-start flex-wrap gap-10'>
            {Subjects?.map((subject) => (
                <Link to={`/test-list/${subject?.$id}_${subject?.SubjectName}`} key={subject?.$id}>
                    <div className="px-5">
                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{subject?.SubjectName}</h5>
                    </div>
                </Link>
            ))}

        </div>
    )
}

export default AllSubjects