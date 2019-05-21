
  import { Router } from "express";
  import {CatController} from "../controllers/CatController";
  import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();

  //Get all users
  // router.get("/api/users", [checkJwt, checkRole(["ADMIN"])], CatController.listAll);
  router.get("/", CatController.findAll);

  export default router;