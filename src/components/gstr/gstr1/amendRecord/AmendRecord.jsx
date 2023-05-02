import React from "react";

const amendRecord = () => {
  const cardsTitles = [
    "9A - Amended B2B invoices",
    "9A - Amended B2C (Large) invoices",
    "9A - Amended exports invoices",
    "9A - Amended Credit/Debit notes (Registered)",
    "9A - Amended Credit/Debit notes (Unregistered)",
    "10 - Amended B2C (others)",
    "11A - Amended Tax Liability (advances received)",
    "11A - Amended of adjustment of advances received",
  ];

  return (
    <div>
      <div className="flex flex-wrap jc-center w-100pc text-center p-2rem g-2rem">
        {cardsTitles.length > 0 &&
          cardsTitles.map((title) => {
            return (
              <div className="card-flex" key={title}>
                <span>{title}</span>
                <span>details here</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default amendRecord;