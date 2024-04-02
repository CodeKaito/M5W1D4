import React, { useState, useEffect, useContext } from "react";
import { Spinner } from "react-bootstrap";
import CommentList from './CommentList';
import AddComment from './AddComment';
import { ThemeContext } from "../../context/ThemeContextProvider";

export default function CommentArea( {book, isHomepage} ) {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState({ comment: '', rate: '', elementId: book.asin });

    const { value } = useContext(ThemeContext);
    
    async function fetchComments() {

        try {
            setLoading(true);
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/books/${book.asin}/comments/`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YmE1ZDljNDM3MDAwMTkzYzM2MzAiLCJpYXQiOjE3MTA2NzM2NTcsImV4cCI6MTcxMTg4MzI1N30.OhI7AQpUeYhuOn8A7o5bMFIwyI8txnZ374dX8P8tII0"
                } 
            });
            if (!response.ok) {
                throw new Error('Errore durante il recupero delle recensioni');
            }
            const data = await response.json();
            setLoading(false);
            setComments(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [book.asin]);

    async function handleAddComment() {
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YmE1ZDljNDM3MDAwMTkzYzM2MzAiLCJpYXQiOjE3MTIwNjAyMjEsImV4cCI6MTcxMzI2OTgyMX0.9xYZF13iY-8U1S2nVrQM1ZTKQBQZ8GVHn6zvuZaN2As"
                },
                body: JSON.stringify(newComment)
            });
            if (!response.ok) {
                throw new Error('Errore durante l\'invio della recensione');
            }
            // Aggiorna la lista dei commenti dopo l'aggiunta di una nuova recensione
            fetchComments();
        } catch (error) {
            setError(error.message);
        }
    };

    async function onEdit (editedComment) {
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${editedComment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YmE1ZDljNDM3MDAwMTkzYzM2MzAiLCJpYXQiOjE3MTIwNjAyMjEsImV4cCI6MTcxMzI2OTgyMX0.9xYZF13iY-8U1S2nVrQM1ZTKQBQZ8GVHn6zvuZaN2As"
                },
                body: JSON.stringify(editedComment)
            });
            if (!response.ok) {
                throw new Error('Errore durante l\'aggiornamento della recensione');
            }
            // Aggiorna la lista dei commenti dopo la modifica di una nuova recensione
            fetchComments();
        } catch (error) {
            setError(error.message);
        }
    };

    async function onDelete (id) {
        try {
            const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0YmE1ZDljNDM3MDAwMTkzYzM2MzAiLCJpYXQiOjE3MTIwNjAyMjEsImV4cCI6MTcxMzI2OTgyMX0.9xYZF13iY-8U1S2nVrQM1ZTKQBQZ8GVHn6zvuZaN2As"
                }
            });
            if (!response.ok) {
                throw new Error('Errore durante la cancellazione della recensione');
            }
            // Aggiorna la lista dei commenti dopo la cancellazione di una nuova recensione
            fetchComments();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={`bg-${value}`}>
            <h2 className={`pb-2 text-center fw-bold text-${value === "dark" ? "light" : "dark"}`}>RECENSIONI</h2>
            {error && <p>Errore: {error}</p>}
            <div>
                {loading ? ( // Mostra lo spinner se il caricamento è in corso
                    <Spinner animation="border" role="status" variant={value === "dark" ? "light" : "dark"}>
                        <span className="visually-hidden">Caricamento in corso...</span>
                    </Spinner>
                    ) : (
                    <CommentList 
                        comments={comments} 
                        onEdit={onEdit} 
                        onDelete={onDelete}/>
                )}
                <AddComment
                    newComment={newComment}
                    book={book}
                    setNewComment={setNewComment}
                    handleAddComment={handleAddComment}
                    isHomepage={isHomepage}
                />
            </div>
        </div>
    );
}
