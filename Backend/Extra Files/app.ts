import express from "express"
import { prisma } from "./prisma/prisma"

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/test" method="POST">
        <label for="fname"></label>
        <input type="text" name="fname">
        <button type="submit">submit</button>
    </form>
</body>
</html>`)
});

app.post("/test", (req, res) => {
  console.log(req.body)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});