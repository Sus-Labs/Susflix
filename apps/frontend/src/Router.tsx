import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home";
import Watch from "./pages/Watch";
import Movies from "./pages/home/Movies";
import Shows from "./pages/home/Shows";

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate replace to={"/home"} />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/movies" element={<Movies />} />
                    <Route path="/home/shows" element={<Shows />} />
                    <Route path="/home/watch/:content_id" element={<Watch />} />
                    {/* 404 Page */}
                    <Route path="*" element={<>Nothing here.</>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Router;
