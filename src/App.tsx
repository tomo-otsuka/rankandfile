import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Ranker from './pages/Ranker';
import GlobalLeaderboard from './pages/GlobalLeaderboard';
import Dashboard from './pages/Dashboard';
import Leagues from './pages/Leagues';
import Compare from './pages/Compare';
import PlayerPage from './pages/PlayerPage';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/rank" element={<Ranker />} />
                    <Route path="/rank/:rankId" element={<Ranker />} />
                    <Route path="/player/:playerId" element={<PlayerPage />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/leaderboard" element={<GlobalLeaderboard />} />
                    <Route path="/leagues" element={<Leagues />} />
                    <Route path="/leagues/:leagueId" element={<Leagues />} />
                    <Route path="/compare" element={<Compare />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
