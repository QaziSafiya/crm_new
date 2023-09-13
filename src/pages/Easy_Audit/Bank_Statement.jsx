import React from 'react'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'

const Bank_Statement = () => {
  return (
   <div className='container'>
   <Sidebar/>
   <div className='main'>
   <Topbar/>
   <div className='inner-container'>
   <div>Bank Statement</div>
   </div>
   </div>
   </div>
  )
}

export default Bank_Statement