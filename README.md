# follow-unfollow-user-instagram-pure-js
You can follow or unfollow user with js only, this code has a function to get the current session and allows the request to follow or unfollow someone.

remember the code needs to be injected into the instagram.com domain, it is not possible to inject the code into third-party sites because Instagram CORS will not receive the request.

```
username = prompt("follow username:"); // username to follow

// get the account id by username
fetch("https://www.instagram.com/" + username + "/?__a=1&__d=dis").then(e => e.json()).then(e => {
     user_id = e.graphql.user.id;
     sessionFetch(user_id);
 })

 // get instagram session token
function sessionFetch(userId) {
    fetch("https://www.instagram.com").then(e => e.text()).then(e => {
        var ajaxRequestCode = e.match(/(?<="rollout_hash":")\w+/i)[0];
        var sessionToken = e.match(/(?<="csrf_token":")\w+/i)[0];
        follow(sessionToken, ajaxRequestCode, userId)
    })
   }

// follow user
 function follow(sessionToken, ajaxRequestCode, userId){
 fetch("https://www.instagram.com/web/friendships/" + userId + "/follow/", {
     method: "POST",
     headers: {
     "content-type": "application/x-www-form-urlencoded",
     "x-csrftoken": sessionToken,
     "x-instagram-ajax": ajaxRequestCode,
     "x-requested-with": "XMLHttpRequest"
    }
 }).then(e => 200 != e.status ? console.log("Falha na operação") : e.json()).then(e => {
     "ok" == e.status && console.log("Sucesso")
 }).catch(e => {
     console.log(e)
 })
}
```
