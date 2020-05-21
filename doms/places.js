const Places = require('places')
const places = new Places('AIzaSyCJre9bSn1Bihy8XZjRbNfklNG71KYdRss')

const url =
 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum+in+Sydney&key=AIzaSyCJre9bSn1Bihy8XZjRbNfklNG71KYdRss'
places({ url: url,json: true } , (error, response) => {
    if(error) console.log('Unable to connect to the server.!')
    else if(response.body.error) console.log('Unable to find location')
    else console.log(response.results)
})