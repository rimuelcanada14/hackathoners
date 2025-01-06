import express, { json } from 'express';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/home', function (req, res) {
  res.send('GG MGA BOSS')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });