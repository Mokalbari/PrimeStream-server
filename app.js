import express from "express"
import primeStreamData from "./primeStreamData.js"
import cors from "cors"
import path from "node:path"
import { fileURLToPath } from "node:url"

// App configuration
const app = express()
const port = 4903

// Configuration to serve ./assets
app.use(cors())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/assets", express.static(path.join(__dirname, "assets")))

// Main route to get all the data
app.get("/", (req, res) => res.json(primeStreamData))

// Route to fetch movies
app.get("/movies", (req, res) => {
  const movies = primeStreamData.filter(data => data.category === "Movie")
  res.json(movies)
})

// Route to fetch TV Series
app.get("/tvseries", (req, res) => {
  const tvSeries = primeStreamData.filter(data => data.category === "TV Series")
  res.json(tvSeries)
})

// Route to fetch by name
app.get("/:name", (req, res) => {
  const name = req.params.name.toLowerCase()
  const movieList = primeStreamData.filter(movie =>
    movie.title.toLowerCase().includes(name),
  )
  res.json(movieList)
})

app.listen(port, () =>
  console.log(`The app is running on http://localhost:${port}`),
)
