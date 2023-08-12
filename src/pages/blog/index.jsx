import { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { useMutation, useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { queryClient } from "../../App.jsx";
import CloseCircleIcon from "../../components/icons/CloseCircleIcon.jsx";
import DeleteIcon from "../../components/icons/DeleteIcon.jsx";
import EditIcon from "../../components/icons/EditIcon.jsx";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import SuccessMessage from "../../components/messages/SuccessMessage.jsx";
import Pagination from "../../components/Pagination.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import { postDateFormatter } from "../../lib/formatter.js";

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
  

export default function Blog() {
    const { token } = useAuth();

    const [search, setSearch] = useSearchParams();

    const page = parseInt(search.get('page')) || 1;

    const fetchBlogs = useCallback(async () => {
        const res = await fetch(`${BASE_URL}/blog/posts?page=${page}`);
        const data = await res.json();
        return data;
    }, [page]);    

    const { data, isLoading, error: fetchError } = useQuery(['blogs', page], fetchBlogs);

    const deletePost = useMutation((id) => {
        return fetch(`${BASE_URL}/blog/posts/${post}`, {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
            })
        })
    }, {
        onMutate: async (id) => {
            await queryClient.cancelQueries(['blogs', id]);
            queryClient.setQueryData(['blogs', page], (old) => {
                return {
                    ...old,
                    data: {
                        ...old.data,
                        posts: old.data.posts.filter(post => post.id !== id)
                    }
                };
            });            
        }
    });
    
    const [isOpen, setIsOpen] = useState(false);

    const [post, setPost] = useState(null);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [deleting, setDeleting] = useState(false);

    const handleDelete = post => {
        setIsOpen(true);
        setPost(post);
    };

    const handlePostDelete = async () => {
        try {
            setError('');
            setDeleting(true);

            const res = await deletePost.mutateAsync(post);

            console.log(res);

            if(!res.ok) {
                throw new Error('Could not delete post.');
            }

            setSuccess('Post deleted.');
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setDeleting(false);
            setIsOpen(false);
        }
    };

    const appElementRef = useRef();

    return (
        <div className="container" ref={appElementRef}>
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="flex jc-between ai-center">
                        <h6 className="text-secondary">Blog</h6>
                        <Link to="/blog/new-post" className="button is-primary is-small has-icon">
                            <EditIcon />
                            New Post
                        </Link>
                    </div>
                    {
                        error ? <ErrorMessage message={error} /> : null
                    }
                    {
                        success ? <SuccessMessage message={success} /> : null
                    }
                    <h6 className="m-0">Recent Posts</h6>
                    {
                        isLoading
                            ? (
                                <div className="flex jc-center ai-center p-1rem">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : fetchError
                                ? <ErrorMessage message='Could not load blogs.' />
                                : (
                                    data.data.posts.map(post => (
                                        <div key={post.id} className="section">
                                            <span className="text-secondary">
                                                {postDateFormatter.format(new Date(post.createdAt))}
                                            </span>
                                            <div className="flex dir-row ai-center jc-between">
                                                <Link to={`/blog/post/${post.id}`}>
                                                    <h6 className="title">{post.title}</h6>
                                                </Link>
                                                <div className="flex ai-center g-1rem">
                                                    <Link to={`/blog/update-post/${post.id}`} className="button is-primary is-small has-icon">
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
                                )
                    }
                    <Pagination totalPages={data?.totalPages} currentPage={page} setSearch={setSearch} />
                </div>
            </div>
            <ReactModal style={customStyles} isOpen={isOpen} appElement={appElementRef.current} contentLabel="Delete Post">
                <div className="flex dir-col g-1rem">
                    <h6 className='text-danger text-center'>Delete Post?</h6>
                    <div className="flex jc-center ai-center g-1rem">
                        <button disabled={deleting} onClick={handlePostDelete} className="button is-danger is-small w-max-content">
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
    );
}