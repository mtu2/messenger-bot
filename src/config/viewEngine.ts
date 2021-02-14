import express, { Express } from "express";

export const configViewEngine = (app: Express): void => {
  app.use(express.static("./public"));
  app.set("view engine", "ejs");
  app.set("views", "./views");
};
