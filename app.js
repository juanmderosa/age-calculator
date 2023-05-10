const years = document.querySelector(".qty-years")
const months = document.querySelector(".qty-months")
const days = document.querySelector(".qty-days")
const dayInput  =document.getElementById("day")
const monthInput =document.getElementById("month")
const yearInput =document.getElementById("year")
const btn = document.querySelector(".btn-img")
const form = document.querySelector(".form-container")
const dayLabel= document.querySelector(".day-label")
const monthLabel= document.querySelector(".month-label")
const yearLabel= document.querySelector(".year-label")
const inputContainer = document.querySelectorAll(".input-container")
const errorMessage = document.querySelectorAll(".error-message")
const labels = document.getElementsByTagName("label")
const inputs = document.getElementsByTagName("input")
const currentYear = new Date().getFullYear()

/* Event Listener */

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    validateInput(dayInput, dayLabel, errorMessage[0],validateDaysInput, errorMessage[0]);
    validateInput(monthInput, monthLabel, errorMessage[1],validateMonthsInput, errorMessage[0]);
    validateInput(yearInput, yearLabel, errorMessage[2],validateYearsInput, errorMessage[0]);
    showResults (yearInput, monthInput, dayInput, errorMessage)
})

/* Functions */

function esBiciesto(year){
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)){
        return true
    }else{
        return false
    }
}

function validateInput(input, label, errorMessage, validationFunction, invalidDayMessage){
    if(input.value.length === 0){
        label.classList.add("label-error");
        input.classList.add("input-error");
        errorMessage.innerText = "This field is required"
    }else{
        label.classList.remove("label-error");
        input.classList.remove("input-error");
        errorMessage.innerText = ""
        validationFunction(input, label)
        validateDate(dayInput, monthInput, yearInput, invalidDayMessage)
    }
}

function validateDaysInput(input, label){
    if(input.value < 1 || input.value > 31){
        label.classList.add("label-error");
        input.classList.add("input-error");
        errorMessage[0].innerText = "Must be a valid day";
    }
}

function validateMonthsInput(input, label){
    if(input.value < 1 || input.value > 12){
        label.classList.add("label-error");
        input.classList.add("input-error");
        errorMessage[1].innerText = "Must be a valid month";
    }
}

function validateYearsInput(input, label){
    if(input.value > currentYear){
        label.classList.add("label-error");
        input.classList.add("input-error");
        errorMessage[2].innerText = "Must be in the past";
    }
}

function validateDate(dayInput, monthInput, yearInput, invalidDayMessage){
    if(Number(monthInput.value) === 2){
        if(esBiciesto(yearInput.value) && dayInput.value > 29){
            invalidDayMessage.innerText = "Must be a valid date";
            Array.from(labels).forEach(label => {
                label.classList.add("label-error")
            });
            Array.from(inputs).forEach(input => {
                input.classList.add("input-error")
            });
            
        }
        if(!esBiciesto(yearInput.value) && dayInput.value > 28){
            invalidDayMessage.innerText = "Must be a valid date";
            Array.from(labels).forEach(label => {
                label.classList.add("label-error")
            });
            Array.from(inputs).forEach(input => {
                input.classList.add("input-error")
            });
        }
    }
    if(Number(monthInput.value) === 4 || Number(monthInput.value) === 6 || Number(monthInput.value)  === 9 || Number(monthInput.value) ===  11 && dayInput.value > 30){
        invalidDayMessage.innerText = "Must be a valid date";
        Array.from(labels).forEach(label => {
            label.classList.add("label-error")
        });
        Array.from(inputs).forEach(input => {
            input.classList.add("input-error")
        });
    }
}

function showResults (yearInput, monthInput, dayInput, errorMessage){
    years.innerText = "--"
    months.innerText = "--"
    days.innerText = "--"
    const fullDate = new Date(yearInput.value, monthInput.value -1, dayInput.value)
    const currentDate = new Date()
    const differenceMs = currentDate.getTime() - fullDate.getTime();
    const msInDay = 1000 * 60 * 60 * 24;
    const msInMonth = msInDay * 30.44; 
    const msInYear = msInDay * 365.25; 

    const yearsSpan = Math.floor(differenceMs / msInYear);
    const monthsSpan = Math.floor((differenceMs % msInYear) / msInMonth);
    const daysSpan = Math.floor(((differenceMs % msInYear) % msInMonth) / msInDay);

    if(errorMessage[0].innerText === "" && errorMessage[1].innerText === "" && errorMessage[2].innerText === ""){
        setTimeout(() => {
            years.innerText = yearsSpan
                }, 0);
        setTimeout(() => {
            months.innerText = monthsSpan
                }, 500);
        setTimeout(() => {
            days.innerText = daysSpan
                }, 1000);
    }else{
        years.innerText = "--"
        months.innerText = "--"
        days.innerText = "--"
    }
}
