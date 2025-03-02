import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './pages/Home/home';    
import Filme from './pages/filme/filme';
import Header from './components/Header/header';    
import Error from './pages/Error/error';
import Favoritos from './pages/Error/Favoritos/favoritos';

function RoutesApp(){
    return(
        <BrowserRouter>
        <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/filme/:id' element={<Filme />} />
                <Route path='/favoritos' element={<Favoritos />} />

                <Route path='*' element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;