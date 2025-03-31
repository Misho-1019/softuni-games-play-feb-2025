import { Routes, Route } from "react-router";

import Header from './components/header/Header'
import Home from './components/home/Home'
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import GameCatalog from "./components/game-catalog/GameCatalog";
import GameCreate from "./components/game-create/GameCreate";
import GameDetails from "./components/game-details/GameDetails";
import GameEdit from "./components/game-edit/GameEdit";
import { UserProvider } from "./providers/UserProvider";
import AuthGuard from "./components/guards/AuthGuard";

import './App.css'
import AuthGuardBasic from "./components/guards/AuthGuardBasic";

function App() {
    return (
        <UserProvider>
            <div id="box">
                <Header />

                {/* <!-- Main Content --> */}
                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/games" element={<GameCatalog />} />
                        <Route path="/games/:gameId/details" element={<GameDetails />} />
                        <Route element={<AuthGuard />} >
                            <Route path="/games/create" element={<GameCreate />} />
                            <Route path="/games/:gameId/edit" element={<GameEdit />} />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                        <Route element={<AuthGuardBasic />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                    </Routes>

                </main>
            </div>
        </UserProvider>
    )
}

export default App
