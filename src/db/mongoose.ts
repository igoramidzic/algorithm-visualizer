import mongoose from 'mongoose'
import { MONGODB_URI } from "../util/secrets";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})