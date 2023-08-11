import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

import 'draft-js/dist/Draft.css';
import '../../CustomEditorStyle.css';
import { BASE_URL } from "../../constants.js";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown.js";

export default function Post() {
    const { id } = useParams();
    
    const [blog, setBlog] = useState(null);

    const [error, setError] = useState('');

    const [loading, setLoading] = useState(true);

    const fetchBlog = async() => {
        try {
            setLoading(true);

            const res = await fetch(`${BASE_URL}/blog/posts?id=${id}`);

            if(!res.ok) {
                throw new Error('Could not fetch blog.');
            }

            const data = await res.json();

            setBlog(data);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    {error ? <ErrorMessage message={error} /> : null}
                    {
                        loading
                            ? (
                                <div className="flex jc-center ai-center h-100pc">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : (
                                <>
                                    <h6 className="text-secondary">{blog.title}</h6>
                                    <div className="scrollable">
                                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
}