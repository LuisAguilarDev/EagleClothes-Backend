import dotenv from "dotenv";
import mercadopago from "mercadopago";

dotenv.config({ path: "./../../.env" });

mercadopago.configure({
  access_token: process.env.PROD_ACCESS_TOKEN
    ? process.env.PROD_ACCESS_TOKEN
    : "",
});

export { mercadopago };
