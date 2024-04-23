import React from 'react'

function Container({children}) {
  return (
    <div className='max-w-screen-2xl mx-auto px-2'>
    {children}
    </div>
  )
}

export default Container