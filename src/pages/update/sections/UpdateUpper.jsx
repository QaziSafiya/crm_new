import EditableItem from "../../../components/EditableItem.jsx";

export default function UpdateUpper({ data }) {
    return (
        <>
            <h6 className="title">Upper Section</h6>
            <div className="section">
                <EditableItem 
                    name="Heading" 
                    param="mainHeading" 
                    value={data.mainHeading} 
                    endpoint="users/updateMainHeading"
                />
                <EditableItem 
                    name="Sub Heading" 
                    param="subHeading" 
                    value={data.subHeading} 
                    endpoint="users/updateSubHeading"
                />
                <EditableItem 
                    name="Button" 
                    param="button" 
                    value={data.button} 
                    endpoint="users/updateButton"
                />
            </div>
        </>
    )
}