const express = require("express");
const app = express();

app.use(express.json());
const PORT = 5500;

const fs = require("fs");

let nweM = [];

fs.readFile("./movies.json", (err, data) => {
  nweM = JSON.parse(data.toString());
});

//get not deleted
app.get("/get", (req, res) => {
  const notDeletedMov = []; //ok?? //مايحتاج اكتب عالملف لانه بس قيت
  nweM.map((ele) => {
    if (ele.isDeleted === false) {
      notDeletedMov.push({ ele });
    }
  });
  res.json(notDeletedMov);
});

//get the fav
app.get("/getFav", (req, res) => {
  const favMov = [];
  nweM.map((ele) => {
    if (ele.isFav === true) {
      favMov.push({ ele });
    }
  });
  res.json(favMov);
});

//get by id
app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const Movie = nweM.find((ele) => ele.id === Number(id));
  res.json(Movie);
});

//create
app.post("/create", (req, res) => {
  const { name } = req.body;
  nweM.push({
    id: nweM.length + 1,
    name: name,
    isFav: false,
    isDeleted: false,
  }); //يضيف الاسم وباي ديفولت بيكون الفييفوريت والديليتيد فولس
  fs.writeFile("./movies.json", JSON.stringify(nweM), (err) => {});
  res.json(nweM);
});

//update on fav (fav)
app.put("/putFav/:id", (req, res) => {
  const idd = req.params.id;
  for (let i = 0; i < nweM.length; i++) {
    if (nweM[i].id === Number(idd)) {
      nweM[i].isFav = true;
    }
  }
  fs.writeFile("./movies.json", JSON.stringify(nweM), (err) => {});
  res.json(nweM);
});

//update on fav (unfav)
app.put("/putUn/:id", (req, res) => {
  const idd = req.params.id;
  for (let i = 0; i < Movies.length; i++) {
    if (nweM[i].id === Number(idd)) {
      nweM[i].isFav = false;
    }
  }
  fs.writeFile("./movies.json", JSON.stringify(nweM), (err) => {});
  res.json(nweM);
});

//delete
app.delete("/delete/:id", (req, res) => {
  const iddd = req.params.id;
  for (let i = 0; i < nweM.length; i++) {
    if (nweM[i].id === Number(iddd)) {
      nweM[i].isDeleted = true;
    }
  }
  fs.writeFile("./movies.json", JSON.stringify(nweM), (err) => {});
  res.json(nweM);
});

app.listen(PORT, () => {
  console.log(`running on port  ${PORT}`);
});
