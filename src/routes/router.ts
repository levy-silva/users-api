import express, { Application } from "express";
import users from "./users-routes";

export const router = (app: Application) => {
  app.route("/").get((req, res) => res.status(200).send("Hello World!"));
  app.use(express.json(), users);
};
