import { Router, Response, Request } from "express"
import jwt from 'jsonwebtoken'
import { SECRET } from "../../../util/secrets";

import { UserDocument, User } from "../../../models/users/userModel"
import { ClientResponse, serverError } from "../../helpers/helpers"
import { isEmailAlreadyTaken } from "../../../api/queryHandlers/user/userQueryHandlers";
import { createNewUser } from "../../../api/commandHandlers/user/userCommandHandlers";

const routes: Router = Router()

/**
 * Authenticate a user
 */
routes.post('/login', (req: Request, res: Response) => {

    const { email, password } = req.body;

    User.findOne({ email })
        .then((user: UserDocument) => {
            if (!user) {
                const response = new ClientResponse(false, null);
                response.addMessage("Unable to log in with provided credentials.")
                return res.status(401).json(response);
            }

            // Compare passwords
            user.comparePassword(password, (err: Error, isMatch: boolean) => {
                if (err) return serverError(res);

                if (!isMatch) {
                    const response = new ClientResponse(false, null);
                    response.addMessage("Unable to log in with provided credentials.")
                    return res.status(401).json(response);
                }

                const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: 1000 * 60 * 60 });
                return res.status(200).json(new ClientResponse(true, { user, token }));
            });
        })
        .catch(err => serverError(res));
})

/**
 * Create a new user
 */
routes.post('/signup', async (req: Request, res: Response) => {
    const user: User = req.body;

    user.firstName = user.firstName.trim();
    user.lastName = user.lastName.trim();
    user.email = user.email.toLowerCase().trim();

    const credentialErrors: string[] = [];

    if (!user.firstName) credentialErrors.push("First name cannot be empty.")
    if (!user.lastName) credentialErrors.push("Last name cannot be empty.")
    if (!user.email) credentialErrors.push("Email cannot be empty.")
    if (!user.password || user.password.length < 8)
        credentialErrors.push("Password must be at least 8 characters long.")

    if (credentialErrors.length > 0)
        return res.status(400).json(new ClientResponse(false, null, credentialErrors));

    // Check if email is already taken
    const emailAlreadyTaken = await isEmailAlreadyTaken(user.email)

    if (emailAlreadyTaken) {
        const response = new ClientResponse(false, null);
        response.addMessage("Email is already taken.");
        return res.status(400).json(response);
    }

    await createNewUser(user)
        .then((newUser: UserDocument) => {
            const token = jwt.sign({ userId: newUser.id }, SECRET);
            return res.status(200).json(new ClientResponse(true, { newUser, token }));
        })
        .catch(() => serverError(res))
})

module.exports = routes;