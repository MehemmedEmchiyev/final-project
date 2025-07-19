import React from 'react'

function CardSkeleton() {
  return (
    <div className='h-max'>
        <div className='w-full h-full'>
            <div className="w-full animate-pulse h-full rounded-md overflow-hidden">
                <div className="h-75 rounded-t dark:bg-gray-500"></div>
            </div>
            <div className="py-2 space-y-1">
                <div className="w-full h-6 rounded dark:bg-gray-500"></div>
                <div className="w-full h-6 rounded dark:bg-gray-500"></div>
                
            </div>
        </div>
    </div>
  )
}

export default CardSkeleton