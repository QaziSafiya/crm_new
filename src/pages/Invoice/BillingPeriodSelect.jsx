import React from 'react';

const BillingPeriodSelect = ({ billingPeriod, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="billingPeriod" className="block text-sm font-bold text-gray-700 mb-2">
        Billing Period:
      </label>
      <select
        id="billingPeriod"
        name="billingPeriod"
        value={billingPeriod}
        onChange={onChange}
        className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
      >
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
    </div>
  );
};

export default BillingPeriodSelect;
