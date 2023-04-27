
const express = require('express');
const app = express();
let port = 5000;
app.listen(process.env.port || port, () =>{
  console.log('Servidor em execução no porto: '+ port);
});
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", function(req, res){
  res.send("END POINT INVÁLIDO!");
});

const routes = require("./src/routes/api");
app.use("/api", routes);

