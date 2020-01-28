console.log("local script ready")

const place=document.getElementById('place')
const forecast=document.getElementById('forecast')
const form=document.getElementsByTagName('form')
const locationInPut=document.getElementsByTagName("input")


form[0].addEventListener('submit',(e)=>{
    e.preventDefault()
    place.textContent="loading...."
    forecast.textContent=""
    console.log(locationInPut[0].value)
    search(locationInPut[0].value)
})



const search=(location)=>{
    fetch("http://localhost:3000/Weather?adress="+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
            place.textContent=data.error 
        }
        else{
            console.log(data.forecast)
            place.textContent=data.location
            forecast.textContent=data.forecast
        }    
    })
})
}

