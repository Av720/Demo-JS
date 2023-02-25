var goBtn = $("#goBtn");
var appPage = $(".app-page");
var loginPage = $(".login-page");
var brewName0 = $("#brewName0");
var brewName1 = $("#brewName1");
var brewName2 = $("#brewName2");
var brewAddress0 = $("#brewAddress0");
var brewAddress1 = $("#brewAddress1");
var brewAddress2 = $("#brewAddress2");
var brewWebsite0 = $("#brewWebsite0");
var brewWebsite1 = $("#brewWebsite1");
var brewWebsite2 = $("#brewWebsite2");

goBtn.on("click", requestBreweries);

function requestBreweries() {
    loginPage.addClass("hide");
    appPage.removeClass("hide");
    var city = $("#typeDestination").val();
    var breweryURL =
        "https://api.openbrewerydb.org/breweries?by_city=" + city + "&per_page=3";

    fetch(breweryURL)
        .then(function (response) {
            // console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            if (city === "") {
                return;
            }
            for (let i = 0; i < data.length; i++) {
                if (i === 0) {
                    brewName0.text(data[i].name);
                    brewAddress0.text(data[i].street);
                    brewWebsite0.text(data[i].website_url);
                } else if (i === 1) {
                    brewName1.text(data[i].name);
                    brewAddress1.text(data[i].street);
                    brewWebsite1.text(data[i].website_url);
                } else {
                    brewName2.text(data[i].name);
                    brewAddress2.text(data[i].street);
                    brewWebsite2.text(data[i].website_url);
                }
            }
        });
}
// --------------------------------------------------------------------------------------------------

// TICKET MASTER API START CODE

var ticketApiKey = "AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4";
// var mainEvent0 = $("#event-0");
// var maineventdate0 = $("#date-0");
// var mainDescription0 = $("#description-0");
// var events = json._embedded.events;
// var item = items.first();
var page = 0;
// var cityId = $("#typeDestination").val();

goBtn.on('click', requestEvents);

function requestEvents(page) {
    var cityId = $("#typeDestination").val();
    $('#events-panel').show();
    $('#attraction-panel').hide();

    if (page < 0) {
        page = 0;
        return;
    }
    if (page > 0) {
        if (page > requestEvents.json.page.totalPages - 1) {
            page = 0;
        }
    }

    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4&sort=date,asc" + "&city=" + cityId + "&" + page,
        async: true,
        dataType: "json",
        success: function (json) {
            requestEvents.json = json;
            showEvents(json);
        },

    });
}


function showEvents(json) {

    // console.log(json)
    var items = $('#events .list-group-item');
    items.hide();
    var events = json._embedded.events;

    console.log(events)
    var item = items.first();
    for (var i = 0; i < events.length; i++) {
        item.children('.list-group-item-heading').text(events[i].name);
        item.children('.list-group-item-text').text(events[i].dates.start.localDate);


    }
}

requestEvents(page);








//old code
// function requestEvents(page) {
//     var cityId = $("#typeDestination").val();

//     var ticketURL = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=AGWa5vWEgQZJJbVa9ZHcAxkl7H76w1f4&sort=date,asc" + "&city=" + cityId;

//     fetch(ticketURL)
//         .then(function (response) {
//             // console.log(response);
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             if (page < 0) {
//                 page = 0;
//                 return;
//             }
//             if (page > 0) {
//                 if (page > getEvents.json.page.totalPages - 1) {
//                     page = 0;
//                     return;
//                 }
//             }





//             // for (var i = 0; i < events.length; i++) {
//             //     mainEvent0.text(events.name)








//             // for (var i = 0; i < data.length; i++) {

//             // }

//             // }
//         })
// }
