import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from "class-validator";

export class UserController {

    public userRepository = getRepository(User);

    static all = async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        try{
            const user =  await userRepository.find();
            // user =  await  this.userRepository.find({select: ["id","firstName"] }); // use incase you want to select specific values
            res.send(user);
        }catch(error){
            res.status(500).send();
        }
    }

    static getOneById = async (req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        try{
            const user = await userRepository.findOneOrFail(req.params.id);
            return user ? res.send(user) : res.status(404).send();
        }catch(error){
            res.status(404).send();
            return;
        }
    }

    static saveUser = async (req: Request, res: Response, next: NextFunction) => {
          const userRepository = getRepository(User);
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
                await userRepository.save(user);
          } catch (e) {
            res.status(409).send("username already in use");
            return;
          }

        //If all ok, send 201 response
          res.status(201).send("User created");
    }

    static deleteUser = async(req: Request, res: Response, next: NextFunction) => {
        const userRepository = getRepository(User);
        let userToRemove : User;
        try{
             userToRemove = await userRepository.findOneOrFail(req.params.id);
        }catch(error){
            res.status(404).send("User not found");
            return;
        }
            let stat = await userRepository.remove(userToRemove);
            return stat ? res.send("User Deleted Successfully"): res.json({message:"error occured"})
            // return status ? status : res.json({message:"error occured, not found"})
    }

      static editUser = async (req: Request, res: Response) => {
          //Get the ID from the url
          const id = req.params.id;

          //Get values from the body
          const { username, age } = req.body;

          //Try to find user on database
          const userRepository = getRepository(User);
          let user;
          try {
            user = await userRepository.findOneOrFail(id);
          } catch (error) {
            //If not found, send a 404 response
            res.status(404).send("User not found");
            return;
          }

          //Validate the new values on model
          user.username = username;
          user.age = age;
          const errors = await validate(user);
          if (errors.length > 0) {
            res.status(400).send(errors);
            return;
          }

          //Try to safe, if fails, that means username already in use
          try {
            await userRepository.save(user);
          } catch (e) {
            res.status(409).send("username already in use");
            return;
          }
          //After all send a 204 (no content, but accepted) response
          res.status(204).send();

        }
}