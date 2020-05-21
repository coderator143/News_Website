const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('fe205f080a0d4069affc1d0025c7ad50');

//Make list of News
function makeList(response) {

    deletList();
    //console.log(response.articles.length);
    var list = document.createElement('ul');
    document.getElementById('foo').setAttribute("style", "background-color: #f3f3f3");
    for (var i = 0; i < response.articles.length; i++) {

        //make list
        var item = document.createElement('li');

        // add link to image,title,description
        var link = document.createElement('a');
        link.setAttribute("href", response.articles[i].url);

        // add image
        var image = document.createElement('img');
        image.setAttribute("src", response.articles[i].urlToImage);
        link.setAttribute("target", "__blank");
        image.setAttribute("style", "float: left; height:110px; width : 20%");
        link.appendChild(image);
        item.appendChild(link);

        //add date
        var date = document.createElement('span');
        date.appendChild(document.createTextNode(response.articles[i].publishedAt.substring(0, 10)));
        date.setAttribute("style", "margin-left:2%");
        item.appendChild(date);

        //add title
        var title = document.createElement('h3');

        link = document.createElement('a');
        link.appendChild(document.createTextNode(response.articles[i].title));
        link.setAttribute("href", response.articles[i].url);
        link.setAttribute("target", "__blank");
        link.setAttribute("style", "margin-left:4% ; font-size: 20px; color: black ; margin-top: 0px`; text-decoration:none; width: 100%;");

        title.appendChild(link);

        item.appendChild(title);

        // add description
        var description = document.createElement('p');
        link = document.createElement('a');
        var cut = response.articles[i].description;
        link.setAttribute("href", response.articles[i].url);
        link.setAttribute("target", "__blank");
        link.appendChild(document.createTextNode(cut.substring(0, 100) + '...'));
        link.setAttribute("style", "margin-left:4%; font-family: 'Merriweather' ; font-size: 17px; color: black; margin-top:0; text-decoration:none");

        description.appendChild(link);
        item.appendChild(description);

        item.setAttribute("style", "list-style-type: none;width: 70%");

        //add line
        list.appendChild(item);

        var line = document.createElement('div');
        line.setAttribute("style", "width: 80%;height: .5px; border-bottom: 1px solid #b8b5b5;margin-top: 1%;margin-bottom: 1%");
        list.appendChild(line);
    }
    return list;
}

//delete existing list
function deletList() {
    var e = document.getElementById('foo');
    e.innerHTML = "";
}

//Fetch news from API using search keyword
function getNews() {

    if (document.querySelector('.search').value === "") {
        alert('Search is empty!!!');
        return 0;
    }

    newsapi.v2.everything({
        q: document.querySelector('.search').value,
        language: 'en',
    }).then(response => {
        if (response.articles.length > 0) {
            console.log(response.articles);
            console.log(response.articles[0].content);

            document.getElementById('foo').appendChild(makeList(response));
        }
        else console.log('No results found, please recheck your spelling.')
    });
};


//EVENT LISTENER TO SEARCH BAR
document.querySelector('.search').addEventListener('keypress', event => {
    if (event.which === 13 || event.keycode === 13) getNews();
});

//IIFE FOR CATEGORIES TABS
(function categoires() {
    var arr = document.getElementsByClassName('ABC-News-general');

    for (var i = 0; i < arr.length; i++) {
        var x = arr[i].id;
        arr[i].addEventListener('click', e => {
            newsapi.v2.everything({
                q: e.srcElement.id,
                language: 'en',
            }).then(response => {
                if (response.articles.length > 0) {
                    console.log(response.articles);
                    console.log(response.articles[0].content);

                    document.getElementById('foo').appendChild(makeList(response));
                }
                else console.log('No results found, please recheck your spelling.')
            });

        });
    }
})();


// function for all cards
function card(response) {

    var allImages = document.querySelectorAll('.card-img')
    var allPara = document.querySelectorAll('.card-para');
    var allLinks = document.querySelectorAll('.card-link');
    console.log(allPara);

    if (allPara.length !== 0) {
        for (var i = 0; i < 11; i++) {
            var el = allImages[i];
            el.setAttribute("src", response.articles[i].urlToImage);

            el = allPara[i];
            el.appendChild(document.createTextNode(response.articles[i].title));

            el = allLinks[i];
            el.setAttribute("href", response.articles[i].url);
        }

        var allBreaking = document.querySelectorAll('.breaking-headline');

        for (var i = 0; i < 5; i++) {
            var el = allBreaking[i];
            el.appendChild(document.createTextNode(response.articles[i + 11].title));
        }
    }
}

//IIFE for topheadlines on Card View
(function cardLoader() {
    newsapi.v2.topHeadlines({
        language: 'en',
        country: 'in'
    }).then(response => {
         card(response);
    });
})();

// function for top-Stories
function topStories(response) {
    var allInfo = document.querySelectorAll('.info-top');

    console.log(allInfo);
    if (allInfo.length !== 0) {
        for (var i = 0; i < 8; i++) {
            allInfo[i].appendChild(document.createTextNode(response.articles[i].title));
        }
    }

}
//IIFE FOR INFO
(function cardLoader() {
    newsapi.v2.topHeadlines({
        language: 'en',
    }).then(response => {
         topStories(response);
    });
})();