import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet"
import * as cors from "cors"
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";
import { SocketServer } from './server';

createConnection().then(async connection => {

    // create express app
    // const app = express();

    let app = new SocketServer().getApp();

    //Call MiddleWares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.get('/',function(req,res){
    res.sendFile('public/index.html',{root:__dirname}); // When Get Method is used, return default Index
    })

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    // setup express app here
    // ...

    // start express server
    // app.listen(3000);

    

    // console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));


