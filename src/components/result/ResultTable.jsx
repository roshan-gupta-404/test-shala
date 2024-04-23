import React from 'react'
// let data = []

function ResultTable({ questions, response }) {
  console.log(questions);
  console.log(response);
  return (
    <div className=''>


      <div className="relative overflow-x-auto">


        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" py-3 text-center">
                Question No.
                </th>
                <th scope="col" className=" py-3 text-center">
                  Correct Option
                </th>
                <th scope="col" className=" py-3 text-center">
                  Marked Option
                </th>
              </tr>
            </thead>
            <tbody className='h-80 overflow-hidden'>
              {questions.map((question, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={question.questionId}>
                <th scope="row" className=" py-2 text-lg font-serif text-gray-900 whitespace-nowrap dark:text-gray-400 text-center">
                {index + 1}
                </th>
                <td className=" py-2 text-center">
                {question.correctOptionId.slice(-1)}
                </td>
                <td className=" py-2 text-center">
                {response[index]?.slice(-1)}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default ResultTable


//<div className=''>
// <table>
//   <thead>
//     <tr>
//       <th>Question No.</th>
//       <th>Marked Option</th>
//       <th>Correct Option</th>
//     </tr>
//   </thead>
//   <tbody>
// {questions.map((question , index) => (
//   <tr key={question.qustionId}>
//     <td>{index+1}</td>
//     <td>{response[index]}</td>
//     <td>{question.correctOptionId}</td>
//     {/* <td>{questions.correctOptionId.map((option)=>option)}</td> */}
//   </tr>
// ))}
//   </tbody>
// </table>
// </div>