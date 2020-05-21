const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('fe205f080a0d4069affc1d0025c7ad50');

 
// categories = ['general', 'sports', 'business', 'technology', 'entertainment']

// newsapi.v2.topHeadlines({
//     q: 'adhyayan',
//     language: 'en',
//     country: 'in'
// }).then(response => {
//     if (response.articles.length > 0) console.log(response.articles);
//     console.log(response.articles.length)
//     console.log(response.articles[0].description)
// });

// newsapi.v2.sources({
//     category: 'sports',
//     language: 'en',
//   }).then(response => {
//     if(response.sources.length > 0) console.log(response.sources);
//     else console.log('Not a valid category, search it as a query.')
// })




function temp() {
     console.log('temp');   
     
     newsapi.v2.everything({
        q: document.getElementById('search').value,
        language: 'en',
    }).then(response => {
        if (response.articles.length > 0) {
            console.log(response.articles)
            console.log(response.articles[0].content);
            document.getElementById('Descrption').textContent=response.articles[0].content;
        }
        else console.log('No results found, please recheck your spelling.')
        console.log(response.articles.length)
    });
}

 document.querySelector(".abc").addEventListener("click", temp)