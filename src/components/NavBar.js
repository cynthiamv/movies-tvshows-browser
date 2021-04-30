import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import { Home } from '@styled-icons/feather/Home';
import { Movie } from '@styled-icons/boxicons-regular/Movie';
import { Tv } from '@styled-icons/feather/Tv';
import { Search } from '@styled-icons/feather/Search';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #000;
  position: fixed;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 45px; 
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    background-color: transparent;
    border: none;
    padding: 0;
  }
  @media(min-width: 1200px) {
    width: 6rem;
    height: 100%;
    top: 0; 
    right: auto;
    flex-direction: column;
    justify-content: flex-start;
    border-right: 1px solid #202124;
    a, button {
      padding: 40px 0;
    }
  }
    
`
const HomeIcon = styled(Home)`
  width: 30px;
  color: ${props => props.isLocation ? '#7b113a' : '#FFF'};
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
`

const MovieIcon = styled(Movie)`
  width: 30px;
  color: ${props => props.isLocation ? '#7b113a' : '#FFF'};
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
`

const TvIcon = styled(Tv)`
  width: 30px;
  color: ${props => props.isLocation ? '#7b113a' : '#FFF'};
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
`

const SearchIcon = styled(Search)`
  width: 30px;
  color: #FFF;
  transition: all 0.5s;
  &:hover {
    color: #7b113a;
  }
`

const NavBar = () => {
  const [hidden, setHidden] = useState(true);  
  const [searchInput, setSearchInput] = useState('');  

  const history = useHistory(); 

  const location = useLocation();

  const showSearchBar = () => {
    setHidden(!hidden);
  }; 

  const handleChange = e => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    history.push(`/search/${searchInput}`);
    setHidden(!hidden);
  };

  return (
    <Nav>
      <Link to={"/"} ><HomeIcon isLocation={location.pathname === '/' ? true : false}/></Link>       
      <Link to={"/movie"} ><MovieIcon isLocation={location.pathname.includes("/movie") ? true : false}/></Link>
      <Link to={"/tv"} ><TvIcon isLocation={location.pathname.includes("/tv") ? true : false}/></Link>
      <button onClick={showSearchBar}><SearchIcon /></button>
      <SearchBar hidden={hidden} handleSubmit={handleSubmit} showSearchBar={showSearchBar} handleChange={handleChange}/>
    </Nav>
  )
}

export default NavBar;