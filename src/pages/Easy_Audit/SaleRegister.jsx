import React from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';

const SaleRegister = () => {
  return (
    <div className="container">
  <Sidebar/>
     <div className="main">
     <Topbar/>
     <div className="inner-container">
     <div className='ml-10'>
     <p>Sale Register</p>
   </div>
   <div className="flex h-70">
     <div className="bg-white rounded-lg shadow-md w-1/5 mr-4 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer"> {/* Added hover:scale-105 and other transition properties */}
       <div className="h-32 w-32 mx-auto mt-4 rounded-full overflow-hidden">
         <img
           src="https://via.placeholder.com/150" // Replace with your image URL
           alt="Card Image"
           className="w-full h-full object-cover"
         />
       </div>
       <div className="p-4">
         <h2 className="text-xl font-semibold mb-2 text-center">Card 1</h2>
         <p className="text-gray-600 text-center">Card description goes here.</p>
       </div>
     </div>
     <div className="bg-white rounded-lg shadow-md w-1/5 mr-4 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer"> {/* Added hover:scale-105 and other transition properties */}
       <div className="h-32 w-32 mx-auto mt-4 rounded-full overflow-hidden">
         <img
           src="https://via.placeholder.com/150" // Replace with your image URL
           alt="Card Image"
           className="w-full h-full object-cover"
         />
       </div>
       <div className="p-4">
         <h2 className="text-xl font-semibold mb-2 text-center">Card 2</h2>
         <p className="text-gray-600 text-center">Card description goes here.</p>
       </div>
     </div>
     <div className="bg-white rounded-lg shadow-md w-1/5 mr-4 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer"> {/* Added hover:scale-105 and other transition properties */}
       <div className="h-32 w-32 mx-auto mt-4 rounded-full overflow-hidden">
         <img
           src="https://via.placeholder.com/150" // Replace with your image URL
           alt="Card Image"
           className="w-full h-full object-cover"
         />
       </div>
       <div className="p-4">
         <h2 className="text-xl font-semibold mb-2 text-center">Card 3</h2>
         <p className="text-gray-600 text-center">Card description goes here.</p>
       </div>
     </div>
     <div className="bg-white rounded-lg shadow-md w-1/5 hover:scale-105 transform transition-transform duration-300 ease-in-out cursor-pointer"> {/* Added hover:scale-105 and other transition properties */}
       <div className="h-32 w-32 mx-auto mt-4 rounded-full overflow-hidden">
         <img
           src="https://via.placeholder.com/150" // Replace with your image URL
           alt="Card Image"
           className="w-full h-full object-cover"
         />
       </div>
       <div className="p-4">
         <h2 className="text-xl font-semibold mb-2 text-center">Card 4</h2>
         <p className="text-gray-600 text-center">Card description goes here.</p>
       </div>
     </div>
   </div>
     </div>
     
     </div>
    </div>
  );
};

export default SaleRegister;



