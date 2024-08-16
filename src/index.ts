import express from "express"
import bodyParser from "body-parser"

const expressApp = express()
expressApp.use(bodyParser.urlencoded({extended: false}))
const App = async () => {
    expressApp.get("/", (req, res) => {
        res.send(200)
    })
}
App().then(async result => {
    expressApp.listen(8000, () => {
        console.log(`Listening on PORT 8000`)
    })
}).catch(error => {
    console.log(error)
})


