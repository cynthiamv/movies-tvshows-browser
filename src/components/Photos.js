import React from 'react';
import { useParams } from 'react-router-dom';
import { API_URL_START, API_URL_END_SINGLE} from '../assets/constants';
import useFetch from '../hooks/useFetch';
import styled from 'styled-components';

const PhotosStyled = styled.div`
  margin-top: 15px;
  .backdrop, .posters, .profiles {
    margin: 10px 15px 45px 15px;
    color: #FFF;
    h2 {
      font-size: 1.125rem;
      font-weight: 400;
      margin-bottom: 16px;
    }
  }
  .backdrop .photo-container {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
    gap: 0.625rem;
  }
  .posters .photo-container, .profiles .photo-container {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(100px,1fr));
    gap: 0.625rem;
  }
  
  img {
    width: 100%;
    height: 100%;
  }

    @media(min-width: 700px) {
      margin: 20px 40px 30px 40px;
      .backdrop .photo-container {
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
      }
      .posters .photo-container, .profiles .photo-container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }
`
const Photos = () => {
  const { media, id } = useParams();
  const photos = useFetch(`${API_URL_START}${media}/${id}/images${API_URL_END_SINGLE}&language=en=US&include_image_language=en,null`)
  const backdropImage = ((media === "tv" || media === "movie") && photos) && photos.backdrops.map(image => image);
  const posterImage = ((media === "tv" || media === "movie") && photos) && photos.posters.map(image => image);
  const profilePhotos = (media === "person" && photos) && photos.profiles.map(image => image);

  return (
    photos &&
    <PhotosStyled>
      {backdropImage &&
        <section className="backdrop">
          <h2>Backdrops</h2>
          <div className="photo-container">
            {backdropImage.map((image, i) => 
            <div className="img-wrapper" key={i}>
              <img src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt="Backdrop" />
            </div>
            )}
          </div>
        </section>
      }
      {posterImage &&
        <section className="posters">
          <h2>Posters</h2>
          <div className="photo-container">
            {posterImage.map((image, i) => 
            <div className="img-wrapper" key={i}>
              <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt="Poster" />
            </div>
            )}
          </div>
        </section>
      }
      {profilePhotos &&
        <section className="profiles">
          <h2>Photos</h2>
          <div className="photo-container">
            {profilePhotos.map((image, i) => 
            <div className="img-wrapper" key={i}>
              <img src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt="Profile" />
            </div>
            )}
          </div>
        </section>
      }
    </PhotosStyled>
  )
}

export default Photos;