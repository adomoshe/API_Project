$(window).ready(function () {
    var queryURL;
    var apiCallValue;
    var rating = [];
    var gifPlayArr = [];
    var gifStillArr = [];


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
