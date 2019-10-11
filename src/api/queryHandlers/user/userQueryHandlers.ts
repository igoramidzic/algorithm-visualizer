import { User, UserDocument } from "../../../models/users/userModel";

export let isEmailAlreadyTaken = (email: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
        User.findOne({ email })
            .then((user: UserDocument) => {
                resolve(user ? true : false);
            })
            .catch(error => {
                reject(error);
            })
    });

export let getAllUsers = () => new Promise((resolve, reject) => {
    User.find()
        .then((users: UserDocument[]) => {
            resolve(users);
        })
        .catch(error => {
            reject();
        });
});