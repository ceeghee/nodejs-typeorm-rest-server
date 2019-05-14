import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from "class-validator";

export class UserController {

    private userRepository = getRepository(User);

    async all(req: Request, res: Response, next: NextFunction) {
        let user: User[];
        try{
            user =  await  this.userRepository.find();
            // user =  await  this.userRepository.find({select: ["id","firstName"] }); // use incase you want to select specific values
            return user;
        }catch(error){
            res.status(500).send();
        }
    }

    async one(req: Request, res: Response, next: NextFunction) {
        let user: User;
        try{
            user = await this.userRepository.findOne(req.params.id);
            return user ? user : res.status(404).send();
        }catch(error){
            res.status(404).send();
        }
    }

    async save(req: Request, res: Response, next: NextFunction) {
          let { username, password, age } = req.body;
          let user = new User();
          user.username = username;
          user.password = password;
          user.age = age;

          //Validade if the parameters are ok
          const errors = await validate(user);
          if (errors.length > 0) {
            res.status(400).send(errors);
            return;
          }

          //Hash the password, to securely store on DB
          user.hashPassword();

          try {
                await this.userRepository.save(user);
          } catch (e) {
            res.status(409).send("username already in use");
            return;
          }

        //If all ok, send 201 response
          res.status(201).send("User created");
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        let userToRemove : User;
        try{
             userToRemove = await this.userRepository.findOneOrFail(req.params.id);
        }catch(error){
            res.status(404).send("User not found");
            return;
        }
            console.log(userToRemove);
            return userToRemove ? await this.userRepository.remove(userToRemove): res.json({message:"error occured"})
            // return status ? status : res.json({message:"error occured, not found"})
    }

}