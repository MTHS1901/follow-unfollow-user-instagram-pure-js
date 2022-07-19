username = prompt("follow username:"); // username to follow

// get the account id by username
fetch("https://www.instagram.com/" + username + "/?__a=1&__d=dis").then(e => e.json()).then(e => {
     user_id = e.graphql.user.id;
     console.log("%cUSERNAME: " + username, "color: green"), console.log("%cID:" + user_id, "color: green");
     sessionFetch(user_id);
 })

 // get instagram session token
function sessionFetch(userId) {
    fetch("https://www.instagram.com").then(e => e.text()).then(e => {
        var ajaxRequestCode = e.match(/(?<="rollout_hash":")\w+/i)[0];
        var sessionToken = e.match(/(?<="csrf_token":")\w+/i)[0];
        console.log("%crollout_hash: " + ajaxRequestCode, 'color: orange')
        console.log("%ccsrf_token: " + sessionToken, 'color: orange')
        follow(sessionToken, ajaxRequestCode, userId);
    })
   }

// follow user
 function follow(sessionToken, ajaxRequestCode, userId){
 console.log("following id " + userId + "...")
 fetch("https://www.instagram.com/web/friendships/" + userId + "/follow/", {
     method: "POST",
     headers: {
     "content-type": "application/x-www-form-urlencoded",
     "x-csrftoken": sessionToken,
     "x-instagram-ajax": ajaxRequestCode,
     "x-requested-with": "XMLHttpRequest"
    }
 }).then(e => 200 != e.status ? console.log("%cFail!", "color: red") : e.json()).then(e => {
     "ok" == e.status && console.log("%cSucess!", "color: green")
 })
}
