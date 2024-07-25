import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home'
import Game from './components/Game';
import Result from './components/result'
import { WebSocketProvider } from './components/WebSocketProvider';

function App() {
    const [token, setToken] = useState(null);

    return (
        <WebSocketProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game" element={<Game token={token} />} />
                        <Route path="/result" element={<Result token={token} />} />
                    </Routes>
                </div>
            </Router>
        </WebSocketProvider>
    );
}

export default App;
