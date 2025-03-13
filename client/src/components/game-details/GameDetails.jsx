import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router";
import gameService from "../../services/gameService"
import CreateComments from "../create-comments/CreateComments";
import ShowComments from "../show-comments/ShowComments";

export default function GameDetails({
    email,
}) {
    const navigate = useNavigate()
    const [game, setGame] = useState({})
    const { gameId } = useParams();

    useEffect(() => {
        gameService.getOne(gameId)
            .then(setGame)
    }, [gameId])

    const gameDeleteClickHandler = async () => {
        const hasConfirm = confirm(`Are you sure you want to delete this ${game.title} game?`)

        if (!hasConfirm) return;

        await gameService.delete(gameId)

        navigate('/games')
    }

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

                <ShowComments />

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                <div className="buttons">
                    <Link to={`/games/${gameId}/edit`} className="button">Edit</Link>
                    <button onClick={gameDeleteClickHandler} className="button">Delete</button>
                </div>
            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}

            <CreateComments email={email} gameId={gameId} />

        </section>
    )
}