const request = require('request')

const spot = (adress, callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+decodeURIComponent(adress)+".json?access_token=pk.eyJ1Ijoic3VsdGFueiIsImEiOiJjazR6Z2t5aGQwMm5jM29ta3ZhNTJncWI2In0.HiSIP9D-w7t5SA8JrEzSvQ&limit=1"

    request({url:url, json: true}, (error,response)=>{
       if(error){
           console.log("there is a problem in the netwerk, please try again later")
        callback("there is a problem in the netwerk, please try again later",undefined)
       }else if(response.body.features.length === 0){
           console.log("the adress is undefinde, please try another addrss")
        callback("the adress is undefinde, please try another addrss",undefined)
       }else{
        callback(undefined,{
            lat:response.body.features[0].center[0],
            long:response.body.features[0].center[1],
            location:response.body.features[0].place_name
        })
       }
    })

}

module.exports = spot