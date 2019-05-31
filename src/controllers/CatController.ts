import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from "class-validator";

export class CatController {

			public userRepository = getRepository(User);

				static findAll = async (req: Request, res: Response, next: NextFunction) => {
					const userRepository = getRepository(User);
				const take = req.query.take || 10 //take is also similar to limit
				const skip = req.query.skip || 10 //number of records to skip
				const keyword = req.query.keyword || '' // to match keywords in the database, use where clause in query

				const [result, total] = await userRepository.findAndCount(
						{
							where:{age:21},
							order:{id:"DESC"},
								take: take,
								skip: skip
						}
				);
				res.status(201).send({data:result,count:total});
		}

}