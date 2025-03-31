import { Link, useNavigate, useParams } from "react-router";
import CreateComments from "../create-comments/CreateComments";
import ShowComments from "../show-comments/ShowComments";
import { useDeleteGame, useGame } from "../../api/gameApi";
import useAuth from "../../hooks/useAuth";
import { useComments, useCreateComment } from "../../api/commentApi";

export default function GameDetails() {
    const navigate = useNavigate()
    const { email, _id: userId } = useAuth()
    const { gameId } = useParams();
    const { game } = useGame(gameId);
    const { deleteGame } = useDeleteGame()
    const { create } = useCreateComment()
    const { comments, addComment } = useComments(gameId)

    const gameDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete this ${game.title} game?`)

        if (!hasConfirm) return;

        await deleteGame(gameId)

        navigate('/games')
    }

    const commentCreateHandler = async (comment) => {
        const newComment = await create(gameId, comment)
        const commentResult = await create(gameId, comment)

        // setComments(state => [...state, commentResult])
        addComment(commentResult)
    }

    const isOwner = userId === game._ownerId

    return (
        // <!--Details Page-->
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">
                    {game.summary}
                </p>

                <ShowComments comments={comments} />

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                        <button onClick={gameDeleteClickHandler} className="button">Delete</button>
                    </div>
                )}
                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}

            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}

            <CreateComments email={email} gameId={gameId} onCreate={commentCreateHandler} />

        </section>
    )
}