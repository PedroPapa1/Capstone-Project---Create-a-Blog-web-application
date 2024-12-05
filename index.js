import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [
  { id: 1, title: "Hello Word!!", content: "My name is Pedro Papa and I've created this blog, I hope you like it!" },
];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts });
});

app.post("/new-post", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };
  posts.push(newPost);
  res.redirect("/");
});

app.get("/edit-post/:id", (req, res) => {
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  res.render("edit.ejs", { post });
});

app.post("/edit-post/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find((post) => post.id === parseInt(req.params.id));
  post.title = title;
  post.content = content;
  res.redirect("/");
});

app.post("/delete-post/:id", (req, res) => {
  posts = posts.filter((post) => post.id !== parseInt(req.params.id));
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
