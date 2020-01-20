import { Response, Request } from "express";

export class ClientErrorResponse {
    errors: string[];

    constructor(errors?: string[]) {
        this.errors = errors ? errors : [];
    }

    addError(error: string): void {
        this.errors.push(error);
    }
}

export let serverError = (res: Response) => {
    const response = new ClientErrorResponse(["Something went wrong. Try again."]);
    return res.status(500).json(response);
}

export const asyncHandler = (fn: any) =>
    (req: Request, res: Response, next: any) => {
        Promise.resolve(fn(req, res, next))
            .catch(() => {
                serverError(res)
            });
    };