import serverless from "serverless-http"
import app from "../app.js"

module.exports.handler = serverless(app)
