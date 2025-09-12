import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';

const TimeUp = ({ handleNavigateToTestResult}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer); 
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    setTimeout(() => {
      handleNavigateToTestResult();
    }, 300);
  };

  return (
    <div className={` flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300 `}>
      <div className={`bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 `}>
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-t-2xl p-6 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Time's Up!</h2>
          <p className="text-orange-100">Test has been completed</p>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            <span className="text-gray-700">Your responses have been saved</span>
          </div>

          <div className="bg-orange-50 rounded-xl p-4 mb-6">
            <p className="text-gray-700 mb-2">
              You will be redirected to result page in
            </p>
            <div className="text-3xl font-bold text-orange-500 mb-2">
              {countdown}
            </div>
            <p className="text-sm text-gray-600">seconds automatically</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={handleRedirect}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center group"
            >
              <span>View Result Now</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeUp;