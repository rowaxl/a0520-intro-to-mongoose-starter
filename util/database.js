import mongoose from 'mongoose'

const URL = 'mongodb://127.0.0.1:27017/member_manager'

let instance = null

export const initialize = async () => {
    if (!instance)
        instance = await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })

    return instance
}