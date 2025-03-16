import mongoose from "mongoose";
const contestSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        platform: {
            type: String,
            required: true,
        },
        startTime: {
            type: Date,
            required: true
        },
        url:{
            type:String,
            default:null
        },
        solutionLink: {
            type: String,
            default: null,
        },
        isPast: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const Contest = mongoose.model("Contest", contestSchema);
export default Contest
