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

import './App.css'
import { useState } from "react";
import { UserContext } from "./context/UserContext";
import usePersistedState from "./hooks/usePersistedState";

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
                        <Route path="/games/:gameId/edit" element={<GameEdit />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>

                </main>
            </div>
        </UserProvider>
    )
}

export default App
