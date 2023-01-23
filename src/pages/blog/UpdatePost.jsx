import { convertFromRaw, convertToRaw, Editor, EditorState, RichUtils } from "draft-js";
import { useEffect, useMemo, useState } from "react";
import BoldIcon from "../../components/icons/BoldIcon.jsx";
import ExternalLinkIcon from "../../components/icons/ExternalLinkIcon.jsx";
import ItalicIcon from "../../components/icons/ItalicIcon.jsx";
import StrikethroughIcon from "../../components/icons/StrikethroughIcon.jsx";
import UnderlineIcon from "../../components/icons/UnderlineIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { onAddLink } from "../../components/LinkPlugin.jsx";
import LinkIcon from "../../components/icons/LinkIcon.jsx";
import { draftToMarkdown, markdownToDraft } from "markdown-draft-js";
import OrderedListIcon from "../../components/icons/OrderedListIcon.jsx";
import UnorderedListIcon from "../../components/icons/UnorderedListIcon.jsx";
import QuoteIcon from "../../components/icons/QuoteIcon.jsx";

import 'draft-js/dist/Draft.css';
import '../../CustomEditorStyle.css';
import { BASE_URL } from "../../constants.js";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import useAuth from "../../hooks/useAuth.js";
import SuccessMessage from "../../components/messages/SuccessMessage.jsx";
import { useParams } from "react-router-dom";

const styleMap = {
    'blockquote': {
        display: 'block',
        backgroundColor: '#f0f0f0',
        padding: '1rem',
        borderLeft: '.2rem solid var(--primary-color)'
    },
    'ordered-list': {
        listStyleType: 'numerical',
        marginLeft: '1rem'
    }
};

export default function UpdatePost() {
    const { token } = useAuth();

    const { id } = useParams();

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const [title, setTitle] = useState('');
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [loading, setLoading] = useState(true);

    const onChange = editorState => setEditorState(editorState);

    const inlineStyles = useMemo(() => {
        return ([
            {
                style: 'BOLD',
                icon: <BoldIcon />
            },
            {
                style: 'ITALIC',
                icon: <ItalicIcon />
            },
            {
                style: 'UNDERLINE',
                icon: <UnderlineIcon />
            },
            {
                style: 'STRIKETHROUGH',
                icon: <StrikethroughIcon />
            },
            {
                style: 'blockquote',
                icon: <QuoteIcon />,
            },
            {
                style: 'unordered-list-item',
                icon: <UnorderedListIcon />,
                type: 'block'
            },
            {
                style: 'ordered-list-item',
                icon: <OrderedListIcon />,
                type: 'block'
            },
        ])
    }, []);

    const handleHeading = (e) => {
        const value = e.target.value;
        setEditorState(RichUtils.toggleBlockType(editorState, value));
    };

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
    
        if (newState) {
          onChange(newState);
          return 'handled';
        }
    
        return 'not-handled';
    }    

    const onInlineStyleBtnClick = command => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, command));
    };

    const toggleBlockStyle = command => {
        setEditorState(RichUtils.toggleBlockType(editorState, command));
    };

    const isActive = inlineStyle => {
        return editorState.getCurrentInlineStyle().has(inlineStyle);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setPosting(true);

            const content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

            const response = await fetch(`${BASE_URL}/blog/update-post?id=${id}`, {
                method: 'POST', 
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    title,
                    content,
                    imageUrl: ''
                })
            });

            if(!response.ok) {
                throw new Error('Could not update.');
            }

            setSuccess('Blog Posted.');
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setPosting(false);
        }
    };

    const fetchBlog = async() => {
        try {
            setLoading(true);

            const res = await fetch(`${BASE_URL}/blog/get-post-byId?id=${id}`);

            if(!res.ok) {
                throw new Error('Could not fetch blog.');
            }

            const { title, content } = await res.json();

            setTitle(title);
            setEditorState(EditorState.createWithContent(convertFromRaw(markdownToDraft(content))));
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
                    <h6 className="text-secondary">Update Post</h6>
                    {error ? <ErrorMessage message={error} /> : null}
                    {success ? <SuccessMessage message={success} /> : null}
                    {
                        loading
                            ? (
                                <div className="flex jc-center ai-center h-100pc">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : (
                                <form className="flex g-1rem dir-col flex-1" onSubmit={handleSubmit}>
                                    <div className="flex ai-center jc-between">
                                        <div className="flex ai-center g-0_5rem flex-wrap">
                                            {
                                                inlineStyles.map(({ style, icon, type }) => {
                                                    return (
                                                        <button 
                                                            type="button"
                                                            key={style}
                                                            className={`button icon-button tool-button${isActive(style) ? ' active' : ''}`} 
                                                            onClick={() => type === 'block' ? toggleBlockStyle(style) : onInlineStyleBtnClick(style)}
                                                        >
                                                            {icon}
                                                        </button>
                                                    )
                                                })
                                            }
                                            <button 
                                                type="button" 
                                                onClick={() => onAddLink(editorState, setEditorState)} 
                                                className="button icon-button"
                                            >
                                                <LinkIcon />
                                            </button>
                                            <select onChange={handleHeading} className="select w-max-content">
                                                <option value="normal">Normal</option>
                                                <option value="header-one" className="h1">Heading 1</option>
                                                <option value="header-two" className="h2">Heading 2</option>
                                                <option value="header-three" className="h3">Heading 3</option>
                                                <option value="header-four" className="h4">Heading 4</option>
                                                <option value="header-five" className="h5">Heading 5</option>
                                                <option value="header-six" className="h6">Heading 6</option>
                                            </select>
                                        </div>
                                        <button disabled={posting} className="button is-primary is-small">
                                            {
                                                posting
                                                    ? <span className="spinner small"></span>
                                                    : 'Update'
                                            }
                                        </button>
                                    </div>
                                    <input 
                                        type="text" 
                                        className="input" 
                                        value={title} 
                                        onChange={e => setTitle(e.target.value)} 
                                        placeholder="Title"
                                    />
                                    <Editor 
                                        editorState={editorState}
                                        customStyleMap={styleMap}
                                        onChange={setEditorState} 
                                        handleKeyCommand={handleKeyCommand}
                                        placeholder="Write Here..."
                                    />
                                </form>
                            )
                    }
                </div>
            </div>
        </div>
    );
}