const request = require('request')

const weather =(long, lat, callback)=>{
    const url = 'https://api.darksky.net/forecast/d34c32ebd39d5fa3ff42233b79b2771d/'+long+','+lat+'?&units=si'

    request({url:url, json: true},(error,response)=>{
        if(error){
           callback("there is an internet problem")
        }else if(response.body.error){
            callback(response.body.error,"can't find any results")
        }else{
            callback(undefined,`${response.body.daily.summary} the temperature is ${response.body.currently.temperature}, there is  ${response.body.currently.precipProbability}% chance of rain`)
        }

    })
}

module.exports = weather