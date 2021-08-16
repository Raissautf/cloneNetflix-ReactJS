const API_KEY =  'ee1624a3de19551b67935e4f88df50f2';
const API_BASE = 'https://api.themoviedb.org/3/';

const basicFetch = async (endpoint) => { 
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}
export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/trending/movie/week?language=pt-BR&api_key=${API_KEY}`)
            }, 
            {
                slug: 'trending',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/tv/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'Toprated',
                title: 'Em Alta',
                items: await basicFetch(`/trending/movie/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/trending/tv/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
        ];
    },
    getMovieInfo: async (movieId, type) => { // pegando mais informações na API do film ou série escolhido 
        let info = {};
        if(movieId) { // verificar se mandou o id
            switch(type) { // tipo se é filme ou serie
                case  'movie':
                    info = await basicFetch(`/movie/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                case 'tv':
                    info = await basicFetch(`tv/${movieId}?language=pt-BR&api_key=${API_KEY}`)
                break;
                default: 
                    info = null;
                break;
            }
        }
        return info; // retornar o valor
    }

}