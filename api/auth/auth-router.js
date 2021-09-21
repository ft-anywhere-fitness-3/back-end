const router = require('express').Router()
const User = require('./auth-model')
const bcrypt = require('bcryptjs')
const tokenBuilder = require('./token-builder')
const {checkPayload,checkIfUsernameExists} = require('./auth-middleware')

router.post('/register', checkPayload, checkIfUsernameExists,async (req, res, next) => {
    try {
        const { username, password, role } = req.body

        const hash = bcrypt.hashSync(password, 8)
        const newUser = {username, password: hash, role}
        const user = await User.add(newUser)

        res.status(201).json({message: `u have successfully created an account with ${user.username} username`})
    } catch (err) {
        next(err)
    }
})

router.post('/login',(req, res, next) => {
        const { username, password } = req.body
        User.findBy({ username })
        .then(([existingUser]) => {
            if(existingUser && bcrypt.compareSync(password, existingUser.password)) {
                const token = tokenBuilder(existingUser)
                const role = 
                res.status(201).json({ message: `Welcome back ${existingUser.username}`,
                token, 
                
            })
    
            } else {
                next({ status: 401, message: 'bad credentials'})
            }
        })
        .catch (next)
})
module.exports = router