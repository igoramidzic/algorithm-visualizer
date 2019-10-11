import { Response, Request } from "express";

export enum Theme {
    Open = 1,
    Closed = 2
}

export class ClientResponse {
    isSuccess: boolean;
    result: object;
    messages: string[];

    constructor(isSuccess: boolean, result: object, messages?: string[]) {
        this.isSuccess = isSuccess;
        this.result = result;
        this.messages = messages ? messages : [];
    }

    addMessage(message: string): void {
        this.messages.push(message);
    }
}

export let serverError = (res: Response) => {
    const response = new ClientResponse(false, null);
    response.addMessage("Something went wrong. Try again.");
    return res.status(500).json(response);
}

export const asyncHandler = (fn: any) =>
    (req: Request, res: Response, next: any) => {
        Promise.resolve(fn(req, res, next))
            .catch(() => {
                serverError(res)
            });
    };