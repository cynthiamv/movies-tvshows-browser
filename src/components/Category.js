import React from 'react';
import { API_URL_START,  API_URL_END_LIST } from '../assets/constants';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Hero from './Hero';
import CardsContainer from './CardsContainer';

const Category = () => {
  const params = useParams();
  const mediaType = params.media;
  const isMovie = mediaType === "movie";

  const data = {
    heroMovie: useFetch(`${API_URL_START}trending/movie/week${API_URL_END_LIST}`),
    popularMovies: useFetch(`${API_URL_START}movie/popular${API_URL_END_LIST}`),
    topRatedMovies: useFetch(`${API_URL_START}movie/top_rated${API_URL_END_LIST}`),
    upcomingMovies: useFetch(`${API_URL_START}movie/upcoming${API_URL_END_LIST}`),
    nowPlayingMovies: useFetch(`${API_URL_START}movie/now_playing${API_URL_END_LIST}`),
    heroTvShows: useFetch(`${API_URL_START}trending/tv/week${API_URL_END_LIST}`),
    popularTvShows: useFetch(`${API_URL_START}tv/popular${API_URL_END_LIST}`),
    topRatedTvShows: useFetch(`${API_URL_START}tv/top_rated${API_URL_END_LIST}`),
    currentlyAiringTvShows: useFetch(`${API_URL_START}tv/on_the_air${API_URL_END_LIST}`),
    airingTodayTvShows: useFetch(`${API_URL_START}tv/airing_today${API_URL_END_LIST}`)
  }

  if(data.heroMovie) {
    data.heroMovie = data.heroMovie[Math.floor(Math.random() * data.heroMovie.length)]
  }

  if(data.heroTvShows) {
    data.heroTvShows = data.heroTvShows[Math.floor(Math.random() * data.heroTvShows.length)]
  }

  return (
    data &&
    <>
      {(data.heroMovie || data.heroTvShows) &&
        <Hero data={isMovie ? data.heroMovie : data.heroTvShows} />
      }
      {(data.popularMovies || data.popularTvShows) &&
        <CardsContainer
          data={isMovie ? data.popularMovies : data.popularTvShows}
          title={isMovie ?
            "Popular Movies"
            :
            "Popular Tv Shows"}
          mediaType={mediaType}
        />
      }

    {(data.topRatedMovies || data.topRatedTvShows) &&
      <CardsContainer
        data={isMovie ? data.topRatedMovies : data.topRatedTvShows}
        title={isMovie ?
          "Top Rated Movies"
          :
          "Top Rated Tv Shows"}
        mediaType={mediaType}
      />
    }
    {(data.upcomingMovies || data.currentlyAiringTvShows) &&
      <CardsContainer
        data={isMovie ? data.upcomingMovies : data.currentlyAiringTvShows}
        title={isMovie ?
          "Upcoming Movies"
          :
          "Currently Airing TV Shows"}
        mediaType={mediaType}
      />
    }
      {(data.nowPlayingMovies || data.airingTodayTvShows) &&
        <CardsContainer
          data={isMovie ? data.nowPlayingMovies : data.airingTodayTvShows}
          title={isMovie ?
            "Now Playing Movies"
            :
            "TV Shows Airing Today"
          }
          mediaType={mediaType}
        />
      }
    </>

  );
}

export default Category;