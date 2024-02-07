import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


let blogPosts = [
  { id: 1, title: "Best free Python resources",  time: "5 mins", image: "Blog1.jfif" },
  { id: 2, title: "Fullstack Development Roadmap", time: "32 mins", image: "Blog2.jfif" },
  { id: 3, title: "5 Amazing Websites Useful For Web Developers.", time: "1 hour", image: "Blog3.jfif" },
  { id: 4, title: "How to Upload a Website for Free on Github.", time: "4 hours", image: "Blog4.jfif" },
  { id: 5, title: "5 Amazing Backend Frameworks for Web Developers.", time: "5 hours", image: "Blog5.jfif" },
  { id: 6, title: "Top 10 Github Repositories for Web Developers.</", time: "12 hours", image: "Blog6.jfif" }
];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));





app.get("/", (req, res) => {
  res.render("index.ejs", { blogPosts });
});


app.get("/feed", (req, res) => {
  res.render("newsfeed.ejs", { blogPosts });
});


app.get("/view/:id", (req, res) => {
  const blogId = req.params.id;
  const blog = blogPosts.find(blog => blog.id == blogId);
  res.render("view.ejs", { blog });
});

app.get("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const blog = blogPosts.find(blog => blog.id == blogId);
  res.render("edit.ejs", { blog });
});


app.post("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const updatedTitle = req.body.title;
  const updatedTime = req.body.time;

  const updatedBlog = blogPosts.find(blog => blog.id == blogId);
  if (updatedBlog) {
    updatedBlog.title = updatedTitle;
    updatedBlog.time = updatedTime;
  }

  res.redirect("/feed");
});

app.get("/delete/:id", (req, res) => {
  const blogId = req.params.id;
  const updatedPosts = blogPosts.filter(blog => blog.id != blogId);
  blogPosts = updatedPosts;
  res.redirect("/feed");
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
