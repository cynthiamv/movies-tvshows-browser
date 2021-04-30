import React from 'react';
import styled from 'styled-components';

const RatingStarsStyled = styled.div`
  font-size: 26px;
  margin: 0 10px 7px 0;

  &::before {
    content: '★★★★★';
    background: ${({ average }) => `linear-gradient(90deg, #7b113a ${average}%, #fff ${average}%)`};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  };
 
`
const RatingStars = ({ averageVote }) => {
  const averagePercentage = averageVote * 10;

  return(
    <div className="rating">
      <RatingStarsStyled average={averagePercentage} />
    </div>
  )
}

export default RatingStars;