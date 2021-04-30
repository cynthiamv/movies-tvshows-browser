import React from 'react';
import { API_URL_START, API_URL_END_SINGLE } from '../assets/constants';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import getFullDate from '../utils/getFullDate.js';
import getAge from '../utils/getAge.js';
import styled from 'styled-components';
import ExternalLinks from './ExternalLinks';
import ListItem from './ListItem';

const OverviewStyled = styled.div`
  color: #FFF;
  .overview-container {
    margin: 20px 15px 30px 15px;
  }
  .left {
    display: none;
  }
  .storyline {
    h2 {
      font-size: 1.125rem;
      font-weight: 400;
      margin-bottom: 16px;
    }
    p {
      font-size: 0.938rem;
      line-height: 1.6;
    }
  }
  .details {
    margin: 20px 0;
    font-size: 0.938rem;
    li {
      display: flex;
      margin: 10px 0;
      .label {
        flex: 1;
        max-width: 90px;
        margin-right: 24px;
      }
      .value {
        flex: 2;
      }
    }
  }
  @media(min-width: 700px) {
    margin-top: 40px;
    .overview-container{
      margin: 20px 15px 40px 45px;
      display: flex;
    }
    .storyline {
      h2 {
        font-size: 1.375rem;
      }
      p {
        font-size: 1rem;
      }
    }
    .details {
      font-size: 1rem;
      display: flex;
      ul {
        width: 50%;
        .label {
          max-width: 100px;
        }
      }
      details-left {
        margin-right: 20px;
      }
    }
  }
  @media(min-width: 992px){
    .left {
      display: block;
      width: 22%;
      max-width: 400px;
      margin-right: 20px;
      .img-wrapper {
        position: relative;
        height: 0;
        padding-top: 150.27%;
        overflow: hidden;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
      
    }
    .info {
      max-width: 73%;
    }
  }
`

const Overview = ({ data }) => {
  const params = useParams();
  const media = params.media;
  const id = params.id;
  const isPerson = media === "person";
  const isTv = media === "tv";
  const isMovie = media === "movie";
  
  const title = isPerson ? data.name : 'Storyline';
  const releaseDate = data.first_air_date || data.release_date;
  const fullReleaseDate = getFullDate(releaseDate);
  const runtime = data.episode_run_time ? data.episode_run_time.map(duration => duration) : data.runtime;
  const genres = data.genres && data.genres.map(genre => genre.name).join(', ');
  const languages = data.languages ? data.languages.map(language => language).join(', ') : data.original_language;
  const lastAiredDate = data.last_air_date && getFullDate(data.last_air_date);
  const networks = data.networks && data.networks.map(network => network.name).join(', ');
  const productions = data.production_companies && data.production_companies.map(production => production.name).join(', ');
  const creators = data.created_by && data.created_by.map(person => person.name).join(', ');

  const credits = useFetch(`${API_URL_START}${media}/${id}/credits${API_URL_END_SINGLE}`);
  const crew = credits && credits.crew;
  let director;
  credits && crew.forEach((person, i) => {
    if(person.job === "Director") {
      director = person.name;
    }
  })

  const isDead = data.deathday;
  const birthday = getFullDate(data.birthday);
  const deathday = getFullDate(data.deathday);
  const age = data.deathday ? getAge(data.birthday, isDead, data.deathday) : getAge(data.birthday, isDead);
  const aged = data.deathday && age;

  return (
    data 
      ? <OverviewStyled>
          <section className="overview-container">
            <div className="left">
              <div className="img-wrapper">
                <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path || data.profile_path}`} alt={`${data.title || data.name}`}/>
              </div>
            </div>
            <div className="info">
              <div className="storyline">
                  <h2>{title}</h2>
                <p>{data.overview || data.biography}</p>
              </div>
              {isMovie &&
                <div className="details">
                  <ul className="details-left">
                    <ListItem label="Release Date" value={fullReleaseDate} />
                    <ListItem label="Runtime" value={runtime} unit="min" />
                    <ListItem label="Genre" value={genres} />
                    <ListItem label="Language" value={languages} />
                  </ul>
                  <ul className="details-right">
                    <ListItem label="Director" value={director} />
                    <ListItem label="Budget" value={data.budget} />
                    <ListItem label="Production" value={productions} />
                    <ListItem label="Status" value={data.status} />
                  </ul>
                </div>
              }
              {isTv &&
                <div className="details">
                  <ul className="details-left">
                    <ListItem label="First Aired" value={fullReleaseDate} />
                    <ListItem label="Runtime" value={runtime} unit="min" />
                    <ListItem label="Genre" value={genres} />
                    <ListItem label="Episodes" value={data.number_of_episodes} />
                    <ListItem label="Language" value={languages} />
                  </ul>
                  <ul className="details-right">
                    <ListItem label="Last Aired" value={lastAiredDate} />
                    <ListItem label="Seasons" value={data.number_of_seasons} />
                    <ListItem label="Creator" value={creators} />
                    <ListItem label="Network" value={networks} />
                    <ListItem label="Status" value={data.status} />
                  </ul>
                </div>
              }
              {isPerson &&
                <div className="details">
                  <ul className="details-left">
                    <ListItem label="Known For" value={data.known_for_department} />
                    <ListItem label="Place of Birth" value={data.place_of_birth}/>
                  </ul>
                  <ul className="details-right">
                    {aged 
                      ? <>
                          <ListItem label="Born" value={birthday}/>
                          <ListItem label="Died" value={deathday} aged={aged}/>
                        </>
                      : <ListItem label="Born" value={birthday} age={age} />
                    }
                  </ul>
                </div>
              }
          
              <ExternalLinks data={data} media={media} id={id} />
            </div>
          </section>
        </OverviewStyled>
      : <p>Loading...</p>
  )
}

export default Overview;