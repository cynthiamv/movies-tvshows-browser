import React, { useState} from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';
import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft';
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight';
import styled from 'styled-components';

const StyledCardContainer = styled.section`
  color: #FFF;
  margin: 20px 15px;
  
  .section-title {
    display: flex;
    align-items: baseline;
    margin-bottom: 15px;
    h2 {
      font-weight: 500;
      font-size: 1.13rem;
    }
  }
  .list-container {
    position: relative;
  }
  .list {
    display: flex;
    overflow: hidden;
    height: 300px;
  }

  .list-cast {
    display: flex;
    overflow: hidden;
    height: 355px;
  }
  button {
    position: absolute;
    top: 40%;
    z-index: 1;
    background-color: #000000a6;
  }
  .btn-prev {
    left: 0;
  }
  .btn-next {
    right: 0;
  }
  @media(min-width: 700px) {
    margin: 20px 45px 0px 45px;
  }
  @media(min-width: 700px) {
    .list {
      height: 360px
    }
  }
  @media(min-width: 1200px) {
    margin: 20px 45px 45px 45px;
    .section-title {
      h2 {
        font-size: 1.4rem;
      }
    }
  }
`
const ChevronLeftIcon = styled(ChevronLeft)`
  width: 50px;
  height: 50px;
  color: #FFF;
`

const ChevronRightIcon = styled(ChevronRight)`
  width: 50px;
  height: 50px;
  color: #FFF;
`

const CardsContainer = ({ data, title }) => {
  let { pathname } = useLocation();
  pathname = pathname.slice(1);

  const [ currentImage, setCurrentImage ] = useState(0);
  const prevSlide = () => {
    const resetToStart = currentImage === 0;
    const index = resetToStart ? data.length - 1 : currentImage - 1;
    setCurrentImage(index);
  };

  const nextSlide = () => {
    const resetIndex = currentImage === data.length - 1;
    const index = resetIndex ? 0 : currentImage + 1;
    setCurrentImage(index);
  }

  const activeCards = data && data.slice(currentImage, currentImage + 6);

  const imagesToDisplay = activeCards && activeCards.length < 6
    ? [...activeCards, ...data.slice(0, 6 - activeCards.length) ]
    : activeCards;

  return (
    <StyledCardContainer>
      <div className="section-title">
        <h2>{title}</h2>
      </div>
      { data &&
        <div className="list-container">
          <button className="btn-prev" onClick={prevSlide}><ChevronLeftIcon /></button>
          <div className={(title === "Cast") ? "list-cast" : "list"}>
            {imagesToDisplay.map((card, index) => <Card info={card} key={card.id} pathname={pathname} title={title} style={{ maxWidth: '15%' }}/> )}
          </div>
          <button className="btn-next" onClick={nextSlide}><ChevronRightIcon /></button>
        </div>
      }
    </StyledCardContainer>
  )
}

export default CardsContainer;