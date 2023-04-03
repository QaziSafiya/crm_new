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

const AllLibrary = () => {
    const { token } = useAuth();

    const [search, setSearch] = useSearchParams();

    const [isOpen, setIsOpen] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deleting, setDeleting] = useState(false);

    const page = parseInt(search.get('page')) || 0;

    const fetchLibraries = useCallback(async () => {
        const res = await fetch(`${BASE_URL}/library/all?pageNo=${page}`, {
            headers: new Headers({
                'Authorization': `Basic ${token}`,
            })
        });
        // console.log( await res.json())

        return await res.json();
    }, [page]);

    const { data, isLoading, error: fetchError } = useQuery(['libraries', page], fetchLibraries);

    const [library, setLibrary] = useState(null);

    const deleteLibrary = useMutation((id) => {
        return fetch(`${BASE_URL}/library/${library}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
            })
        })
    }, {
        onMutate: async (id) => {
            await queryClient.cancelQueries(['libraries', id]);

            queryClient.setQueryData(['libraries', page], (old) => {
                return {
                    ...old,
                    libraries: old.libraries.filter(library => library.id !== id)
                };
            });
        }
    });

    const handleDelete = library => {
        setIsOpen(true);
        setLibrary(library);
    };

    const hnadleLibrarydelete = async () => {
        try {
            setError('');
            setDeleting(true);

            const res = await deleteLibrary.mutateAsync(library);

            console.log(res);

            if (!res.ok) {
                throw new Error('Could not delete library.');
            }

            setSuccess('Library deleted.');
        } catch (e) {
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
                        <h6 className="text-secondary">e-Library</h6>
                        <Link to="/e-library/add-library" className="button is-primary is-small has-icon">
                            <EditIcon />
                            New Library
                        </Link>
                    </div>
                    {
                        error ? <ErrorMessage message={error} /> : null
                    }
                    {
                        success ? <SuccessMessage message={success} /> : null
                    }
                    <h6 className="m-0">All Libraries</h6>
                    {
                        isLoading
                            ? (
                                <div className="flex jc-center ai-center p-1rem">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : fetchError
                                ? <ErrorMessage message='Could not load Libraries.' />
                                : (
                                    <>
                                        {
                                            data.libraries.map(library => (
                                                <div key={library.id} className="section">
                                                    <div className="flex dir-row ai-center jc-between">
                                                        <h6 className="title">{library.subject}</h6>
                                                        <div className="flex ai-center g-1rem">
                                                            <Link to={`/e-library/update-library/${library.id}`} className="button is-primary is-small has-icon">
                                                                <EditIcon />
                                                                Edit
                                                            </Link>
                                                            <button onClick={() => handleDelete(library.id)} className="button is-danger is-small has-icon w-max-content">
                                                                <DeleteIcon />
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <Pagination totalPages={Math.max(Math.floor(data.total_libraries / 10), 1)} currentPage={page} setSearch={setSearch} />
                                    </>
                                )
                    }
                </div>
            </div>
            <ReactModal style={customStyles} isOpen={isOpen} appElement={appElementRef.current} contentLabel="Delete Post">
                <div className="flex dir-col g-1rem">
                    <h6 className='text-danger text-center'>Delete Library?</h6>
                    <div className="flex jc-center ai-center g-1rem">
                        <button disabled={deleting} onClick={hnadleLibrarydelete} className="button is-danger is-small w-max-content">
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

export default AllLibrary