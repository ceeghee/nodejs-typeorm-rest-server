import {UserController} from "./controllers/UserController";
import { checkJwt } from "./middlewares/checkJwt";

export const Routes = [{
    method: "get",
    route: "/api/users",
    controller: UserController,
    action: "all",
    auth:checkJwt
}, {
    method: "get",
    route: "/api/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/api/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/api/users/:id",
    controller: UserController,
    action: "remove"
}];