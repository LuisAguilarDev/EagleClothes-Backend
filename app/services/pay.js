const mercadopago = require("mercadopago");

const PUBLICK_KEY2 = "TEST-495594a8-240a-4c4f-a469-1216b94bd885";
const PROD_ACCESS_TOKEN2 =
  "TEST-8337362914495960-112018-40b44c64d1651b579bca5e8a795845a2-691387682";

mercadopago.configurations.setAccessToken(PROD_ACCESS_TOKEN2);

async function validate() {
  let answer = await mercadopago.payment_methods.listAll();
  console.log(answer);
}
console.log(validate());
