//inserting javascript date to the footer

document.getElementById("date").appendChild(document.createTextNode(new Date().getFullYear()));

// console.log('Client-side code running');

// const button = document.getElementById('myDonate');
// button.addEventListener('click', function() {
//   console.log('button was clicked');
// });


// fetch('/clicked', {method: 'POST'})
// .then(function(response) {
//   if(response.ok) {
//     console.log('Click was recorded');
//     return;
//   }
//   throw new Error('Request failed.');
// })
// .catch(function(error) {
//   console.log(error);
// });


// setInterval(function() {
//   fetch('/clicks', {method: 'GET'})
//     .then(function(response) {
//       if(response.ok) return response.json();
//       throw new Error('Request failed.');
//     })
//     .then(function(data) {
//       document.getElementById('counter').innerHTML = `Button was clicked ${data.length} times`;
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }, 1000);