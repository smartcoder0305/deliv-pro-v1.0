const express = require("express");
const sendEmail = require('../utils/send-email');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");
const User = require('../model/User');
const Verification = require('../model/Verification');
const auth = require('../middleware/auth');

const router = express.Router();

// @route    POST api/users/auth
// @desc     Get auth token
// @access   Private
router.get('/auth', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({msg: "User not found"});
        }
        return res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route    POST api/users/signup
// @desc     Register user
// @access   Public
router.post(
    '/signup',
    check('name', 'Name is required').notEmpty(),
    check('company', 'Company name is required').notEmpty(),
    check('address', 'Company address is required').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const {company, name, email, address} = req.body;
        
        try {
            
            let user = await User.findOne({ email });
            
            if(user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
                }

                user = new User({
                name,
                email,
                address,
                company
            });
            await user.save();

            let verification_code = Math.floor(Math.random() * 8999 + 1000).toString();
            let verification = new Verification({
                id: user.id,
                code: verification_code,
            })
            await verification.save();
            
            jwt.sign(
                {user:{id: user.id}},
                config.get('jwtSecret'),
                { expiresIn: '5 mins' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

            // sendEmail(email, 'Please verify your email', verification_code);
            } catch(err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
)

// @route    POST api/users/verify
// @desc     Verify user
// @access   Private
router.post(
    '/verify',
    auth,
    check('code', 'Code is required').notEmpty(),
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try {
            const {code} = req.body;
            let user = await Verification.findOne({id: req.user.id});
            if(!user) {
                return res.status(404).json({msg: "Email not found"});
            }
            if(code !== user.code) {
                return res.status(401).json({msg: "Invalid code"});
            }
            await user.remove();
            user = await User.findByIdAndUpdate(req.user.id, {
                verified: true
            });
            
            jwt.sign(
                {user:{id: user.id}},
                config.get('jwtSecret'),
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            res.status(500).json({msg: 'Server error'});
        }
    }
)

// @route    POST api/users/login
// @desc     Log the user in
// @access   Public
router.post(
    '/login',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').notEmpty(),
    async(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user) {
                return res.status(400).json({ errors: [{ msg: 'Unregistered account' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res
                    .status(400)
                    .json({errors: [{msg: 'Wrong password'}]});
            }
            jwt.sign(
                {user: {id: user.id}},
                config.get('jwtSecret'),
                {expiresIn: '5 days'},
                (err, token) => {
                    if(err) throw err;
                    res.json({token});
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// @route    POST api/users/set-password
// @desc     Set password for the user
// @access   Private
router.post(
    '/set-password',
    auth,
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {password, confirmpassword} = req.body;
        if(password !== confirmpassword) {
            return res.status(400).json({errors: [{msg: `Passwords don't match`}]});
        }

        try {
            const salt = await bcrypt.genSalt(10);
            const newpassword = await bcrypt.hash(password, salt);
            let user = await User.findByIdAndUpdate(req.user.id, {
                password: newpassword
            });
            res.json({user});
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
)

module.exports = router;
