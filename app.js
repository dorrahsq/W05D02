const express = require("express");
const app = express();

app.use(express.json());
const PORT = 5000;

const Movies = [
  { id: 1, name: "friends", isFav: false, isDeleted: false },
  { id: 2, name: "broklyn99", isFav: false, isDeleted: false },
  { id: 3, name: "white collars", isFav: false, isDeleted: false },
];

//get not deleted
app.get("/get", (req, res) => {
  const notDeletedMov = [];
  Movies.map((ele) => {
    if (ele.isDeleted === false) {
      notDeletedMov.push({ ele });
    }
  });
  res.json(notDeletedMov);
});

//get the fav
app.get("/getFav", (req, res) => {
  const favMov = [];
  Movies.map((ele) => {
    if (ele.isFav === true) {
      favMov.push({ ele });
    }
  });
  res.json(favMov);
});

//get by id
app.get("/get/:id", (req, res) => {
  const id= req.params.id;
  const Movie = Movies.find((ele) => ele.id === Number(id)  );
  res.json(Movie);
});

//create
app.post("/create", (req, res) => {
  const { name } = req.body;
  Movies.push({ id: Movies.length + 1, name, isFav: false, isDeleted: false }); //يضيف الاسم وباي ديفولت بيكون الفييفوريت والديليتيد فولس
  res.json(Movies);
});

//update on fav
app.put("/put/:id", (req, res) => {
  const idd = req.params.id;
  for (let i = 0; i < Movies.length; i++) {
    if (Movies[i].id === Number(idd)) {
      Movies[i].isFav = true;
    }
  }
  res.json(Movies);
});

//delete
app.delete("/delete/:id", (req, res) => {
  const iddd = req.params.id;
  for (let i = 0; i < Movies.length; i++) {
    if (Movies[i].id === Number(iddd)) {
      Movies[i].isDeleted = true;
    }
  }
  res.json(Movies);
});

app.listen(PORT, () => {
  console.log(`running on port  ${PORT}`);
});
