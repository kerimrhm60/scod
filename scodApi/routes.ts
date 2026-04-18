import express from "express";
import log from "./src/logger/logger";
const morgan = require("morgan");
import cors from 'cors';
const helmet = require("helmet");
import auth from "./src/routes/auth/auth";
import suplier from "./src/routes/suplier/suplier";
import product from "./src/routes/product/product";
import sale from "./src/routes/sale/sale";
import purchase from "./src/routes/purchases/purchase";
import customer from "./src/routes/customer/customer";
import returns  from "./src/routes/return/return";
import rapor  from "./src/routes/rapor/rapor";


export const setRoutes = (app: express.Application) => {
  app.use(cors());
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true })); 
  app.use(log);
  if (app.get("env") === "development") {
    app.use(morgan('combined')); 
  }
  app.use(express.static("public"));
  app.use(helmet());

  app.use("/api/auth", auth);
  app.use("/api/suplier", suplier);
  app.use("/api/product", product);
  app.use("/api/sale", sale);
  app.use("/api/purchase", purchase);
  app.use("/api/customer", customer);
  app.use("/api/return", returns);
  app.use("/api/rapor", rapor);

};
