import { useState } from "react";
import EditableItem from "../../../components/EditableItem.jsx";

export default function UpdateUpper({ data }) {
    const [upper, setUpper] = useState(data);

    return (
        <>
            <h6 className="title">Upper Section</h6>
            <div className="section">
                <EditableItem 
                    name="Heading" 
                    param="mainHeading" 
                    value={upper.mainHeading} 
                    setUpper={setUpper}
                    endpoint="users/updateMainHeading"
                />
                <EditableItem 
                    name="Sub Heading" 
                    param="subHeading" 
                    value={upper.subHeading} 
                    setUpper={setUpper}
                    endpoint="users/updateSubHeading"
                />
                <EditableItem 
                    name="Button" 
                    param="button" 
                    value={upper.button} 
                    setUpper={setUpper}
                    endpoint="users/updateButton"
                />
            </div>
        </>
    )
}