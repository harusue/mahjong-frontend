import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home'
import Game from './components/Game';
import Result from './components/result'
import { WebSocketProvider } from './components/WebSocketProvider';

function App() {
    // const [token, setToken] = useState(null);

    return (
        <WebSocketProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/game" element={<Game  />} />
                        <Route path="/result" element={<Result  />} />
                    </Routes>
                </div>
            </Router>
        </WebSocketProvider>
    );
}

export default App;
