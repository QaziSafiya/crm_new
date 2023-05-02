import React from 'react'

const eInvoice = () => {

  const cardsTitles = ["Available for download"]

  return (
    <div>
      <div className='flex flex-wrap jc-center w-100pc text-center p-2rem g-2rem'>
        {cardsTitles.length > 0 && cardsTitles.map((title) => {
          return (
            <div className="card-flex" key={title}>
              <span>{title}</span>
              <span>details here</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default eInvoice