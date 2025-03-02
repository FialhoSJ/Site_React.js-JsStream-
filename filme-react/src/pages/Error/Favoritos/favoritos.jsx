import './favoritos.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {
        const minhaLista = localStorage.getItem('@JsStream');
        setFilmes(JSON.parse(minhaLista) || []);
    }, []);

    function excluirFilme(id) {
        let filmesAtualizados = filmes.filter((filme) => filme.id !== id);
        setFilmes(filmesAtualizados);
        localStorage.setItem('@JsStream', JSON.stringify(filmesAtualizados));
        toast.success('Filme excluído com sucesso!');
    }

    return (
        <div className='meus-filmes'>
            <h1>Meus Filmes</h1>

            {filmes.length === 0 && <span>Você não tem nenhum filme salvo! :(</span>}

            <ul>
                {filmes.map((item) => (
                    <li key={item.id}>
                        <span>{item.title}</span>
                        <div>
                            <Link to={`/filme/${item.id}`}>Ver detalhes</Link>
                            <button onClick={() => excluirFilme(item.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Favoritos;
