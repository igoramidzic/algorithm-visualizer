import { User, UserDocument } from '../../../models/users/userModel'

export let createNewUser = (user: User) => new Promise((resolve, reject) => {
    user.email = user.email.toLowerCase().trim();

    User.create(user)
        .then(async (user: UserDocument) => {
            resolve(user);
        })
        .catch((error: any) => {
            console.log(error)
            reject(error)
        })
})

export let updateUserDetails = (userId: string, updateUserDetails: User) => new Promise((resolve, reject) => {
    User.findById(userId)
        .then((user: UserDocument) => {
            user.firstName = updateUserDetails.firstName.trim();
            user.lastName = updateUserDetails.lastName.trim();
            user.email = updateUserDetails.email.toLowerCase().trim();
            user.save().then((updatedUser: UserDocument) => resolve(updatedUser));
        })
        .catch((error: any) => {
            reject(error);
        })
})

export let updateUserPassword = (userId: string, password: string) => new Promise((resolve, reject) => {
    User.findById(userId)
        .then((user: UserDocument) => {
            user.password = password;
            user.save().then(() => resolve(true));
        })
        .catch((error: any) => {
            reject(error);
        })
})

export let deleteUser = (userId: string) => new Promise((resolve, reject) => {
    User.findByIdAndDelete({ _id: userId })
        .then((user: UserDocument) => {
            resolve(user)
        })
        .catch((error: any) => {
            reject(error);
        })
})