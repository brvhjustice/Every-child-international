
require('dotenv').config()
const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";

paypal.configure({
    'mode': 'sandbox', //sandbox or live
     client_id: process.env.CLIENT_ID,
     client_secret: process.env.CLIENT_SECRET
     });
  

const app = express();
app.set('view engine', 'ejs')
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.get("/volunteer.html", function(req, res){
    res.sendFile(__dirname + "volunteer.html")
})

app.get("/success.html", function(req, res){
    res.sendFile(__dirname + "../index.html")
    console.log("Back Home Successfully");
})

app.post('/pay', (req, res) => {
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
           
        }
    });
});

app.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": "25.00"
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment){
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            // console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.sendFile(__dirname + "/public/success.html")
        }
    });
});


app.get('/cancel', (req, res) => res.sendFile(__dirname + "/public/cancel.html"));


app.listen(process.env.PORT || 3000, function() {
    console.log('Server is running on port 3000');
});