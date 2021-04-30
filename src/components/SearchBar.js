import React from 'react';
import styled from 'styled-components';
import { X } from '@styled-icons/feather/X';

const CloseIcon = styled(X)`
	color: #FFF;
	width: 30px;
`

const HiddenSearchBar = styled.div`
  position: fixed;
  z-index: 3;
  right: 0;
  left: 0;
  top: ${({ hidden }) => hidden ? '-70px' : 0};
  form {
  height: 100%;
  display: flex;
  background-color: #292929;
    input {
      width: 100%;
      height: 100%;
      background-color: #292929;
      border: none;
      margin-left: 15px;
      color: #FFF;
      font-size: 1rem;
        padding: 20px 5px;
      outline: none;
    }
    div {
      display: flex;
      align-items: center;
      padding-right: 15px;
      cursor: pointer;
    }
  }
	@media(min-width: 992px) {
		left: 6rem;
		height: auto;
		input {
			margin-left: 0;
			padding: 45px 0 45px 45px;
			font-size: 16px;
			&::placeholder {
				font-size: 16px;
			}
		}
	}
`

const SearchBar = ({ hidden, handleSubmit, showSearchBar, searchInput, handleChange}) => {  

    return (
      <HiddenSearchBar hidden={hidden}>
			<form onSubmit={handleSubmit}>
				<input type='text' placeholder='Search for movies or tv shows' onChange={handleChange} defaultValue={searchInput}  />
				<div onClick={showSearchBar}><CloseIcon /></div>
			</form>
      </HiddenSearchBar>
    );
};
  
export default SearchBar;
  