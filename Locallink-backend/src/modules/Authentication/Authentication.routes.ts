import { Router } from "express";
import passport from "passport";
import { authenticationController } from "./index.js";
// declare authentication router
const authenticationRouter: Router = Router();

// kicks off the redirect to google consent screen
authenticationRouter.route("/google").get(passport.authenticate("google", { scope: ["email", "profile"], session: false }));

// callback route for google callback
authenticationRouter.route("/google/callback").get(
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/ping", // replace with client failure page
    }),
    authenticationController.googleCallback.bind(authenticationController),
);



// logout route
authenticationRouter.route("/logout").get(authenticationController.logout.bind(authenticationController));
export default authenticationRouter;
