const getNumericYear = date => {
  if(date) {
    return date.split('-')[0]

  }
}

export default getNumericYear;