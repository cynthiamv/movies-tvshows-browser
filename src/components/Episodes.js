import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { API_URL_START, API_URL_END_SINGLE } from '../assets/constants';
import { useParams } from 'react-router-dom';
import getFullDate from '../utils/getFullDate.js';
import styled from 'styled-components';

const EpisodesStyled = styled.div`
  margin: 20px 15px 30px 15px;
  color: #FFF;
  select {
    border: none;
    background-color: #7b113a;
    color: #FFF;
    padding: 5px;
    font-family: 'Roboto', sans-serif;
  }
  .episodes-container {
    margin-top: 15px;
    .episode {
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 100%;
      }
      .details-header {
        margin: 10px 0;
        display: flex;
        align-items:center;
        p {
          color: #7b113a;
          font-size: 1rem; 
          font-weight: 700;
          margin-right: 10px;
        }
        h2 {
          font-weight: 400;
          font-size: 1rem;
        }
      }
      .overview {
        font-size: 0.875rem;
        overflow: hidden;
        line-height: 1.2rem;
        max-height: 9rem;
        -webkit-box-orient: vertical;
        display: block;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 5;
        margin-bottom: 10px;
      }
      .air-date {
        font-size: 0.75rem;
        color: #80868b;
      }
    }
  }
  @media(min-width: 700px) {
    margin: 20px 40px 30px 40px;
    .episodes-container {
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(330px,1fr));
      gap: 0.625rem;
    }
  }
`

const Episodes = () => {

  const params = useParams();
  
  const details = useFetch(`${API_URL_START}tv/${params.id}${API_URL_END_SINGLE}`);

  const  seasons = details && details.seasons;

  const [selectedSeason, setSelectedSeason] = useState(1);

  const filterOptions = seasons && (seasons.length  === 1 ? seasons : seasons.slice(1, seasons.length))
  const selectOptions  = filterOptions && filterOptions.map((e, i) => <option value={e.season_number} key={i}>Season {e.season_number}</option>);
  const episodesData = useFetch(`${API_URL_START}tv/${params.id}/season/${selectedSeason}${API_URL_END_SINGLE}&language=en=US`);

  const handleChange = e => {
    setSelectedSeason(e.target.value);
  }

  return (
    <EpisodesStyled>
      <form>
        <select value={selectedSeason} onChange={handleChange}>
          {selectOptions}
        </select>
      </form>
      <div className="episodes-container">
      {episodesData &&
        episodesData.episodes.map((episode, i) => 
          <div className="episode" key={i}>
            <div className="img-wrapper">
              <img src={`https://image.tmdb.org/t/p/w500/${episode.still_path}`} alt={episode.name} />
            </div>
            <div className="episode-details">
              <div className="details-header">
                <p>
                  {episode.episode_number < 9 ? "E0" : "E"}
                  {episode.episode_number}
                </p>
                <h2 className="title">{episode.name}</h2>
              </div>
              <p className="overview">{episode.overview}</p>
              <p className="air-date">{getFullDate(episode.air_date)}</p>
            </div>
          </div>
      )}
      </div>
    </EpisodesStyled>
  )
}

export default Episodes;