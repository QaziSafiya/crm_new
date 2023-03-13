import { useRef } from "react";
import { useState } from "react";
import ReactModal from "react-modal";
import { Link, useSearchParams } from "react-router-dom";
import CloseCircleIcon from "../../components/icons/CloseCircleIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import EditIcon from "../../components/icons/EditIcon";
import ErrorMessage from "../../components/messages/ErrorMessage";
import SuccessMessage from "../../components/messages/SuccessMessage";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { postDateFormatter } from "../../lib/formatter";


const data=[
    {
        id:1,
        title:"PF Registration",
        info:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nobis rem repellat autem nisi recusandae et dignissimos voluptates voluptas voluptate.",
        documentRequired:[
            {
                title:"pan",
                required:true,
                type:"field"
            }
        ]
    },
    {
        id: 2,
        title: "GSTIN Registration",
        info: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati nobis rem repellat autem nisi recusandae et dignissimos voluptates voluptas voluptate.",
        documentRequired: [
            {
                title: "Pan",
                required: true,
                type: "field"
            },
            {
                title: "Aadhar",
                required: true,
                type: "field"
            }
        ]
    }

]

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, .5)'
    },
    content: {
        width: 'max-content',
        height: 'max-content',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--elevation-color)',
        border: 'none'
    },
};

const AllServices = () => {
    const [search, setSearch] = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const appElementRef = useRef();

    const handleDelete = () => {
        setIsOpen(true);
    };

    return <>
        <div className="container" ref={appElementRef}>
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="flex jc-between ai-center">
                        <h6 className="text-secondary">Services</h6>
                        <Link to="/services/add-service" className="button is-primary is-small has-icon">
                            <EditIcon />
                            New Service
                        </Link>
                    </div>
                    {/* {
                        error ? <ErrorMessage message={error} /> : null
                    }
                    {
                        success ? <SuccessMessage message={success} /> : null
                    } */}
                    <h6 className="m-0">All Services</h6>
                    {
                        // isLoading
                        //     ? (
                        //         <div className="flex jc-center ai-center p-1rem">
                        //             <span className="spinner small"></span>
                        //         </div>
                        //     )
                        //     : fetchError
                        //         ? <ErrorMessage message='Could not load blogs.' />
                        //         : (
                                    data.map(post => (
                                        <div key={post.id} className="section">
                                            <div className="flex dir-row ai-center jc-between">
                                                <Link to={`/blog/post/${post.id}`}>
                                                    <h6 className="title">{post.title}</h6>
                                                </Link>
                                                <div className="flex ai-center g-1rem">
                                                    <Link to={`/services/update-service/${post.id}`} className="button is-primary is-small has-icon">
                                                        <EditIcon />
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDelete(post.id)} className="button is-danger is-small has-icon w-max-content">
                                                        <DeleteIcon />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                // )
                    }
                    <Pagination totalPages={1} currentPage={0} setSearch={setSearch} />
                </div>
            </div>
            <ReactModal style={customStyles} isOpen={isOpen} appElement={appElementRef.current} contentLabel="Delete Post">
                <div className="flex dir-col g-1rem">
                    <h6 className='text-danger text-center'>Delete Service?</h6>
                    <div className="flex jc-center ai-center g-1rem">
                        <button disabled={deleting} className="button is-danger is-small w-max-content">
                            Delete
                        </button>
                        <button disabled={deleting} onClick={() => setIsOpen(false)} className="button is-secondary is-small has-icon">
                            <CloseCircleIcon />
                            Cancel
                        </button>
                    </div>
                </div>
            </ReactModal>
        </div>
    </>
}

export default AllServices