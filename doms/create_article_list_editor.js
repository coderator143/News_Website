fetch('/articles/all').then((response) => {
    response.json().then((data) => { makeList(data.article)})
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

        //add link
        var link = document.createElement('a');
        link.appendChild(document.createTextNode('Approve'));
        link.setAttribute("href","http://localhost:4000/editor/proved/"+response[i]._id);
        if(response[i].isProofRead) {
            
        }
        item.appendChild(link);

        //add link
        var link = document.createElement('a');
        link.appendChild(document.createTextNode('Disapprove'));
        link.setAttribute("href","http://localhost:4000/editor/unproved/"+response[i]._id);
        item.appendChild(link);
        
        //add button
        // var button=document.createElement('button')
        // button.appendChild(document.createTextNode('Ok tested'))
        // button.setAttribute("type", "submit")
        // button.setAttribute("style", "height: 40px; width: 60px")

        //add line
        list.appendChild(item);
        var line = document.createElement('div');
        line.setAttribute("style", "width: 80%;height: .5px; border-bottom: 1px solid #b8b5b5;margin-top: 1%;margin-bottom: 1%");
        list.appendChild(line);
    }
    //return list;
    document.getElementById('foo').appendChild(list)
}