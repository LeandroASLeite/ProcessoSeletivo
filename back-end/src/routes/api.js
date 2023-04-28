const express = require ("express");
const router = express.Router();
// importa controlador 'apiController.js' da pasta: 
// "../controllers/apiController"
const apiController = require("../controllers/apiController");
// url do teste será: http://localhost:5000/api/teste
module.exports = router;
// url do teste será: http://localhost:5000/api/teste

// TODO: listar pontos de interesse da BD
router.get("/read",apiController.read);
router.get("/readTime",apiController.readTime);
// TODO: adicionar novo ponto de interesse
router.post("/create",apiController.create);
// TODO: atualizar ponto de interesse
router.put("/update/:id",apiController.update);
// TODO: apagar ponto de interesse
router.delete("/delete/:id",apiController.delete);
module.exports = router;
