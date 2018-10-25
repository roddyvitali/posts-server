var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456',
  database: 'postgres'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/data', async (req, res) => {
  const text = 'INSERT INTO posts(name, description) VALUES($1, $2) RETURNING *'
  const values = [req.body.name, req.body.description]
  try {
    const response = await pool.query(text, values)
    res.json( { success: true, response: response.rows[0] })
  } catch(err) {
    res.json( { success: false, message: err.stack })
  }
});

router.delete('/data/:postId', async (req, res) => {
  const text = 'DELETE FROM posts WHERE id=($1) RETURNING *'
  const values = [req.params.postId]
  try {
    const response = await pool.query(text, values)
    res.json( { success: true, response: response.rows[0] })
  } catch(err) {
    res.json( { success: false, message: err.stack })
  }
});

router.get('/data', async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM posts')
    res.json( { success: true, response: response.rows })
    // console.log(response.rows[0])
  } catch(err) {
    res.json( { success: false, message: err.stack })
  }
});


module.exports = router;
