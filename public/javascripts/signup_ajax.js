var signupUser = function() {

    /*
     We define a payload JavaScript object that contains the same sort of information our query parameter string did
     before; i.e. genre: $(‘genre_name’).val() is the same as ?genre_name=user_entered_value_in_the_genre_name_input_box
     */
    var payload = {
        username: $('#username').val(),
        fname: $('#fname').val(),
        lname: $('#lname').val(),
        email: $('#email').val(),
        passw: $('#passw').val()
    };

    // Next we configure the jQuery ajax call
    $.ajax({
        url: '/users/sign_up',  // url where we want to send the form data
        type: 'GET', // the type of form submission; GET or POST
        contentType: "json",  // the type of data we are sending
        data: payload,  // the actual data we are sending
        complete: function(data) {  // what to do with the response back from the server

            // take the response from the server and add the information between the <div></div> tags
            $('#message').html(data.responseJSON.message);

            // show the <div>
            $('#message').show();
        }
    })
}

// $(document).ready() tells the browser not to run the following code until after all the HTML has been parsed
$(document).ready(function() {

    // Now that the HTML has been parsed the browser knows that there is a button with the id addBtn.
    // We are overriding the click function of the button, to run the code we specify.
    $('#addBtn').click(function(e) {
        // When ddBtn is clicked this console log statement logs to your browser's console log not Node.js in Webstorm
        console.log('addBtn clicked');

        // this prevents the form from being submitted using the non-ajax method
        e.preventDefault();

        // runs the ajax function defined above.
        signupUser();
    });
});