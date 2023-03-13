import ReactModal from "react-modal";
import { Link } from "react-router-dom";
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

const AllServices = () => {


    // const { token } = useAuth();

    // const [search, setSearch] = useSearchParams();

    // const page = parseInt(search.get('page')) || 0;

    // const fetchBlogs = useCallback(async () => {
    //     const res = await fetch(`${BASE_URL}/service/all?pageNo=${page}`);

    //     return res.json();
    // }, [page]);

    // const { data, isLoading, error: fetchError } = useQuery(['blogs', page], fetchBlogs);

    // const deletePost = useMutation((id) => {
    //     return fetch(`${BASE_URL}/blog/delete?id=${post}`, {
    //         method: 'POST',
    //         headers: new Headers({
    //             'Authorization': `Bearer ${token}`,
    //         })
    //     })
    // }, {
    //     onMutate: async (id) => {
    //         await queryClient.cancelQueries(['blogs', id]);

    //         queryClient.setQueryData(['blogs', page], (old) => {
    //             return {
    //                 ...old,
    //                 data: old.data.filter(post => post.id !== id)
    //             };
    //         });
    //     }
    // });

    // const [isOpen, setIsOpen] = useState(false);

    // const [post, setPost] = useState(null);

    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
    // const [deleting, setDeleting] = useState(false);

    // const handleDelete = post => {
    //     setIsOpen(true);
    //     setPost(post);
    // };

    // const handlePostDelete = async () => {
    //     try {
    //         setError('');
    //         setDeleting(true);

    //         const res = await deletePost.mutateAsync(post);

    //         console.log(res);

    //         if (!res.ok) {
    //             throw new Error('Could not delete post.');
    //         }

    //         setSuccess('Post deleted.');
    //     } catch (e) {
    //         console.error(e);
    //         setError(e.message);
    //     } finally {
    //         setDeleting(false);
    //         setIsOpen(false);
    //     }
    // };

    // const appElementRef = useRef();


    return <>
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="flex jc-between ai-center">
                        <h6 className="text-secondary">Services</h6>
                        <Link to="/services/newService" className="button is-primary is-small has-icon">
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
                                            <span className="text-secondary">
                                                {postDateFormatter.format(new Date())}
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
                                // )
                    }
                    {/* <Pagination totalPages={data?.totalPages} currentPage={page} setSearch={setSearch} /> */}
                </div>
            </div>
            {/* <ReactModal style={customStyles} isOpen={isOpen} appElement={appElementRef.current} contentLabel="Delete Post">
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
            </ReactModal> */}
        </div>
    </>
}

export default AllServices