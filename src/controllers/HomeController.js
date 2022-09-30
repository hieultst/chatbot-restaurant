require("dotenv").config();

let getHomePage = (req, res) => {
    return res.render("homepage.ejs");
};

let postWebhook = (req, res) => {
    let body = req.body;

    // Checks this is an event from a page subcription
    if (body.object === "page") {
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {
            // Gets the message, entry.massaging is an array, but
            // will only ever contain one massage, so we get index 0
            let webhook_event = entry.massaging[0];
            console.log(webhook_event);
        });
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
    } else {
        // Returns a '404 Not Found' if event is not from a page subcription
        res.status(404);
    }
};

let getWebhook = (req, res) => {
    // Your verify token. Should be a random string
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === VERIFY_TOKEN) {
            // Respond with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Respond with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

module.exports = {
    getHomePage,
    postWebhook,
    getWebhook,
};