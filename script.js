

function buttonAdd(e) {
    let randomNumber = Math.floor(Math.random() * 9);
    let url = apiUrlBase + randomNumber;

    let alreadyAdded = false;
    console.log("[Info] Url is ", url);

    console.log("[App] Check if ServiceWorker has already cached the resource");
    caches.match(url).then((response) => {
        if (response) {
            response.json().then((result) => {
                console.log("[App] Added image from cache");
                alreadyAdded = true;
                addImageCard(result);
            });
        }
    });

    console.log("[App] Create HttpRequest");
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        console.log("[App] Request State Changed: ", request.readyState === XMLHttpRequest.DONE);
        if(request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                if(!alreadyAdded) {
                    let response = JSON.parse(request.response);
                    console.log("[App] Added image from fetch");
                    addImageCard(response);
                } 
            }
        } 
    };

    request.open("GET", url);
    request.send();
}

function buttonRemove(e) {
    let cards = document.getElementsByClassName("card");
    if (cards.length > 0) {
        cards[0].parentElement.removeChild(cards[0]);
    }
}

function addImageCard(response) {
    let node = document.createElement("DIV");
    let text = document.createElement("H3");
    let textNode = document.createTextNode(response.name);
    let image = new Image();
    image.src = response.data;
    
    text.appendChild(textNode);

    node.appendChild(image);
    node.appendChild(text);

    node.classList.add("card");
    document.getElementById("wrapper").appendChild(node);
}