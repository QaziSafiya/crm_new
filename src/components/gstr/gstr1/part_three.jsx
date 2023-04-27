import React from 'react'

const part_three = () => {

  const cardsTitles = ["Available for download"]

  return (
    <div>
      <div className='grid grid-col-5 text-center p-2rem g-2rem'>
        {cardsTitles.length > 0 && cardsTitles.map((title) => {
          return (
            <div className="card-grid" key={title}>
              <span>{title}</span>
              <span>details here</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default part_three