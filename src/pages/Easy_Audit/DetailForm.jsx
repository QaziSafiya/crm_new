import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import { BiCheckboxChecked } from 'react-icons/bi';
const DetailForm = () => {
    const [selectedBankAcc, setSelectedBankAcc] = useState(null);
    const [selectedBankSta, setSelectedBankSta] = useState(null);
    const [selectedSale, setSelectedSale] = useState(null);
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const [mobileNo, setMobileNo] = useState('');
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

  
    const handleBankAcc = (event) => {
        const file = event.target.files[0];
        setSelectedBankAcc(file);
      };
    
      const handleBankSta = (event) => {
        const file = event.target.files[0];
        setSelectedBankSta(file);
      };
    
      const handleSale = (event) => {
        const file = event.target.files[0];
        setSelectedSale(file);
      };

      const handlePurchase = (event) => {
        const file = event.target.files[0];
        setSelectedPurchase(file);
      };

    const handleMobileNoChange = (e) => {
        const value = e.target.value;
        setMobileNo(value);
        if (value.length === 10 && /^\d+$/.test(value)) {
          setError('');
        } else {
          setError('Mobile number must be 10 digits');
        }
      };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailRegex.test(value)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid email address');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
   const formData = {
    selectedBankAcc,
    selectedBankSta,
    selectedSale,
    selectedPurchase,
    mobileNo,
    email,
  };
  console.log('Form Data:', formData);

  };

 
  return (

   <div className='container'>
   <Sidebar/>
   <div className='main'>
   <Topbar/>
 
   <div className='inner-container'>

{/*resable check div*/}
<div className='DetailForm'>
<div className='bg-white p-4 rounded-lg shadow-md my-5' >

<div className='justify-center items-center'>

<form onSubmit={handleSubmit}>

<div  className='flex gap-10 justify-center items-center'>

<div className=" w-auto sm:w-1/2 ">
<label htmlFor="fileInput" className="block font-medium text-gray-700">
  Upload Bank Account Details
</label>
<div className="relative sm:w-96">
  <input
    type="file"
    id="fileInput"
    accept=".pdf, .doc, .docx"
    onChange={handleBankAcc}
    required
    className="w-full sm:w-96 h-14 mt-2 px-4 py-3.5 placeholder-gray-700 border    rounded-md shadow-sm focus:outline-none   sm:text-2sm bg-white"
  />
  {selectedBankAcc && (
    <span className="absolute right-2 top-4 text-green-700">
     <BiCheckboxChecked className='h-8 w-8'/>
    </span>
  )}
</div>
</div>


<div className="w-full sm:w-1/2">
<label htmlFor="fileInput" className="block font-medium text-gray-700">
Upload Bank Statement Sheet In Excel Format
</label>
<div className='relative sm:w-96'>
<input
  type="file"
  id="fileInput"
  accept=".xlsx"
  onChange={handleBankSta}
  required
  className="w-full sm:w-96 h-14 mt-2 px-4 py-3.5 placeholder-gray-700 border    rounded-md shadow-sm focus:outline-none   sm:text-2sm bg-white"
/>
{selectedBankSta && (
    <span className="absolute right-2 top-4 text-green-700">
     <BiCheckboxChecked className='h-8 w-8'/>
    </span>
  )}
  </div>
</div>


</div>

{/**second */}

<div className='flex gap-10 justify-center items-center'>
<div className="w-full sm:w-1/2">
<label htmlFor="fileInput" className="block font-medium text-gray-700 mt-5">
       Upload Sales
     </label>
     <div className='relative sm:w-96'>
     <input
       type="file"
       id="fileInput"
       accept=".pdf, .doc, .docx"
       onChange={handleSale}
       className="w-full sm:w-96 h-14 mt-2 px-4 py-3.5 placeholder-gray-700 border    rounded-md shadow-sm focus:outline-none   sm:text-2sm bg-white"
     />
     {selectedSale && (
        <span className="absolute right-2 top-4 text-green-700">
         <BiCheckboxChecked className='h-8 w-8'/>
        </span>
      )}
      </div>
</div>
<div className="w-full sm:w-1/2">

<input
type='text'
id="fileInput"
placeholder='Personal Detail'
className="w-full sm:w-96 h-14 mt-2 px-4 py-3.5 placeholder-gray-700 border rounded-md shadow-sm focus:outline-none   sm:text-2sm bg-white"
/>
</div>

</div>

{/**3rd */}

<div className='flex gap-10 justify-center items-center'>

<div className="w-full sm:w-1/2">
<label htmlFor="fileInput" className="block font-medium text-gray-700 mt-5">
Upload Purchase
</label>
<div className='relative sm:w-96'>
<input
type="file"
id="fileInput"
accept=".pdf, .doc, .docx"
onChange={handlePurchase}
className="w-full sm:w-96 h-14 mt-2 px-4 py-3.5 placeholder-gray-700 border    rounded-md shadow-sm focus:outline-none   sm:text-2sm bg-white"
/>{selectedPurchase && (
    <span className="absolute right-2 top-4 text-green-700">
     <BiCheckboxChecked className='h-8 w-8'/>
    </span>
  )}
  </div>
</div>

<div className="w-full sm:w-1/2">
     <input
       type="date"
       id="fileInput"
       className="w-full sm:w-96 h-14 mt-2 px-4 py-3.5 placeholder-gray-700 border    rounded-md shadow-sm focus:outline-none   sm:text-2sm bg-white"
     />
   </div>

</div>

{/*4 */}

<div className='flex gap-10 justify-center items-center'>

<div className='mt-5 w-full sm:w-1/2'>
<input
  placeholder='Mobile No'
  id="fileInput"
  type="text" 
  value={mobileNo}
onChange={handleMobileNoChange}
className="w-full sm:w-96 h-14 mt-2 px-4 py-3.5 placeholder-gray-700 border    rounded-md shadow-sm focus:outline-none   sm:text-2sm bg-white"
/>
{error && <p className="text-red-500">{error}</p>}
</div>

<div className="w-full sm:w-1/2">
<input
  placeholder='Enter Your Email Id'
  id="emailInput" 
  type="text" 
  value={email}
  onChange={handleEmailChange}
  className="w-full sm:w-96 h-14 mt-2 px-4 py-3.5 placeholder-gray-700 border    rounded-md shadow-sm focus:outline-none   sm:text-2sm bg-white"
/>
{emailError && <p className="text-red-500">{emailError}</p>}
</div>

</div>

<div className='mt-10'>
<button type="submit"  className="bg-blue-600 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-1 mb-1">
Submit
</button>
</div>
</form>
</div>
</div>

 <h6 className="text-2xl font-bold text-gray-900">Need Experts Help</h6>
 
<div className="bg-white p-4 rounded-lg shadow-md my-5 sm:flex sm:items-center sm:space-x-4 flex">
  <div>
  <input
    type="checkbox"
    id="myCheckbox"
    className="h-4 w-4  text-indigo-600 rounded focus:ring-indigo-500"
  />
  
  </div>
  <div className="mt-2 sm:mt-0">
    <label htmlFor="myCheckbox" className="text-gray-700">
      <span className='font-bold text-gray-900'>Stack somewhere? </span>
      Don't worry, our text experts will help you e-File the return. Simply enter your email ID below and submit to send your Form 16(s) to our support team.
    </label>
  </div>
</div>




</div>
   </div>
   </div>
   </div>
  )
}

export default DetailForm






