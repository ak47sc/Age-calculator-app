const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const btn = document.querySelector("button");
const age = document.querySelectorAll(".num")
let failure = false;
const todayDate = new Date();
let ageYear , ageMonth , ageDays;
let days =0 ,mon =0 , years=0;

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    failure = false;
    const dob = [day,month,year];
    dob.forEach((item)=>{
        item.blur(); 
        item.parentElement.firstElementChild.textContent="";
        item.parentElement.classList.remove("alert");
        item.classList.remove("alert");
        if(item.value === null || item.value === ""){
            item.parentElement.firstElementChild.textContent = "This field is required";
            item.parentElement.classList.add("alert");
            item.classList.add("alert");
            failure = true;
        }
        else if(item.value <=0){
            item.parentElement.firstElementChild.textContent = "No negative number";
            item.parentElement.classList.add("alert");
            item.classList.add("alert");
            failure = true;
        }
    });
    if(year.value > todayDate.getFullYear()){
        year.parentElement.firstElementChild.textContent = "Must be in the past";
        year.parentElement.classList.add("alert");
        year.classList.add("alert");
        failure = true;
    }
    if(month.value > 12){
        month.parentElement.firstElementChild.textContent = "Must be a valid month";
        month.parentElement.classList.add("alert");
        month.classList.add("alert");
        failure = true;
    }
    if((day.value > 31) || (day.value == 31 && (month.value == 4 || month.value == 6 || month.value == 9 || month.value == 11)) || (day.value > 29 && month.value == 2) || (day.value == 29 && year.value%4 != 0 )){
        day.parentElement.firstElementChild.textContent = "Must be a valid day";
        day.parentElement.classList.add("alert");
        day.classList.add("alert");
        failure = true;
    }

    (!failure)? calculateAge() : null;
});

function calculateAge(){
    days =0 ;mon =0 ; years=0;
    const dob = new Date(year.value,month.value-1,day.value);
    const dobDate = dob.getDate();
    const dobMonth = dob.getMonth();
    const dobYear = dob.getFullYear();
    
    const curDate = todayDate.getDate();
    const curMonth = todayDate.getMonth();
    const curYear = todayDate.getFullYear();

    ageYear = curYear - dobYear;

    if(curMonth >= dobMonth){
        ageMonth = curMonth - dobMonth;
    }
    else{
        ageYear--;
        ageMonth = 12 + curMonth - dobMonth;
    }

    if (curDate >= dobDate)  
        ageDays = curDate - dobDate;  
    else {  
        ageMonth--;  
        ageDays = 31 + curDate - dobDate;  
      if (ageMonth < 0) {  
        ageMonth = 11;  
        ageYear--;  
      }  
    }  

    showAge();
}

function showAge(){
    if(years <= ageYear){
        age[0].textContent = years;
        years++;
        setTimeout(showAge,30);
    }
    else if(mon <= ageMonth){
        age[1].textContent = mon;
        mon++;
        setTimeout(showAge,30);
    }
    else if(days <=ageDays){
        age[2].textContent = days;
        days++;
        setTimeout(showAge,30);
    }
}