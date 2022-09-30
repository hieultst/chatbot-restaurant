import express from "express";
import homeController from "../controllers/HomeController";

let router = express.Router();

let initWebRouter = (app) => {
    router.get("/", homeController.getHomePage);

    router.post("/webhook", homeController.postWebhook);
    router.get("/webhook/", homeController.getWebhook);
    return app.use("/", router);
};

module.exports = initWebRouter;
