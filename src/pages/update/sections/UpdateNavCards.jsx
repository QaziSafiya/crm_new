import { useEffect, useState } from "react";
import EditIcon from "../../../components/icons/EditIcon.jsx";
import { BASE_URL } from "../../../constants.js";

import useAuth from '../../../hooks/useAuth.js';

const EditableCard = ({ card, cards, name, navCards, setNavCards }) => {
    const { token } = useAuth();

    const [content, setContent] = useState(card.content);
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
                            return card;
                        }

                        return {
                            ...card,
                            content: editedContent
                        }
                    })
                }
            });

            console.log(newNavCards);

            const response = await fetch(`${BASE_URL}/users/updateNavcard`, {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }),
                body: JSON.stringify({
                    navcards: newNavCards
                })
            });

            const { navcards } = await response.json();

            setNavCards(navcards);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setUpdating(false);
        }
    };

    const cancelEdit = () => {
        setEditedContent(content);
        setEditing(false);
    };

    return (
        <div className="flex dir-col g-0_5rem">
            <span className="text-large text-secondary">
                {card.heading}
            </span>
            {
                !editing
                    ? (
                        <div className="flex jc-between ai-center">
                            {content}
                            <button onClick={() => setEditing(true)} className="button has-icon is-outlined is-small">
                                <EditIcon />
                                Edit
                            </button>
                        </div>
                    )
                    : (
                        <div className="flex dir-col g-0_5rem">
                            {
                                error
                                    ? <div className="error-message">{error}</div>
                                    : null
                            }
                            <input
                                className="input"
                                type="text" 
                                value={editedContent}
                                onChange={e => setEditedContent(e.target.value)}
                                disabled={updating}
                            />
                            <div className="flex ai-center g-1rem">
                                <button
                                    className="button is-primary is-small"
                                    disabled={updating}
                                    onClick={handleUpdate}
                                >
                                    Save
                                </button>
                                <button onClick={cancelEdit} className="button is-danger is-small">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )
            }
        </div>
    )
};

export default function UpdateNavCards({ data }) {
    const [navCards, setNavCards] = useState(data);

    return (
        <>
            <h6 className="title">Navcards</h6>
            {
                navCards.map((navCard) => {
                    return (
                        <div className="section" key={navCard.name}>
                            <h6 className="title">{navCard.name}</h6>
                            {
                                navCard.cards.map((card, id) => (
                                    <EditableCard 
                                        card={card} 
                                        cards={navCard.cards}
                                        name={navCard.name}
                                        navCards={navCards}
                                        setNavCards={setNavCards} 
                                        key={id} 
                                    />
                                ))
                            }
                        </div>
                    )
                })
            }
        </>
    )
}