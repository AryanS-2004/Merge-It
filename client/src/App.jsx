import './App.css';
import { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import IssuesPage from "./pages/IssuesPage.jsx";
import { createRouter } from '@vercel/analytics';

const router = createRouter();

function App() {
    useEffect(() => {
        // Track pageviews on route change
        const unlisten = router.listen((url) => {
            console.log('Pageview', url);
            // You can also send the pageview event to an analytics service of your choice here.
        });

        // Unsubscribe from the router listener when the component unmounts
        return () => {
            unlisten();
        };
    }, []);

    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/issues" element={<IssuesPage />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
