const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

function getDate() {
  let currentDate = new Date();
  let Day = String(currentDate.getDate()).padStart(2, "0");
  let Month = String(currentDate.getMonth() + 1).padStart(2, "0");
  let Year = currentDate.getFullYear();
  currentDate = `${Day}-${Month}-${Year}`;
  return currentDate;
}

function getDateData(filename) {
  filename = filename.replace(".txt", "");
  let [day, month, year] = filename.split("-");
  let months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

app.get("/", (req, res) => {
  fs.readdir("./files", function (err, files) {
    let totalEntries = files.length;
    let latestEntry = files.length > 0 ? files[files.length - 1] : "No entries yet";
    res.render("ReadFile", { files, totalEntries, latestEntry, getDateData });
  });
});

app.get("/create", (req, res) => {
  res.render("CreateFile", { error: null, data: "" });
});

app.post("/create", (req, res) => {
  const { data } = req.body;
  if (typeof data !== "string" || !data.trim()) {
    return res.status(400).render("CreateFile", {
      error: "Please enter details before creating the entry.",
      data: typeof data === "string" ? data : "",
    });
  }
  const filename = `${getDate()}.txt`;
  fs.writeFile(`./files/${filename}`, data, (err) => {
    if (err) return res.status(500).send("Error : " + err.message);
    else return res.redirect("/");
  });
});

app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, data) {
    let date = getDateData(req.params.filename);
    if (err) return res.status(500).send("Error : " + err.message);
    else res.render("EditFile", { data, filename: req.params.filename, date });
  });
});

app.post("/update/:filename", (req, res) => {
  fs.writeFile(`./files/${req.params.filename}`, req.body.data, function (err) {
    if (err) return res.status(500).send("Error : " + err.message);
    else res.redirect("/");
  });
});

app.get("/delete/:filename", (req, res) => {
  res.render("DeleteFile", { filename: req.params.filename, date: getDateData(req.params.filename) });
});

app.listen(3000, () => {
  console.log("Server is running");
});
