import React from 'react';
import { API_URL_START, API_URL_END_LIST } from '../assets/constants';
import useFetch from '../hooks/useFetch';
import CardsContainer from './CardsContainer';
import Hero from './Hero';


const Home = () => {
  let heroData = useFetch(`${API_URL_START}trending/all/week${API_URL_END_LIST}`);
  const trendingMovies = useFetch(`${API_URL_START}trending/movie/week${API_URL_END_LIST}`);
  const trendingTvShows = useFetch(`${API_URL_START}trending/tv/week${API_URL_END_LIST}`);

  if(heroData) {
    heroData = heroData[Math.floor(Math.random() * heroData.length)]
  }

  return (
    heroData &&
      <>
        <Hero data={heroData} />
        <CardsContainer data={trendingMovies} title="Trending Movies"/>
        <CardsContainer data={trendingTvShows} title="Trending Tv Shows"/>
      </>
      
  )
}

export default Home;