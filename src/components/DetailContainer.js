import React, { useState } from 'react';
import { API_URL_START, API_URL_END_SINGLE } from '../assets/constants';
import { Link, useParams, Switch, Route, useLocation } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Hero from './Hero';
import Overview from './Overview';
import Episodes from './Episodes';
import Videos from './Videos';
import Photos from './Photos';
import Similar from './Similar';
import HeroOverview from './HeroOverview';
import styled from 'styled-components';

const NavDetailsStyled = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
` 
const ButtonStyled  = styled.button`
  color: ${props => props.isLocation ? '#FFF' : '#585858'};
  border-bottom: ${props => props.isLocation ? '2px solid #FFF' : 'none'};
  padding: 5px 0;
  font-size: 1rem;
  font-weight: 500;
  margin: 0 5px;
  transition: all 0.5s;
  &:hover {
    color: #FFF;
  }

  @media(min-width: 992px) {
    font-size: 1.375rem;
    margin: 0 30px;
  }
`

const DetailContainer = () => {
  const [ section, setSection ] = useState('overview');
  const { media, id } = useParams();
  const heroData = {
    movie: `${API_URL_START}movie/${id}${API_URL_END_SINGLE}&language=en-US&`,
    tv: `${API_URL_START}tv/${id}${API_URL_END_SINGLE}&language=en-US&`,
    person:`${API_URL_START}person/${id}${API_URL_END_SINGLE}&language=en-US&`
  }
  
  const heroDataInfo = useFetch(heroData[media]);
  
  const location = useLocation();
  const combinedCredits = useFetch(`${API_URL_START}person/${id}/combined_credits${API_URL_END_SINGLE}&language=en-US`)

  const handleClick = e => {
    setSection(e.target.id);
  }

  return (
    heroDataInfo &&
      <>
      {(media === "tv" || media === "movie") &&
        <Hero data={heroDataInfo} />
      }
      {media === "person" && 
          <HeroOverview data={heroDataInfo} media={media} id={id} />
      }
        <NavDetailsStyled>
          <Link to={`/${media}/${id}/overview`}>
            <ButtonStyled id="OVERVIEW" className="btn btn-nav-details"
              onClick={handleClick} isLocation={location.pathname.includes("overview") ? true : false}>
              {media === "person" ? "KNOWN FOR" : "OVERVIEW"}
            </ButtonStyled>
          </Link>
          {media === "tv" && 
            <Link to={`/${media}/${id}/episodes`}>
              <ButtonStyled id="EPISODES" className="btn btn-nav-details" 
                onClick={handleClick} isLocation={location.pathname.includes("episodes") ? true : false}>
                EPISODES
              </ButtonStyled>
            </Link>
          }
          {(media === "tv" || media === "movie") &&
            <Link to={`/${media}/${id}/videos`}>
              <ButtonStyled id="VIDEOS" className="btn btn-nav-details" 
                onClick={handleClick} isLocation={location.pathname.includes("videos") ? true : false}>
                VIDEOS
              </ButtonStyled>
            </Link>
          }
          <Link to={`/${media}/${id}/photos`}>
            <ButtonStyled id="PHOTOS" className="btn btn-nav-details" 
              onClick={handleClick} isLocation={location.pathname.includes("photos") ? true : false}>
              PHOTOS
            </ButtonStyled>
          </Link>
        </NavDetailsStyled>
        
        <Switch>
          <Route exact path="/:media/:id/overview" render={(props) => (<Overview data={heroDataInfo} combinedCreditsData={combinedCredits} media={media} id={id} /> )} />
          <Route exact path="/:media/:id/episodes" component={Episodes} />
          <Route exact path="/:media/:id/videos" component={Videos} />
          <Route exact path="/:media/:id/photos" component={Photos} />
        </Switch>
          
        {(media === "tv" || media === "movie") &&
          <Similar media={media} id={id} />
        }   
      </>
      
  )
}

export default DetailContainer;