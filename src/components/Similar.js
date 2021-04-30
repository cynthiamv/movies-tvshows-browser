import React from 'react';
import { API_URL_START, API_URL_END_LIST } from '../assets/constants';
import useFetch from '../hooks/useFetch';
import CardsContainer from './CardsContainer';

const Similar = ({media, id}) => {
  const similar = useFetch(`${API_URL_START}${media}/${id}/similar${API_URL_END_LIST}`);
  return (
    <CardsContainer data={similar} title="More like this" />
  )
}

export default Similar;