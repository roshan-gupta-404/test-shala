import React from 'react'

function Container({children}) {
  return (
    <div className='bg-gradient-to-br from-orange-50 to-red-50'>
    {children}
    </div>
  )
}

export default Container