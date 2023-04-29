import React from 'react'

const Part_one = () => {

  const cardsTitles = [
    "4A, 4B, 6B, 6C-B2B invoices",
    "5A-B2C (large invoices)",
    "6A Export invoice",
    "7-B2C (Others)",
    "8A, 8B, 8C, 8D-nil related supplies",
    "9B-Credit/Debit notes (registered)",
    "9B-Credit/Debit notes (un-registered)",
    "11A(1), 11A(2) - Tax liability (Advances Received)",
    "11B(1), 11B(2) - Adjustment of (advances)",
    "12 - HSN - wise summary of outward supplies",
    "Document issued",
  ];

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

export default Part_one