import React, { useState } from 'react';
import getNumericYear from '../utils/getNumericYear.js';
import useFetch from '../hooks/useFetch';
import { API_URL_START,  API_URL_END_SINGLE } from '../assets/constants';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Play } from '@styled-icons/boxicons-regular/Play';
import RatingStars from './RatingStars';
import VideoModal from './VideoModal';

const HeroStyled = styled.section`
  /* background: linear-gradient(to top,black,black,transparent 40%), url(${({ img }) => `https://image.tmdb.org/t/p/w300/${img}`}); */
  /* height: 350px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #000;
  color: #FFF;
  .img-wrapper {
    width: 100%;
    flex: 1 1 auto;
    /* max-height: 215px; */
    position: relative;
    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }
  .info-container {
    margin: 10px 0 10px 15px;
  }
  h1, .reviews, .date, .watch-trailer {
    margin-bottom: 10px;
  }
  h1 {
    font-weight: 400;
    font-size: 1.5rem;
  }
  .details {
    color: #999;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
  }
  .reviews {
    margin-right: 15px;
    display: flex;
    align-items: center;
  }
  .description {
    display: none;
  }
  .watch-trailer {
    background-color: #7b113a;
    color: #FFF;
    padding: 10px 15px;
    border-radius: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #7b113a;
    transition: all 0.5s;
    &:hover {
      background-color: #FFF;
      color: #7b113a;
      font-weight: 500;
      svg {
        color: #7b113a;
      }
    }
  }
  

  @media(min-width: 700px) {
    .info-container {
      margin: 10px 0 10px 45px;
    }
  }
  @media(min-width: 992px) {
    /* background: linear-gradient(to right, black, black, transparent 60%), url(${({ img }) => `https://image.tmdb.org/t/p/w1280/${img}`}); */
    height: 550px;
    margin-bottom: 50px;
    position: relative;
    z-index: 1;
    .img-wrapper {
      min-height: 550px;
      display: flex;
      justify-content: flex-end;
      img {
        width: 80%;
        height: 550px;
        object-fit: cover;
      }
    }
    .info-container {
      background: linear-gradient(to right, black, black, #00000000 60%);
      position: absolute;
      z-index: 1;
      height: 550px;
      padding: 0 45% 0 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;
    }
    h1 {
      font-size: 2.3rem;
    }
    .details {
      font-size: 1rem;
      display: flex;
    }
    
    .description {
      display: block;
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 32px;
    }
    button {
      width: 200px;
      font-size: 1rem;
    }
  }
  @media(min-width: 1680px) { 
    margin-bottom: 85px;
    height: 650px;
    .img-wrapper, .info-container {
      height: 650px;
      img {
        height: 650px;
      }
    }
  }
`

const PlayIcon = styled(Play)`
  width: 17px;
  color: #FFF;
  margin-right: 5px;
  
  @media(min-width: 992px) {
    width: 25px;
  }
`

const Hero = ({ data }) => {
  const date = data && (data.first_air_date || data.release_date)
  const year = getNumericYear(date);
  const videos = useFetch(`${API_URL_START}${data.original_name ? 'tv' : 'movie'}/${data.id}/videos${API_URL_END_SINGLE}&language=en-US`)
  const video = videos && videos[0].key;

  const [hidden, setHidden] = useState(true);

  const openVideo = () => {
    setHidden(!hidden);
  }

  return (
    data &&
    <HeroStyled>
      <div className="img-wrapper">
        <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt={data.name || data.title} />
      </div>
      <div className="info-container">
        <h1>
          <Link to={`/${data.media_type}/${data.id}/overview`}>
            {data.name} {data.title}
          </Link>
        </h1>
        <div className="details">
          <div className="reviews">
            <RatingStars averageVote={data.vote_average}/>
            <span>{data.vote_count} Reviews</span>
          </div>
          <div className="date">
            <span>{year}</span>
          </div>
        </div>
        <p className="description">{data.overview}</p>
        <button className="btn watch-trailer" onClick={openVideo}>
          <PlayIcon className="icon"></PlayIcon>
          Watch Trailer
        </button>
      </div>
      <VideoModal hidden={hidden} openVideo={openVideo} videoId={video} />
    </HeroStyled>
  
  )
}

export default Hero;