import { useState } from "react";
import EditableItem from "../../../components/EditableItem.jsx";

export default function UpdateUpper({ data }) {
    const [upper, setUpper] = useState(data);
       console.log(upper,data)
    return (
        <>
            <h6 className="title">Upper Section</h6>
            <div className="section">
                <EditableItem 
                    name="Heading" 
                    param="mainHeading" 
                    value={upper.mainHeading} 
                    setUpper={setUpper}
                    endpoint="cms/main-heading"
                />
                <EditableItem 
                    name="Sub Heading" 
                    param="subHeading" 
                    value={upper.subHeading} 
                    setUpper={setUpper}
                    endpoint="cms/sub-heading"
                />
                <EditableItem 
                    name="Button" 
                    param="button" 
                    value={upper.button} 
                    setUpper={setUpper}
                    endpoint="cms/button"
                />
            </div>
        </>
    )
}