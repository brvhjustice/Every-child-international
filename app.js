const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQv5o0fAMucABb4vkjh7SQLBCYOQBfqqtdMjcBhiVZ1MKCmlwvJOUvQt1FyNuyejqruEYmTZRkptgYFU',
    'client_secret': 'ECkZgiDwHb-ftVCE7D1ybMGmAXJ828btp0iVuZrXUXk8gNBl2jv3zu988W0TGumc1x8fKiafUDMsqLLO'
  });


const app = express();
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post('pay', (req, res) => {
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Every Child International",
                    "sku": "Donation",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "A donation for Every Child International"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0; i < payment.links.length;i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                    
                }
            }
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
});




app.listen(process.env.PORT, function() {
    console.log('Server is running on port 3000');
});