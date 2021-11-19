
// const amountElement = document.getElementById("amount")
// console.log(amountElement.value); 
// paypal.
//   Buttons({
//     // Sets up the transaction when a payment button is clicked
//     createOrder: function(data, actions) {
//       return actions.order.create({
//         purchase_units: [{
//           amount: {
//             value: amountElement.value   }
//         }]
//       });
//     },
//     // Finalize the transaction after payer approval
//     onApprove: function(data, actions) {
//       return actions.order.capture().then(function(details) {
//         // Successful capture! For dev/demo purposes:
//             console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
//             // var transaction = orderData.purchase_units[0].payments.captures[0];
//             // alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

//         // When ready to go live, remove the alert and show a success message within this page. For example:
//         // var element = document.getElementById('paypal-button-container');
//         // element.innerHTML = '';
//         // element.innerHTML = '<h3>Thank you for your payment!</h3>';
//         // Or go to another URL:  actions.redirect('thank_you.html');
//       });
//     }
//   }).render('#paypal');



  //inserting javascript date to the footer

document.getElementById("date").appendChild(document.createTextNode(new Date().getFullYear()));
