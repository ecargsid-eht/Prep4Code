import User from "../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function getUser(req, res, next){
    try {
        const user = await User.findById(req.user.user._id); // Assuming user ID is stored in the token
        if (!user) return res.sendStatus(404); // Not Found
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }

}

export async function handleLogin(req, res, next){
    try{
        const user = await User.findOne({username:req.body.username});
        if(!user){
            const error = new Error('Either username or password is wrong.');
            error.status = 401;
            return next(error);
        }
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(result){
                let token = jwt.sign({user},process.env.SECRET_KEY);
                res.cookie('token', token);
                res.status(200).json({user, token});
            }
            else{
                const error = new Error('Either username or password is wrong.');
                error.status = 401;
                return next(error);
            }
        })
    }
    catch(err){
        console.log(err)
    }
}
export async function handleRegister(req, res, next){
    try{
        const existingUser = await User.findOne({ username:req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }
        bcrypt.hash(req.body.password,10,async (err,hash) => {
            const user = await User.create({name:req.body.name, username:req.body.username, password:hash});
            let token = jwt.sign({user}, process.env.SECRET_KEY)
            res.cookie('token', token);
            res.status(201).json({user,token})
        })
    }
    catch(err){
        console.log(err)
    }
}

export async function handleLogout(req, res, next){
    try{
        res.cookie("token",null);   
    }
    catch(err){
        console.log(err);
    }
}

export async function handleBookmark(req, res, next) {
    try {
        const contestId = req.params.id;
        const userId = req.user.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User  not found.' });
        }
        const isBookmarked = user.bookmarks.some(bookmark => bookmark._id.toString() === contestId);

        if (isBookmarked) {
            user.bookmarks = user.bookmarks.filter(bookmark => bookmark._id.toString() !== contestId);
            await user.save();
            return res.status(200).json({ message: 'Bookmark removed.' });
        } else {
            user.bookmarks.push({ _id: contestId });
            await user.save();
            return res.status(201).json({ message: 'Contest bookmarked.' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred.' });
    }
}
