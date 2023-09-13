import React from 'react';

function Button(props) {
 
  const { onClick, type, className, children } = props;

  return (
    <div className='mt-10'>
    <button type="submit"  className="bg-white text-black font-semibold py-2 px-4 rounded border border-gray-600 hover:bg-gray-100 hover:border-gray-700 transition duration-300 ease-in-out transform hover:scale-105">
    Submit
    </button>
    </div>
  );
}

export default Button;
