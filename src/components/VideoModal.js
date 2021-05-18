import React from 'react';
import useFetch from '../hooks/useFetch';
import { API_URL_START,  API_URL_END_SINGLE } from '../assets/constants';
import styled from 'styled-components';
import { X } from '@styled-icons/feather/X';

const VideoModalStyled = styled.div`
  position: fixed;
  z-index: 4;
  right: 0;
  left: 0;
  height: 100%;
  top: ${({ hidden }) => hidden ? '-70px' : 0};
  background-color: #7b113a42;
  padding: 0 20px;
  .button-container {
    position: relative;
    .btn {
      position: absolute;
      top: 10px;
      right: 20px;
      cursor: pointer;
    }
  }
  .video {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80%;
    overflow: hidden;
    margin-top: 20px;
  }
  @media(max-width: 700px) {
    iframe {
      width: 300px;
      height: 300px;
    }
  }
`

const CloseIcon = styled(X)`
	color: #FFF;
	width: 30px;
`

const VideoModal = ({ hidden, openVideo, media, id, src }) => {
  const videos = useFetch(`${API_URL_START}${media}/${id}/videos${API_URL_END_SINGLE}&language=en-US`)
  const video = videos && videos[0].key;
    return (
      videos &&
        <VideoModalStyled hidden={hidden}>
            <div className="button-container">
                <div className="btn" onClick={openVideo}>
                    <CloseIcon />
                </div>
            </div>
            <div className="video">
                <iframe
                width="640"
                height="360"
                src={src ? `https://www.youtube.com/embed/${video}` : undefined}
                frameBorder="0"
                allowFullScreen
                title="Embedded youtube"
                controls
                />
            </div>
        </VideoModalStyled>
    )
}

export default VideoModal;