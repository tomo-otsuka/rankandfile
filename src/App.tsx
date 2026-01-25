import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Home from './pages/Home';
import Ranker from './pages/Ranker';
import Dashboard from './pages/Dashboard';
import Compare from './pages/Compare';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/rank" element={<Ranker />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/compare" element={<Compare />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;
