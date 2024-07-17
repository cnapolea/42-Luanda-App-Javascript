const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const SuperUser = require('../model/superUser.model');

/**
 * Here we will enable all calls coming from PowerBI to be able to be authenticated. 
 * This route should be exclusively known only to super users that will have access to the powerBI platform.
 * In order to be able to access the API, we will actually create a password and username authentication; therefore it will create an extra layer of safety.
 * When a user makes a call to a specific endPoint, we need to get that endpoint being requested [IMPORTANT]
 */


router.post('', async (req, res, next) => {
    const {username, password} = req.body;

    try {
        
        //Finding if super user exists.
        const user = await SuperUser.find({username});
        
        if (!user) {
            //If it doesn't exist through error
            res.status(401).json({
                message: 'Username/Password incorrect.'
            });
            throw new Error('Username not found.');
        }
        
        //Get password from DB as hash
        const userPassword = user.password;

        //Compare provided password from incoming request with the one stored in DB
        const passwordCheck = await bcrypt.compare(password, userPassword);
        
        if (!passwordCheck) {
             
            //Password does not match, send error
             res.status(401).json({
                message: 'Username/Password incorrect.'
            });

            throw new Error('Password incorrect.');
        }

        //if user validated, send to requested endpoint.
        res.redirect('');

    } catch (err) {
        next(err);
    }

});
