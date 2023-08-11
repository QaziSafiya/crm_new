import { useCallback } from "react";
import { useRef } from "react";
import { useState } from "react";
import ReactModal from "react-modal";
import { useMutation, useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { queryClient } from "../../App.jsx";
import CloseCircleIcon from "../../components/icons/CloseCircleIcon";
import DeleteIcon from "../../components/icons/DeleteIcon";
import EditIcon from "../../components/icons/EditIcon";
import ErrorMessage from "../../components/messages/ErrorMessage";
import SuccessMessage from "../../components/messages/SuccessMessage";
import Pagination from "../../components/Pagination";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import axios from "axios";

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
    const { token } = useAuth();

    const [search, setSearch] = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deleting, setDeleting] = useState(false);

    const page = parseInt(search.get('page')) || 0;

    const fetchServices= useCallback(async () => {
        const res = await fetch(`${BASE_URL}/services?pageNo=${page}`, {
            headers: new Headers({
                'Authorization': `Basic ${token}`,
            })
        });
    
        return res.json();
    }, [page]);    

    const { data, isLoading, error: fetchError } = useQuery(['services', page], fetchServices);
  console.log(data)

    const [service, setService] = useState(null);

    const deleteService = useMutation(async (serviceId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/services/${serviceId}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiaVRheEVhc3kiLCJsYXN0TmFtZSI6IkFkbWluIiwiYWRkcmVzcyI6bnVsbCwiYWFkaGFhciI6bnVsbCwicGFuIjpudWxsLCJlbWFpbCI6ImFkbWluQGl0YXhlYXN5LmNvbSIsInBob25lIjpudWxsLCJ1c2VyVHlwZSI6ImFkbWluIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjdUMDk6MTc6MzEuODA0WiIsImlhdCI6MTY4Nzg1NzY5NywiZXhwIjoxNzE5NDE1Mjk3LCJpc3MiOiJpVGF4RWFzeSJ9.4u41-IhAQzpZpkirYY6dBYlznbUuc8ScUqak0nXH7n0`,
                },
            });
            return response.data; // Return the response data if needed
        } catch (error) {
            throw error;
        }
    }, {
        onMutate: async (serviceId) => {
            await queryClient.cancelQueries(['services', page]);

            // Update the cache to remove the deleted service
            queryClient.setQueryData(['services', page], (oldData) => {
                if (oldData.data) {
                    return {
                        ...oldData,
                        data: oldData.data.filter(service => service.id !== serviceId)
                    };
                }
                return oldData;
            });
        }
    });

    const handleDelete = (serviceId) => {
        setIsOpen(true);
        setService(serviceId);
    };

    const handleServiceDelete = async () => {
        try {
            setError('');
            setDeleting(true);

            await deleteService.mutateAsync(service); // Use service id

            setSuccess('Service deleted.');
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setDeleting(false);
            setIsOpen(false);
        }
    };


    const appElementRef = useRef();

    

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
                    {
                        error ? <ErrorMessage message={error} /> : null
                    }
                    {
                        success ? <SuccessMessage message={success} /> : null
                    }
                    <h6 className="m-0">All Services</h6>
                    {
                        isLoading
                            ? (
                                <div className="flex jc-center ai-center p-1rem">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : fetchError
                                ? <ErrorMessage message='Could not load services.' />
                                : (
                                    <>
                                    {
                                     data.data.length>0 &&   data.data.map(service => (
                                            <div key={service.id} className="section">
                                                <div className="flex dir-row ai-center jc-between">
                                                    <h6 className="title">{service.serviceName}</h6>
                                                    <div className="flex ai-center g-1rem">
                                                        <Link to={`/services/update-service/${service.id}`} className="button is-primary is-small has-icon">
                                                            <EditIcon />
                                                            Edit
                                                        </Link>
                                                        <button onClick={() => handleDelete(service.id)} className="button is-danger is-small has-icon w-max-content">
                                                            <DeleteIcon />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <Pagination totalPages={Math.ceil(data.total_services / 10)} currentPage={page} setSearch={setSearch} />
                                    </>
                                )
                    }
                </div>
            </div>
            <ReactModal style={customStyles} isOpen={isOpen} appElement={appElementRef.current} contentLabel="Delete Post">
                <div className="flex dir-col g-1rem">
                    <h6 className='text-danger text-center'>Delete Service?</h6>
                    <div className="flex jc-center ai-center g-1rem">
                        <button disabled={deleting} onClick={handleServiceDelete} className="button is-danger is-small w-max-content">
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