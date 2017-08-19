$(document).ready(function() {

  var userID = $.cookie('userID')
  // console.log(userID)
  userID = parseInt(userID)
  // console.log(userID)
  var userName = $.cookie('name')
  // console.log(userName)

  // adding removing buttons if logged in
  if (userName !== undefined) {
    $(".commentBar").removeClass("hidden");
    $(".login").addClass("hidden");
    $(".logOut").removeClass("hidden");
  }

  // Appending Comments
  $("#commentForm").submit(function(event) {
    var comment = $(".commentField").val()
    $(".content").append("<div>" + userName + ": " + comment + "</div>");
    $("#commentForm").children('input').val('');
  });






})
