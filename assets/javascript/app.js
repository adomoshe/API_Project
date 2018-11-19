$(window).ready(function () {
    var queryURL;
    var apiCallValue;
    var rating = [];
    var gifPlayArr = [];
    var gifStillArr = [];

    /*This notation enables buttons that are dynamically created to be registered. 
    When a .movieBtn is pressed spaces in its data-name are converted to '+' and an ajax GET call is made asking for 10 gifs.
    After the call is completed  a for loop pushes the still url and the rating into respective arrays.
    The rating is inserted into an h4 tag and prepended to the #gifInsert div
    Then an image with the fixed height movie url is prepended to the #gifInsert div*/
    $(document).on("click", ".movieBtn", function () {
        apiCallValue = ($(this).data("name").replace(/ /g, "+"));
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + apiCallValue + "&api_key=1wQx6yxcOuJcqqriBDVG9HTuZ8LdlhWi&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                gifStillArr.push(response.data[i].images.fixed_height_still.url)
                rating.push(response.data[i].rating.toUpperCase());
                console.log(response);
                $("#gifInsert").prepend('<h4> Rating: ' + (rating[rating.length - 1]) + '</4>')
                $("#gifInsert").prepend('<img id=' + (gifStillArr.length - 1) + ' src=' + gifStillArr[(gifStillArr.length - 1)] + '>');
                gifPlayArr.push(response.data[i].images.fixed_height.url);
            };
        });
    });

    /* Whenever an image is clicked an if statement fires off checking the src url against url in the gifStillArr in the index stored in the id of the image
    (the id was previously set as the last index of the array). If this is found to be true then the src url is switched to the same index but from the gifPlayArr.
    Else the src url must be a gifPlayArr url so it is changed back to a still on click.*/
    $(document).on("click", "img", function () {
        if ($(this).attr("src") == gifStillArr[this.id]) {
            $(this).attr("src", function () {
                return gifPlayArr[this.id];
            })
        } else {
            $(this).attr("src", function () {
                return gifStillArr[this.id];
            });
        };
    });


    /* if the #submitButton is pressed then the value from the form is extracted, trimmed of white spaces and bound as a variable to newButtonValue.
    newButton is constructed with several bootstrap classes and a data-name and caption that are what the user inputed.
    The button is then appended to the #buttonInsert div and the #submitForm is finally cleared.*/
    $("#submitButton").on("click", function (enter) {
        enter.preventDefault();
        var newButtonValue = $("#submitForm").val().trim();
        var newButton = $("<button>");
        newButton.addClass("movieBtn btn btn-outline-danger btn-lg");
        newButton.data("name", newButtonValue);
        newButton.text(newButtonValue);
        $("#buttonInsert").append(newButton);
        $("#submitForm").val("");
    });
});
