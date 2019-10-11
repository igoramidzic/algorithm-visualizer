import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt-nodejs';

export type User = {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string
}

export type UserDocument = mongoose.Document & {
    firstName: string,
    lastName: string,
    email: string,
    password: string,

    tokens: AuthToken[],

    comparePassword: comparePasswordFunction
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMath: any) => {}) => void;

export type AuthToken = {
    accessToken: string,
    kind: string
}

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 8 },
    tokens: { type: Array },
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.pre("save", function save(next) {
    const user: any = this;

    user.email = user.email.toLowerCase().trim();

    if (!user.isModified("password")) { return next(); }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err) }

        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) { return next(err) }

            user.password = hash;
            next();
        })
    })
})

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch)
    })
}

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("User", userSchema);
