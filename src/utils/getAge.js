const getAge = (birthdate, isDead, deathdate) => {
  let date = isDead ? new Date(deathdate) : new Date(birthdate);
  let birth = isDead && new Date(birthdate);
  let cur = new Date();
  let diff = isDead ? (date - birth) : (cur-date); 
  let age = Math.floor(diff/31557600000); 
  return age;
}

export default getAge;