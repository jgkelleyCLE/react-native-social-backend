import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    imageUrl: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true })

const Post = mongoose.model('post', postSchema)

export default Post