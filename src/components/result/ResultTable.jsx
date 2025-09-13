import { CheckCircle, XCircle } from 'lucide-react';
import React from 'react'
// let data = []

function ResultTable({ questions, response, answerKeySheet, marksPerQues }) {


  const getStatusColor = (status) => {
    switch (status) {
      case 4: return 'text-green-600 bg-green-50';
      case -1: return 'text-red-600 bg-red-50';
      case 'unattempted': return 'text-gray-500 bg-gray-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 4: return <><CheckCircle className="w-4 h-4" /><span className="ml-2 capitalize">{"correct"}</span></>;
      case -1: return <><XCircle className="w-4 h-4" /><span className="ml-2 capitalize">{"wrong"}</span></>;
      case 'unattempted': return <><div className="w-4 h-4 rounded-full border-2 border-gray-400"></div><span className="ml-2 capitalize">{"unattempted"}</span></>;
      default: return null;
    }
  };


  return (
    // Detailed Marks Table
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Question-wise Analysis</h3>
        <p className="text-gray-600 mt-2">Detailed breakdown of your performance for each question</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question #
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Correct Option
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Your Answer
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marks
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {answerKeySheet.map((question, index) => (
              <tr key={question.questId} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                      {index + 1}
                    </div>
                  </div>
                </td>
                {/* Correct Option */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-700">
                    {(question?.optionID).join(', ')}
                  </div>
                </td>
                {/* Your Answer */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {response[index].length ? (
                    <div className={`w-16 h-8 rounded-full flex items-center justify-center text-sm font-bold ${marksPerQues[index] === 4 ? 'bg-green-100 text-green-700' : marksPerQues[index] === -1 ? 'bg-red-100 text-red-700' :""
                      }`}>
                      {response[index]?.join(', ')}
                    </div>
                  ) : (
                    <div className="w-16 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 font-extrabold text-lg">--</span>
                    </div>
                  )}
                </td>
                {/* Marks */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`w-16 flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${marksPerQues[index] === 4 ? 'bg-green-100 text-green-700' :
                    marksPerQues[index] === -1 ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                    {marksPerQues[index] === 4 ? `+${marksPerQues[index]}` : marksPerQues[index] === -1 ? `${marksPerQues[index]}` : '0'}
                  </span>
                </td>
                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(marksPerQues[index])}`}>
                    {getStatusIcon(marksPerQues[index])}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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