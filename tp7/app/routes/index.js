var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students/students', { list: data }))
    .catch(err => res.render('error', { error: err }));
});

router.get('/students/register', function(req, res) {
  res.render('students/register')
});

router.get('/students/:id', function(req, res) {
  Student.get(req.params.id)
  .then(data => res.render('students/student', { student: data }))
  .catch(err => res.render('error', { error: err }));
});

router.post('/students', function(req, res) {
  let id = req.params.id
  let { numero, nome, git, tpc } = req.body
  
  tpc = tpc.map(item => Array.isArray(item) && item[1] === '1' ? 1 : 0);

  Student.insert({ id, numero, nome, git, tpc })
  .then(_ => res.redirect('/students'))
  .catch(err => res.render('error', { error: err }));
})

router.get('/students/:id/edit', function(req, res) {
  Student.get(req.params.id)
  .then(data => res.render('students/edit', { student: data }))
  .catch(err => res.render('error', { error: err }));
});

router.put('/students/:id', function(req, res) {
  let id = req.params.id
  let { numero, nome, git, tpc } = req.body
  
  tpc = tpc.map(item => Array.isArray(item) && item[1] === '1' ? 1 : 0);

  Student.update({id, numero, nome, git, tpc})
  .then(_ => res.redirect(`/students/${id}`))
  .catch(err => res.render('error', { error: err }));
})

router.delete('/students/:id', function(req, res) {
  Student.delete(req.params.id)
  .then(_ => res.redirect('/students'))
  .catch(err => res.render('error', { error: err }));
});

module.exports = router;
