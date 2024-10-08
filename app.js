import express from "express"
import primeStreamData from "./primeStreamData.js"
import cors from "cors"
import path from "node:path"

// App configuration
const app = express()
const port = 4903

// Configuration to serve ./assets
app.use(cors())
app.use(express.json())

app.use("/images", express.static(path.join(__dirname, "../public/images")))

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
app.get("/query/:name", (req, res) => {
  const name = req.params.name.toLowerCase()
  const movieList = primeStreamData.filter(movie =>
    movie.title.toLowerCase().includes(name),
  )
  res.json(movieList)
})

// Route to update the bookmarked movies
app.put("/primeStream/:title/bookmark", (req, res) => {
  const { title } = req.params
  const { isBookmarked } = req.body

  const item = primeStreamData.find(item => item.title === title)
  if (item) {
    item.isBookmarked = isBookmarked
    res.status(200).json({ message: "Bookmarked updated:", item })
  } else {
    res.status(404).json({ message: "Item not found:", item })
  }
})

export default app
