import express from "express"
const app = express()

const sayHello = (req, res) => res.send("Hello World!")
app.get("/", sayHello)

const port = 4903
app.listen(port, () =>
  console.log(`The app is running on http://localhost:${port}`),
)
