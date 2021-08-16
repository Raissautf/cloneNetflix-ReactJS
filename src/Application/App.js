import React, {useEffect, useState} from 'react';
import Tmdb from '../Services/Tmdb';
import './App.css';
import MovieRow from '../components/Movies/MovieRow';
import FeaturedMovie from '../components/Featured/FeaturedMovie';
import Header from '../components/Header/Header';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null); 
  const [blackHeader, setBlackHeader] = useState(false); 


  useEffect(() => { 
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list); 

     
      let originals = list.filter(i=>i.slug === 'trending'); 
      let randomChosen = Math.floor(Math.random() * (originals[0]?.items.results.length - 1 )); 
      let chosen = originals[0]?.items.results[randomChosen]; 
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
    setFeaturedData(chosenInfo); 
    }
    loadAll(); 
  }, []);

  useEffect(()=>{ 
    const scrolListener = () => { 
      if(window.scrollY > 10) { 
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrolListener);
    return() => { 
      window.removeEventListener('scroll', scrolListener);
    }

  }, []);


  return (
    <div className="page"> 
      <Header black={blackHeader} /> 
      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }
      <section className="lists">
        {movieList.map((item, key)=>(
           <MovieRow key={key} title={item.title} items={item.items} /> 
        ))} 
      </section>
      <footer>
        Feito com <span role="img" aria-label="coração"> ❤ </span> pela B7Web <br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org
      </footer>
    </div> 
   
  );
}
