function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function httpGetAsync(theUrl, callback)
{
    // create the request object
    var xmlHttp = new XMLHttpRequest();

    // set the state change callback to capture when the response comes in
    xmlHttp.onreadystatechange = function()
    {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        {
            callback(xmlHttp.responseText);
        }
    }

    // open as a GET call, pass in the url and set async = True
    xmlHttp.open("GET", theUrl, true);

    // call send with no params as they were passed in on the url string
    xmlHttp.send(null);

    return;
}

function Callback_search(responsetext)
{
    // parse the json response
    var response_objects = JSON.parse(responsetext);

    top_result = response_objects["results"];

    // load the GIFs
    document.getElementById("preview_gif").src = top_result[getRandomInt(top_result.length)]["media"][0]["gif"]["url"];

    return;

}

function grab_data()
{
    // Public key given in tenor docs.
    var apikey = "LIVDSRZULELA";
    var lmt = 30;

    var search_term = "but why";

    var search_url = "https://api.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

    httpGetAsync(search_url, Callback_search);

    return;
}

grab_data();