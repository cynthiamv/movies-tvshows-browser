import React from 'react';
import { useParams } from 'react-router-dom';
import { API_URL_START, API_URL_END_SINGLE} from '../assets/constants';
import useFetch from '../hooks/useFetch';
import { PlayCircle } from '@styled-icons/feather/PlayCircle';
import styled from 'styled-components';


const VideosStyled = styled.div`
  margin: 20px 15px 30px 15px;
  .video-detail {
    margin-bottom: 30px;
    .img-wrapper {
      margin-bottom: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .icon-wrapper {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h2 {
      color: #FFF;
      font-size: 0.938rem;
      font-weight: 400;
      margin-bottom: 5px;
    }
    p {
      color: #80868b;
      font-size: 0.875rem;
    }
  }
  @media(min-width: 700px) {
    margin: 20px 40px 30px 40px;
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(330px,1fr));
    gap: 0.625rem;
  }
`

const PlayIcon = styled(PlayCircle)`
  width: 45px;
  height: 45px;
`
const Videos = () => {
  const { media, id } = useParams();
  const videosData = useFetch(`${API_URL_START}${media}/${id}/videos${API_URL_END_SINGLE}`);

  return (
    videosData &&
    <VideosStyled>
      {videosData.map((video, i) =>
        <div className="video-detail" key={i}>
          <a href={`https://youtube.com/watch?v=${video.key}`} target="_blank" rel="noopener noreferrer">
            <div className="img-wrapper">
              <img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt={video.name} />
              <div className="icon-wrapper">
                <PlayIcon />
              </div>
            </div>
            <h2>{video.name}</h2> 
            <p>{video.type}</p> 
          </a>
        </div>
      )}
    </VideosStyled>
 )   
}

export default Videos;