import React from 'react'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import AddCircleIcon from '../../components/icons/AddCircleIcon'
import { Link } from 'react-router-dom'

const Sales = () => {
  return (
    <div className="container">
    <Sidebar />
    <div className="main">
      <Topbar />
      <div className="inner-container">
    <div>
    <Link to={`/invoice/create/sales`}>
                  <button
                    // onClick={handleAddPartyClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40 flex items-center space-x-2"
                  >
                    <AddCircleIcon />
                    <div>Create Sale</div>
                  </button>
                </Link>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Sales