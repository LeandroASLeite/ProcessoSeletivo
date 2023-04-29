const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors({
  origin: ['http://localhost:3000']
}));
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

const mongoose = require("mongoose");
// Ligar á B.D.: 'test'->user da BD, ´nnn´->pass
mongoose.connect("mongodb+srv://root:root@cluster0.72hkgfm.mongodb.net/test");
// Confirma ligação na consola
mongoose.connection.on("connected", function () {
  console.log("Connected to Database "+"test");
});
// Mensagem de Erro
mongoose.connection.on("error", (err) => {
  console.log("Database error "+err);
});
app.use(function(err, req, res, next){
  console.log(err);
 // ‘res.status(422)’->muda o status
 res.status(422).send({error: err.message});
});