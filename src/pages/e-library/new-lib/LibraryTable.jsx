import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export const LibraryTable = ({ index, id, pan, section, subject, judgment, appeal_no, ao_order, appeal_type, assessment_year, sub_section }) => {
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate()
    const handleSingleLibrary = () => {

        navigate(`/e-library/update-library/${id}`)
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
//
    return (

        <tr class={` hover:shadow-2xl ${index % 2 == 0 ? "bg-white" : "bg-blue-100"} border-slate-300   `} >

            <td >{id}</td>
            <td >{pan}</td>
            <td >{section}</td>
            <td >{sub_section}</td>
            <td >{subject}</td>
            <td >{judgment}</td>
            <td >{appeal_no}</td>
            <td >{ao_order}</td>
            <td >{appeal_type}</td>
            <td >{assessment_year}</td>




            <td onClick={handleSingleLibrary} class="items-center w-3 ">
                <button
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="bg-blue-500  text-white px-2 py-1 rounded flex items-center hover:bg-blue-700 space-x-2"
                >
                    <FaEye />
                    <span>View</span>
                </button>
            </td>
            
            

        </tr>
    )
}

