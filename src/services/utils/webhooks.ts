import express from 'express'
import { IWebHookBasic } from '../../types/webhooks.js'

export function createApi(data: any) {
    const app = express()
    app.use(express.json())
  
    app.post('/', (req, res) => {
        const body: IWebHookBasic = req.body;

        if(!data[body.type]){
            res.status(400).send({
                "Error": `Webhook type of '${body.type}' not been assigned a function.`
            })
        }
        else {
            try {
                data[body.type](body)
                res.sendStatus(200)
            }
            catch (e) {
                console.error(e);
                res.sendStatus(500);
            }
        }
    })
    return app;   
}




