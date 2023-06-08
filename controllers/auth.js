
const {response} = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')


const loginUser = async(request, resp = response) => {

    const {email, password} = request.body;

    try {

        let user = await User.findOne({email});
        if(!user) {
            return resp.status(400).json({
                ok:false,
                msg:'Email does not match this password'
            })
        }

        //confirm passwords
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword){
            return resp.status(400).json({
                ok:false,
                msg:'Email does not match this password'
            })
        }

        //Generate JWT (Json Web Token)
        const token = await generateJWT(user.id, user.name);

        resp.status(201).json({
            ok:true,
            uid: user.id,
            name:user.name,
            token
        })
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Please, make contact with admin'
        })
    }

    
}

const createUser = async(request, resp = response) => {

    const { email, password } = request.body;

    try {

        let user = await User.findOne({email});

        if(user) {
            return resp.status(400).json({
                ok:false,
                msg:'User already exists with this email'
            })
        }
        
        user = new User(request.body);

        //crypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();

        //Generate JWT (Json Web Token)
        const token = await generateJWT(user.id, user.name);


        resp.status(201).json({
            ok:true,
            uid: user.id,
            name:user.name,
            token
        })
    } catch (error) {
        console.log(error)
        resp.status(500).json({
            ok:false,
            msg:'Please, make contact with admin'
        })
    }
    
}

const renewToken = async(request, resp = response) => {

    const uid = request.uid;
    const name = request.name;

    //generate new JWT, and return it
    const token = await generateJWT(uid, name);

    resp.json({
        ok:true,
        token
    })
}



module.exports = {
    createUser,
    loginUser,
    renewToken
}



