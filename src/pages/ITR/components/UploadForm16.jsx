import React, { useState } from 'react'

const ITRUploadForm16 = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    // Event handler for when a file is selected
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    // Event handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle the file upload logic here, e.g., send the file to a server

        // Reset the selected file state
        setSelectedFile(null);
    };
    return (
        <div className='h-screen flex flex-col items-center bg-transparant'>
            <h2 className='p-3 text-blue-500 rounded'>File Upload Form-16</h2>
            <form className='flex mt-20' onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="file"
                            accept=".jpg, .jpeg, .png, .gif"
                            onChange={handleFileChange}
                        />
                    </div>
                </form>

                {selectedFile && (
                    <div>
                        <h3>Selected File:</h3>
                        <p>{selectedFile.name}</p>
                    </div>
                )}
        </div>
    )
}

export default ITRUploadForm16