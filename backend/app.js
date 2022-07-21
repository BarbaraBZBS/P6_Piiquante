const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet créé !'
      });
  })

app.get('/api/sauces', (req, res, next) => {
    const sauces = [
      {
        userId: '111',
        _id: '1',
        name: 'sauce 1',
        manufacturer: 'untel',
        description: 'Les infos de sauce 1',
        mainPepper: 'ingrédient épicé 1',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        heat: 2,
        likes: 3,
        dislikes: 2,
        usersLiked: ['111', '122', '133'],
        usersDisliked: ['144', '155'],
      },
      {
        userId: '122',
        _id: '2',
        name: 'sauce 2',
        manufacturer: 'untel untel',
        description: 'Les infos de sauce 2',
        mainPepper: 'ingrédient épicé 3',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        heat: 4,
        likes: 5,
        dislikes: 0,
        usersLiked: ['111', '122', '133','144', '155'],
        usersDisliked: [],
      },
    ];
    res.status(200).json(sauces);
  });

module.exports = app;