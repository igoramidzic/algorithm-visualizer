import { Router } from "express"

const routes: Router = Router()

routes.use('/sample', require('./sample/sample_controller'));

routes.use('**', (req, res) => {
    res.status(404).json({
        error: 'Api endpoint does not exist'
    })
})

module.exports = routes