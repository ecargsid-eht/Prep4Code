import Contest from "../models/ContestModel.js";

export async function getContests(req,res,next) {
    try{
        if(Object.keys(req.query).length !== 0 && req.query.platforms !== undefined){
            const contests = await Contest.find({platform:{$in:req.query.platforms.split(',')}});
            return res.status(200).json(contests);
        }
        const contests = await Contest.find({})
        res.status(200).json(contests);
    }
    catch(err){
        console.log(err);
    }
}

export async function createContest(req,res,next){
    try{
        const newContest = req.body;
        const contest = await Contest.create(req.body);
        res.status(201).json(contest);
    }
    catch(err){
        console.log(err)
    }
}