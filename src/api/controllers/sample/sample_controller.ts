import { Router, Response, Request } from "express";
import { ClientErrorResponse, serverError } from '../../helpers/helpers'
import { getSampleData } from '../../handlers/sample_handler';

const routes: Router = Router()

/**
 * Get sample data
 */
routes.get("/", async (req: Request, res: Response) => {
    try {
        let data = await getSampleData();
        return res.status(200).json(data);
    } catch{
        return serverError(res);
    }
})

module.exports = routes;