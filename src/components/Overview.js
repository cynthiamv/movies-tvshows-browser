import React from 'react';
import { API_URL_START, API_URL_END_SINGLE } from '../assets/constants';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Cast from './Cast';
import HeroOverview from './HeroOverview';
import Card from './Card';

const OverviewStyled = styled.div`
  .known-for-section {
    margin: 20px 15px;
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(125px,1fr));
    gap: 0.625rem;
    div {
      margin-right: 0;
      width: auto;
      .image {
        height: auto;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    h2, .rating  {
      display: none;
    }
  }
  @media(min-width: 700px) {
    margin: 20px 0;
    h2 {
      font-size: 1.375rem;
    }
    .known-for-section {
      grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
    }
  }
  @media(min-width: 992px) {
    .known-for-section {
      grid-template-columns: repeat(auto-fill,minmax(190px,1fr));
      h2, .rating {
        display: block;
      }
    }
  }
`


const Overview = ({ data, combinedCreditsData }) => {
  const params = useParams();
  const media = params.media;
  const id = params.id

  const credits = useFetch(`${API_URL_START}${media}/${id}/credits${API_URL_END_SINGLE}`);

  const cast =  credits && credits.cast;

  const personCredits = (media === "person" && combinedCreditsData) && combinedCreditsData;

  const knownFor = (media === "person" && data) && data.known_for_department;

  let personCreditsFiltered;

  if (knownFor === "Acting") {
    personCreditsFiltered = combinedCreditsData && personCredits.cast;
  } else if(knownFor === "Directing") {
    personCreditsFiltered = combinedCreditsData && personCredits.crew.filter(element => element.department === "Directing");
  } else if(knownFor === "Writing" || knownFor === "Creator") {
    personCreditsFiltered = combinedCreditsData && personCredits.crew.filter(element => element.department === "Writing");
  } else if(knownFor === "Production") {
    personCreditsFiltered = combinedCreditsData && personCredits.crew.filter(element => element.department === "Production");
  } 

  personCreditsFiltered && personCreditsFiltered.sort((first, second) => first.vote_count > second.vote_count ? -1 : 1);

  return (
    data 
      ? <OverviewStyled>
        {(media === "tv" || media === "movie")  &&
        <>
          <HeroOverview data={data} media={media} id={id} />
          <Cast data={cast} />
        </>
        }
        {media === "person" &&
          <div className="known-for-section">
            {personCreditsFiltered && personCreditsFiltered.map((element, i) => <Card info={element} key={i} />)}
          </div>
        }
 
        </OverviewStyled>
      : <p>Loading...</p>
  )
}

export default Overview;