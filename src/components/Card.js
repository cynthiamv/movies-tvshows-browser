import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import RatingStars  from './RatingStars';
import imageNotAvailable from '../assets/noimage.png';

const StyledCard = styled.div`
  width: 200px;
  margin-right: 15px;
  flex: 0 0 auto;
  .image {
    display: flex;
    width: auto;
    overflow:hidden;
  }
  img {
    width: 100%;
    height: 100%;     
    transition: all 0.5s;  
    &:hover {
      transform: scale(1.05);
    } 
  }
  .title, .rating {
    display: none;
  }
  .image-cast {
    display: flex;
    width: auto;
    height: 75%;
  }
  .name {
    font-size: 1rem;
    margin-top: 5px;
  }
  .character {
    font-size: 0.875rem;
    margin-top: 10px;
    color: #808080;
  }
  &:hover {
    .title {
      color: #7b113a;
    }
  }
  @media(min-width: 992px) {
    width: 190px;
    .title {
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow-x: hidden;
      font-weight: 400;
      font-size: 16px;
      margin: 10px 0 0 0;
    }
    .rating {
      display: block;
    }
    .image {
      height: 75%;
    }
    .not-available {
      height: 82.5%;
    }
  }
`

const Card = ({ info, pathname, title }) => {
  const { media } = useParams();
  const cardImg = info.poster_path || info.profile_path;

  let route = '';

  if (title === "Cast") {
    route = `/person/${info.id}/overview`;
  } else if (info.media_type) {
    route = `/${info.media_type}/${info.id}/overview`;
  } else if (media) {
    route = `/${media}/${info.id}/overview`; 
  } else {
    route = `/${pathname}/${info.id}/overview`;
  };

  return (
    <StyledCard>
      <Link to={route}>    
        { cardImg 
            ? <div className={title === "Cast" ? "image-cast" : "image"}>
                <img src={`https://image.tmdb.org/t/p/w500/${cardImg}`} alt={`${info.title || info.name}`}/>
              </div>
            : <div className="not-available">
                <img src={imageNotAvailable} alt="Not Available" />
              </div>
        }
        <h2 className={(title === "Cast") ? "name" : "title"}>{info.title || info.name}</h2>

        {!(title === "Cast") &&
          <RatingStars averageVote={info.vote_average}/>
        }
        
        {title === "Cast" &&
          <h2 className="character">{info.character}</h2>
        }
      </Link>
    </StyledCard>
  )
};

export default Card;