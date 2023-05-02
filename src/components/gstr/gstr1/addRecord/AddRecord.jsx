import React, { useState } from "react";
import Card_One from "./Card_One";

const AddRecord = () => {
  const [activeSection, setActiveSection] = useState(null);
  // const [isOpen, setIsOpen] = useState(true);

  const activeWindow = () => {
    switch (activeSection) {
      case 0:
        return <Card_One setActiveSection={setActiveSection} />;
      // case 1:
      //   return <Table_3_1_1 setActiveSection={setActiveSection} />;
      // case 2:
      //   return <Table_3_2 setActiveSection={setActiveSection} />;
      // case 3:
      //   return <Table_4 setActiveSection={setActiveSection} />;
      // case 4:
      //   return <Table_5_1 setActiveSection={setActiveSection} />;
      // case 5:
      //   return <Table_5 setActiveSection={setActiveSection} />;
      // case 6:
      //   return <Table_6_1 setActiveSection={setActiveSection} />;
      // case 7:
      //   return <Table_6_1 setActiveSection={setActiveSection} />;
      // case 8:
      //   return <Table_6_1 setActiveSection={setActiveSection} />;
      // case 9:
      //   return <Table_6_1 setActiveSection={setActiveSection} />;
      // case 10:
      //   return <Table_6_1 setActiveSection={setActiveSection} />;
      default:
        return;
    }
  };

  return (
    <div>
      {activeSection === null ? (
        <div className="flex flex-wrap jc-center w-100pc text-center p-2rem g-2rem">
          {cardsTitles.length > 0 &&
            cardsTitles.map((title, i) => {
              return (
                <div className="card-flex" key={title} onClick={() => setActiveSection(i)}>
                  <span>{title}</span>
                  <span>details here</span>
                  {activeSection}
                </div>
              );
            })}
        </div>
      ) : (
        activeWindow()
      )}
    </div>
  );
};

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

export default AddRecord;