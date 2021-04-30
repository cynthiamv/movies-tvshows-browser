import React from 'react';
import { API_URL_START, API_URL_END_SINGLE } from '../assets/constants';
import useFetch from '../hooks/useFetch';
import styled from 'styled-components';
import { Twitter } from '@styled-icons/boxicons-logos/Twitter';
import { Facebook } from '@styled-icons/boxicons-logos/Facebook';
import { Instagram } from '@styled-icons/boxicons-logos/Instagram';
import { Imdb } from '@styled-icons/boxicons-logos/Imdb';
import {Link } from '@styled-icons/boxicons-regular/Link';

const ExternalLinksStyled = styled.ul`
  display:flex;
  margin: 30px 0 40px 0;
  li {
    margin: 0 10px;
    &:first-child {
      margin-left: 0;
    }
  }
`

const TwitterIcon = styled(Twitter)`
  color: #dcddde;
  width: 25px;
  height: 25px;
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
  @media(min-width: 992px) {
    width: 30px;
    height: 30px;
  }
`;
const FacebookIcon = styled(Facebook)`
  color: #dcddde;
  width: 25px;
  height: 25px;
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
  @media(min-width: 992px) {
    width: 30px;
    height: 30px;
  }
`;
const InstagramIcon = styled(Instagram)`
  color: #dcddde;
  width: 25px;
  height: 25px;
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
  @media(min-width: 992px) {
    width: 30px;
    height: 30px;
  }
`;
const ImdbIcon = styled(Imdb)`
  color: #dcddde;
  width: 25px;
  height: 25px;
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
  @media(min-width: 992px) {
    width: 30px;
    height: 30px;
  }
`;
const WebIcon = styled(Link)`
  color: #dcddde;
  width: 25px;
  height: 25px;
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
  @media(min-width: 992px) {
    width: 30px;
    height: 30px;
  }
`;



const ExternalLinks = ({ data, media, id }) => {
  const externalLinks = useFetch(`${API_URL_START}${media}/${id}/external_ids${API_URL_END_SINGLE}`);

  const web = data.homepage;

  return (
    externalLinks &&
    <ExternalLinksStyled>
      
        {externalLinks.twitter_id &&
          <li>
            <a href={`https://www.twitter.com/${externalLinks.twitter_id}`}
              target="_blank"
              rel="noopener noreferrer">
              <TwitterIcon />
            </a>
          </li>
        }
        {externalLinks.facebook_id &&
          <li>
              <a href={`https://www.facebook.com/${externalLinks.facebook_id}`}
                target="_blank"
                rel="noopener noreferrer">
                <FacebookIcon  />
              </a>
          </li>
        }
        {externalLinks.instagram_id &&
          <li>
              <a href={`https://www.instagram.com/${externalLinks.instagram_id}`}
              target="_blank"
              rel="noopener noreferrer">
              <InstagramIcon  />
            </a>
          </li>
        }
        {externalLinks.imdb_id && 
          <li>
            <a href={`https://www.imdb.com/${media === "person" ? "name" : "title"}/${externalLinks.imdb_id}`}
              target="_blank"
              rel="noopener noreferrer">
              <ImdbIcon  />
            </a>
          </li>
        }
        {web && 
          <li>
            <a href={web}
              target="_blank"
              rel="noopener noreferrer">
              <WebIcon  />
            </a>
          </li>
        }
      
    </ExternalLinksStyled>
  )
}

export default ExternalLinks;