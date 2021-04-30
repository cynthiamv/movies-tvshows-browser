import React, { useState, useEffect } from 'react';
import { API_URL_START, API_URL_END_SINGLE } from '../assets/constants';
import { useParams } from 'react-router-dom';
import Card from './Card';
import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

const SearchResultsStyled = styled.div`
  color: #FFF;
  margin: 20px;
  h2 {
    font-size: 1.125rem;
    font-weight: 500;
  }
  .results {
    margin-top: 20px;
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
  .pagination-container {
    margin: 20px 0;
    display: flex;
    justify-content: center;
  }
  .MuiPaginationItem-root {
    color:#FFFFFF;
  }
  .MuiPaginationItem-textPrimary.Mui-selected {
    background-color: #7b113a
  }
  @media(min-width: 700px) {
    margin: 20px 40px;
    h2 {
      font-size: 1.375rem;
    }
    .results {
      grid-template-columns: repeat(auto-fill,minmax(160px,1fr));
      
    }
  }
  @media(min-width: 992px) {
    .results {
      grid-template-columns: repeat(auto-fill,minmax(190px,1fr));
      h2, .rating {
        display: block;
      }
    }
  }
`

const SearchResults = () => {
  const { searchText } = useParams();
  const [resultsList, setResultsList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => { 
    fetch(`${API_URL_START}search/multi${API_URL_END_SINGLE}&language=en-US&page=${page}&include_adult=false&query=${searchText}`)
      .then(res => res.json())
      .then(data => {
        setResultsList(data.results);
        setTotalPages(data.total_pages);
      });
  }, [page]);

  const handleChange = (e, num) => {
    setPage(num);
  };

  return (
    resultsList &&
    <SearchResultsStyled>
      <h2>Results For: {searchText}</h2>
      <div className="results">
        {resultsList.map((item, i) => <Card info={item} key={i} />)}
      </div>
      <div className='pagination-container'>
        <Pagination count={totalPages} page={page} color='primary' onChange={handleChange} />
      </div>
    </SearchResultsStyled>
  )
}

export default SearchResults;