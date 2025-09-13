import React, { useEffect, useState } from 'react'

function Countdown({ duration, disableTestFunc, }) {
    const [timeLeft, setTimeLeft] = useState(duration * 60); // store in seconds
    const [timeup, setTimeup] = useState(false)

    const hr = Math.floor(timeLeft / 3600);
    const min = Math.floor((timeLeft % 3600) / 60);
    const sec = timeLeft % 60;
    
    if(!timeLeft) setTimeout(()=>(disableTestFunc()),500)
    
    useEffect(()=>{
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if(!(prev - 1)) clearInterval(timer)
                return Math.max(prev - 1, 0);
            });
        }, 1000);
        !timeLeft?clearInterval(timer):''
        return ()=>{
            clearInterval(timer)

        }
    },[])

    return (
        <div>
            <div className='flex justify-center bg-red-200 text-xl font-semibold'>
                {/* <span>{hr}</span> : <span>{min}</span> : <span>{sec}</span> */}
                {hr<10?'0'+hr:hr} : {min<10?'0'+min:min} : {sec<10?'0'+sec:sec}
            </div>
        </div>
    )
}

export default Countdown