import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import { toast } from 'react-toastify';

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            try {
                const response = await api.get(`/movie/${id}`, {
                    params: {
                        api_key: "326c396c9e9a78c691a4f48fc1d8f8cb",
                        language: "pt-BR",
                    }
                });
                setFilme(response.data);
                setLoading(false);
            } catch (error) {
                toast.error('Erro ao buscar filme');
                navigate("/", {replace: true});
            }
        }

        loadFilme();
    }, [id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@JsStream") || "[]";
        let filmesSalvos = JSON.parse(minhaLista);

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

        if(hasFilme){
            toast.warn("Você já possui esse filme salvo");
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@JsStream", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso");
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando filme...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="_blank" rel="noopener noreferrer" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`} >
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;
