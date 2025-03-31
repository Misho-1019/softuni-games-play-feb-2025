import { useLatestGames } from "../../api/gameApi"

export default function Home() {
    const { latestGames } = useLatestGames()


    return (
        // <!--Home Page-->
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="/images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {/* <!-- Display div: with information about every game (if any) --> */}
                {latestGames.map(game => (

                    <div className="game" key={game._id}>
                        <div className="image-wrap">
                            <img src={game.imageUrl} />
                        </div>
                        <h3>{game.title}</h3>
                        <div className="rating">
                            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                        </div>
                        <div className="data-buttons">
                            <a href={`/games/${game._id}/details`} className="btn details-btn">Details</a>
                        </div>
                    </div>
                ))}

                {latestGames.length === 0 && <p className="no-articles">No games yet</p>}

                {/* <!-- Display paragraph: If there is no games  --> */}
            </div>
        </section>
    )
}