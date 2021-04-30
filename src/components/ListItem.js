import React from 'react';

const ListItem = ({ label, value, unit, age, aged }) => {
  let personAge;
  if(aged) {
    personAge = `(aged ${aged})`
  } else if (age){
    personAge = `(age ${age})`
  } else {
    personAge = '';
  }

  return (
    <li>
      <p className="label">{label}</p>
      <p className="value">{value}{unit} {(label === "Born" || label === "Died") ? personAge : ""}</p>
    </li>
  )
}
export default ListItem;