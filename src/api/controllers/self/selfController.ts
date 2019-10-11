import { Router, Response, Request } from "express";
import { ClientResponse, serverError, asyncHandler } from '../../helpers/helpers'
import { updateUserDetails, updateUserPassword, deleteUser } from "../../../api/commandHandlers/user/userCommandHandlers";
import { UserDocument, User } from "../../../models/users/userModel";
import { isEmailAlreadyTaken } from "../../../api/queryHandlers/user/userQueryHandlers";

const routes: Router = Router()

/**
 * Get current user details
 */
routes.get("/", (req: Request, res: Response) => {
    res.status(200).json(new ClientResponse(true, { user: req.user }))
});

/**
 * Update user details
 */
routes.put("/", asyncHandler(async (req: Request, res: Response) => {
    const user: User = req.body;

    user.firstName = user.firstName.trim();
    user.lastName = user.lastName.trim();
    user.email = user.email.toLowerCase().trim();

    const credentialErrors: string[] = [];

    if (!user.firstName) credentialErrors.push("First name cannot be empty.")
    if (!user.lastName) credentialErrors.push("Last name cannot be empty.")
    if (!user.email) credentialErrors.push("Email cannot be empty.")

    // Check if email is already taken
    if (req.user.email !== user.email && await isEmailAlreadyTaken(user.email)) {
        const response = new ClientResponse(false, null);
        response.addMessage("Email is already taken.")
        return res.status(400).json(response);
    }

    updateUserDetails(req.user.id, user)
        .then((user: UserDocument) => {
            res.status(200).json(new ClientResponse(true, { user }))
        })
        .catch(err => serverError(res))
}));

/**
 * Update user password
 */
routes.put("/password", asyncHandler(async (req: Request, res: Response, next: any) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const credentialErrors: string[] = [];

    if (!currentPassword) credentialErrors.push("Current password cannot be empty.")
    if (!newPassword) credentialErrors.push("New password cannot be empty.")
    if (newPassword && newPassword.length < 8)
        credentialErrors.push("New password must be at least 8 characters.")
    if (newPassword && newPassword !== confirmPassword) credentialErrors.push("Passwords do not match.")

    if (credentialErrors.length > 0)
        return res.status(400).json(new ClientResponse(false, null, credentialErrors));

    // Check if currentPassword matches
    req.user.comparePassword(currentPassword, (err: Error, isMatch: boolean) => {
        if (err) return serverError(res);

        if (!isMatch) {
            const response = new ClientResponse(false, null);
            response.addMessage("Current password is incorrect.")
            return res.status(400).json(response);
        }

        updateUserPassword(req.user.id, newPassword)
            .then(() => res.json(new ClientResponse(true, null)))
    })
}));

/**
 * Delete user
 */
routes.delete("/", asyncHandler(async (req: Request, res: Response, next: any) => {
    deleteUser(req.user.id)
        .then((user: UserDocument) => res.json(new ClientResponse(true, user)))
        .catch((error) => {
            serverError(res);
        })
}));

module.exports = routes;