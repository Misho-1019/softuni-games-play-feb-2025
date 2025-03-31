import { useEffect, useReducer, useState } from "react";
import useAuth from "../hooks/useAuth";

const baseUrl = 'http://localhost:3030/data/comments';

function commentsReducer(state, action) {
    switch (action.type) {
        case 'ADD_COMMENT':
            return [...state, action.payload]
        case 'GET_ALL':
            return action.payload;
        default:
            return state;
    }
}

export const useComments = (gameId) => {
    // const [comments, setComments] = useState([])
    const [comments, dispatch] = useReducer(commentsReducer, [])

    useEffect(() => {
        const searchParams = new URLSearchParams({
            where: `gameId="${gameId}"`
        })

            .then(result => dispatch({type: 'GET_ALL', payload: result}))

    return {
        comments,
        addComment: (commentData) => dispatch({type: 'ADD_COMMENT', payload: commentData}),
    }
}

export const useCreateComment = () => {
    const { request } = useAuth()

    const create = (gameId, comment) => {
        const commentData = {
            gameId,
            comment,
        }

        return request.post(baseUrl, commentData)
    }

    return {
        create,
    }
}