const express = require("express")
const apiRouter = express.Router()

const userController = require('../Controller/userController')
const garageController = require('../Controller/garageController')
const evenementController = require('../Controller/evenementController')
const serviceController = require('../Controller/serviceController')
const travauxController = require('../Controller/travauxController')
const vehiculeController = require('../Controller/vehiculeController')

apiRouter.post('/signup',userController.signupUser)
apiRouter.get('/users',userController.fetchUsers)
apiRouter.delete('/delete/user',userController.deleteUser)
apiRouter.post('/login',userController.login)
apiRouter.get('/private',userController.privateRoute)


module.exports = apiRouter;