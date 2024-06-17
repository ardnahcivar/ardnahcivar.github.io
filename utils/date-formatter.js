const dateReadableFormat = date => {
    const currDate = new Date(date);
    const day =  currDate.getDate();
    const month =  currDate.getMonth() + 1;
    const year =  currDate.getFullYear();

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const formattedDate  = `${months[month-1]} ${day}, ${year}`;
    return formattedDate;
}


export default dateReadableFormat