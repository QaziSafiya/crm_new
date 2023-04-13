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
        const res = await fetch(`${BASE_URL}/service/all?pageNo=${page}`, {
            headers: new Headers({
                'Authorization': `Basic ${token}`,
            })
        });
    
        return res.json();
    }, [page]);    

    const { data, isLoading, error: fetchError } = useQuery(['services', page], fetchServices);

    const [service, setService] = useState(null);

    const deleteService = useMutation((id) => {
        return fetch(`${BASE_URL}/service/${service}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
            })
        })
    }, {
        onMutate: async (id) => {
            await queryClient.cancelQueries(['services', id]);
        
            queryClient.setQueryData(['services', page], (old) => {
                return {
                    ...old,
                    services: old.services.filter(service => service.id !== id)
                };
            });
        }
    });

    const handleDelete = service => {
        setIsOpen(true);
        setService(service);
    };

    const handleServiceDelete = async () => {
        try {
            setError('');
            setDeleting(true);

            const res = await deleteService.mutateAsync(service);

            console.log(res);

            if(!res.ok) {
                throw new Error('Could not delete service.');
            }

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
                                        data.services.map(service => (
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