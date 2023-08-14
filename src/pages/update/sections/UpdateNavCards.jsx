import { useEffect, useState } from "react";
import AddCircleIcon from "../../../components/icons/AddCircleIcon.jsx";
import CloseCircleIcon from "../../../components/icons/CloseCircleIcon.jsx";
import DeleteIcon from "../../../components/icons/DeleteIcon.jsx";
import EditIcon from "../../../components/icons/EditIcon.jsx";
import ErrorMessage from "../../../components/messages/ErrorMessage.jsx";
import Modal from "../../../components/Modal.jsx";
import { BASE_URL } from "../../../constants.js";

import useAuth from '../../../hooks/useAuth.js';

const postNewCards = async (newNavCards, token) => {
   return fetch(`${BASE_URL}/cms/navcards`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify({
            navcards: newNavCards
        })
    });
};

const EditableCard = ({ card, cards, name, navCards, setNavCards, setDeleteCard, setShowDeleteModal }) => {
    const { token } = useAuth();

    const [editedContent, setEditedContent] = useState(card.content);
    const [editing, setEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        try {
            setUpdating(true);
            setError('');

            const newNavCards = navCards.map(navCard => {
                if(navCard.name !== name) {
                    return navCard;
                }

                return {
                    ...navCard,
                    cards: cards.map(_card => {
                        if(_card.heading !== card.heading) {
                            return _card;
                        }

                        console.log(_card.heading, card.heading);

                        return {
                            ...card,
                            content: editedContent
                        }
                    })
                }
            });

            const response = await postNewCards(newNavCards, token);

            const { data: { navcards } } = await response.json();

            setNavCards(navcards);

            setEditing(false);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setUpdating(false);
        }
    };

    const cancelEdit = () => {
        setEditedContent(card.content);
        setEditing(false);
    };

    const handleDeleteIntent = () => {
        setDeleteCard({
            card,
            name
        });
        console.log('Card to delete: ', card);
        setShowDeleteModal(true);
    };

    return (
        <>
            <div className="flex dir-col g-0_5rem">
                <span className="text-large text-secondary">
                    {card.heading}
                </span>
                {
                    !editing
                        ? (
                            <div className="flex jc-between g-1rem ai-start">
                                {card.content}
                                <div className="flex g-1rem ai-center">
                                    <button onClick={() => setEditing(true)} className="button has-icon is-outlined is-small">
                                        <EditIcon />
                                        Edit
                                    </button>
                                    <button onClick={handleDeleteIntent} className="button has-icon is-danger is-small">
                                        <DeleteIcon />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                        : (
                            <div className="flex dir-col g-0_5rem">
                                {
                                    error
                                        ? (
                                            <div className="error-message">
                                                <CloseCircleIcon />
                                                {error}
                                            </div>
                                        )
                                        : null
                                }
                                <textarea
                                    className="textarea"
                                    type="text" 
                                    value={editedContent}
                                    onChange={e => setEditedContent(e.target.value)}
                                    disabled={updating}
                                ></textarea>
                                <div className="flex ai-center g-1rem">
                                    <button
                                        className="button is-primary is-small"
                                        disabled={updating}
                                        onClick={handleUpdate}
                                    >
                                        {
                                            updating ? (
                                                <span className="spinner small"></span>
                                            ) : 'Save'
                                        }
                                    </button>
                                    <button onClick={cancelEdit} className="button is-danger is-small">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    )
};

export default function UpdateNavCards({ data }) {
    const [navCards, setNavCards] = useState(data);
    // console.log( "nav",navCardName,data)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddNavCardModel, setShowAddNavCardModel] = useState(false);
    const [deletedCard, setDeleteCard] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [adding, setAdding] = useState(false);

    const [navCardName, setNavCardName] = useState('');

    const [error, setError] = useState('');

    const handleDeleteIntent = name => {
        setDeleteCard({
            name
        });
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            setDeleting(true);

            console.log('Deleting card: ', deletedCard.card)

            const newNavCards = !deletedCard.card
                ? navCards.filter(navCard => navCard.name !== deletedCard.name)
                : navCards.map(navCard => {
                    if(navCard.name !== deletedCard.name) {
                        return navCard;
                    }
        
                    return {
                        ...navCard,
                        cards: navCard.cards.filter(_card => _card.heading !== deletedCard.card.heading)
                    }
                });
    
            const response = await postNewCards(newNavCards);
    
            const { message, data: { navcards } } = await response.json();

            if(!response.ok) {
                throw new Error(message);
            }

            setNavCards(navcards);    
            setDeleteCard(null);
            setShowDeleteModal(false);

            console.log('Card Deleted.');
        } catch(e) {
            console.error(e);
            setError('Could not delete nav card.');
        } finally {
            setDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setDeleteCard(null);
        setShowDeleteModal(false);
    };

    const handleAddCard = navCard => {
        setNavCards(navCards => {
            return navCards.map(_navCard => {
                if(_navCard.name === navCard.name) {
                    const card = {
                        heading: 'New Card',
                        content: 'Please edit this card.',
                    };

                    return {
                        ...navCard,
                        cards: [...navCard.cards, card],
                    }
                }

                return _navCard;
            })
        })
    };
    
    const handleAddNavCard = async () => {
        try {
            setAdding(true);

            const newNavCard = {
                name: navCardName,
                link: '/',
                cards: [],
            };
    
            const newNavCards = [...navCards, newNavCard];
    
            const response = await postNewCards(newNavCards); 
            
            if(!response.ok) {
                throw new Error('Could not add new nav card.');
            }

            const { data: { navcards } } = await response.json();

            setNavCards(navcards);
            setNavCardName('');
            setShowAddNavCardModel(false);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setAdding(false);
        }
    };

    return (
        <>
            <h6 className="title">Navcards</h6>
            {
                error
                    ? (
                        <ErrorMessage message={error} />
                    ) : null
            }
            {
               navCards && navCards.map((navCard) => {
                    return (
                        <div className="section" key={navCard.name}>
                            <div className="scrollable">
                                <h6 className="title">{navCard.name}</h6>
                                {
                                    navCard.cards.map((card, id) => (
                                        <EditableCard 
                                            card={card} 
                                            cards={navCard.cards}
                                            name={navCard.name}
                                            navCards={navCards}
                                            setNavCards={setNavCards} 
                                            setShowDeleteModal={setShowDeleteModal}
                                            setDeleteCard={setDeleteCard}
                                            key={id} 
                                        />
                                    ))
                                }
                                <div className="flex g-1rem">
                                    <button 
                                        onClick={() => handleAddCard(navCard)}
                                        className="button is-outlined is-small w-max-content has-icon"
                                    >
                                        <AddCircleIcon />
                                        Add
                                    </button>
                                    <button onClick={() => handleDeleteIntent(navCard.name)} className="button has-icon is-danger is-small">
                                        <DeleteIcon />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <button 
                onClick={() => setShowAddNavCardModel(true)}
                className="button is-outlined is-small w-max-content has-icon"
            >
                <AddCircleIcon />
                Add Nav Card
            </button>
            <Modal open={showDeleteModal} setOpen={setShowDeleteModal} >
                <div className="flex dir-col g-1rem p-2rem ai-center">
                    <h6 className="text-danger text-large text-center">Do you really want to delete this card?</h6>
                    <div className="flex g-1rem ai-center">
                        <button onClick={handleDelete} disabled={deleting} className="button is-danger is-small has-icon w-max-content">
                            <DeleteIcon />
                            Delete
                        </button>
                        <button onClick={handleCancelDelete} className="button is-secondary is-small has-icon w-max-content">
                            <CloseCircleIcon />
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal open={showAddNavCardModel} setOpen={setShowAddNavCardModel} >
                <div className="flex dir-col g-1rem p-2rem">
                    <h6 className="text-primary text-large text-center">Add Navcard</h6>
                    <div className="flex dir-col g-1rem">
                        <div className="field">
                            <label htmlFor="navcard-name">Navcard name</label>
                            <input
                                type="text" 
                                value={navCardName}
                                className="input is-small"
                                onChange={e => setNavCardName(e.target.value)} 
                            />
                        </div>
                        <button onClick={handleAddNavCard} className="button is-secondary is-small has-icon w-max-content">
                            <AddCircleIcon />
                            Add
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}