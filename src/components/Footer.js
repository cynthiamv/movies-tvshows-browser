import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  color: #FFF;
  margin:  30px 0 70px 0;
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    margin: 5px 0;
  }
  a {
    transition: all 0.5s;
    &:hover {
      color: #7b113a;
    }
  }
`

const Footer = () => {
  return (
    <FooterStyled>
      <p>Made by <a href="https://github.com/cynthiamv">Cynthia Vico Vacca.</a></p> 
      <p>Data provided by <a href="https://www.themoviedb.org/">TMDb</a></p>
    </FooterStyled>
  )
}

export default Footer;