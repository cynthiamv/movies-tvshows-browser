const getFullDate = dateString => {
    const date = new Date(dateString);
    const day = date.toLocaleString("en-US", {day: "numeric"});
    const month = date.toLocaleString("en-US", {month: "long"});
    const year = date.toLocaleDateString("en-US", {year: "numeric"});

    return `${day} ${month} ${year}`;
}

export default getFullDate;