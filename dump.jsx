import React, { useEffect, useState } from 'react'

function Countdown({ duration, disableTestFunc }) {
    const [hr, setHr] = useState(parseInt(0/60))
    const [min, setMin] = useState(parseInt(0))
    const [sec, setSec] = useState(10)
    const [timeup, setTimeup] = useState(false)

    

    const updateTime = ()=>{
        if(sec==0){
            if(min==0){
                if(hr == 0){
                    setTimeup(true)
                }
                else{
                    setSec(59)
                    setMin(59)
                    setHr((prev)=>(prev-1))
                }
            }
            else{
                setSec(59)
                setMin((prev)=>(prev-1))
            }
        }
        else{
            setSec((prev)=>(prev-1))
        }
    }

    if(timeup) setTimeout(()=>(disableTestFunc()),500)
    
    
    useEffect(()=>{
        const interval = setInterval(() =>updateTime(), 1000);
        timeup?clearInterval(interval):''
        return ()=>{
            clearInterval(interval)
            console.log('cleared');

        }
    },[sec, hr, min,timeup])

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