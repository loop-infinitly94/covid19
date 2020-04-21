export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatDateT = (date) => {
    var today = date;
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    } 
    return yyyy + '-' + mm + '-' + dd;
}

export const getTime = (value) => {
    var time = value.split('T')
    // console.log(time)
    return time[1]
}

export const getDate = (value) => {
    var time = value.split('T')
    // console.log(time)
    return time[0]
}

export const stripHtml = (html) =>{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}