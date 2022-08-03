const router = require("express").Router();
const travelsController = require("../controllers/travels.controller");
const multer = require("multer");
const upload = multer();

router.get("/", travelsController.readTravel);
router.post("/", upload.single("file"), travelsController.createTravel);
router.put("/:id", travelsController.updateTravel);
router.delete("/:id", travelsController.deleteTravel);
router.patch("/like-travel/:id", travelsController.likeTravel);
router.patch("/unlike-travel/:id", travelsController.unlikeTravel);

//Commentaires

/*Le cas de patch est assez particulier, ca permet de ne modifier qu'un champ de l'objet, par exemple ici
les commentaires restent un seul champ (bien que sous forme d'array contenant plusieurs valeurs)
en somme, pour le CRUD de ce genre d'objets dans l'objet, patch est bien plus conseillé*/

router.patch("/comment-travel/:id", travelsController.commentTravel);
router.patch("/edit-comment-travel/:id", travelsController.editCommentTravel);
router.patch("/delete-comment-travel/:id", travelsController.deleteCommentTravel);

module.exports = router;