const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const FILE = "data.json";

app.get("/expenses", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

app.post("/expenses", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));

    const newExpense = {
        id: Date.now(),
        ...req.body
    };

    data.push(newExpense);

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.json(newExpense);
});

app.delete("/expenses/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));

    data = data.filter(item => item.id != req.params.id);

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.json({ message: "Deleted" });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
