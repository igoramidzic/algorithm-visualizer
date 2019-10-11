import { Router, Request, Response } from "express"

const routes: Router = Router()

// Public
routes.use('/auth', require('./_auth/authController'))

// Auth Protected
routes.use((req: Request, res: Response, next: any) => {
    req.user ? next() : res.status(401).json({ error: 'login is required' });
}), routes.use('/self', require('./self/selfController')),
    routes.use('**', (req, res) => {
        res.status(404).json({
            error: 'Api endpoint does not exist'
        })
    })

module.exports = routes