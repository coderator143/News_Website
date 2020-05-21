fetch('/articles/proof_temp').then((response) => {
    response.json().then((data) => {
        console.log(data.article)
        makeList(data.article)
    })
})

function makeList(response) {
    var list = document.createElement('ul');
    document.getElementById('foo').setAttribute("style","background-color: #f3f3f3");
    for (var i = 0; i < response.length; i++) {

        //make list
        var item = document.createElement('li');
        
        //add date
        var date = document.createElement('span');
        date.appendChild(document.createTextNode(response[i].createdAt));
        date.setAttribute("style", "margin-left:2%");
        item.appendChild(date);
 
        // add descriptio+n
        var description = document.createElement('p');
        description.appendChild(document.createTextNode(response[i].description))
        item.appendChild(description);
        item.setAttribute("style", "list-style-type: none;width: 70%");
 
        //add line
        list.appendChild(item);
        var line = document.createElement('div');
        line.setAttribute("style", "width: 80%;height: .5px; border-bottom: 1px solid #b8b5b5;margin-top: 1%;margin-bottom: 1%");
        list.appendChild(line);
    }
    //return list;
    document.getElementById('foo').appendChild(list)
}