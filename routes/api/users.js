const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');
const {oddEvenSort} = require('../type1');
const {reverse} = require('../type2');
const {absent} = require('../type3');

router.post('/userLogin', auth.optional, (req, res) => {
  const { body: { user } } = req;
  Users.find({ email: user.email }).exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "This mail already exists"
        });
      }
    })
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'Email is required',
      }
    });
  } if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'Password is required',
      }
    });
  }
  const finalUser = new Users(user);
  finalUser.setPassword(user.password);
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.get('/current', auth.required, (req, res) => {
  const { payload: { id } } = req;
  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

router.post('/type1',auth.required,(req,res) =>{ 
  return res.status(200).json({
    sortedResult: oddEvenSort(req.body.arr)
  });
});
router.post('/type2',auth.required,(req,res) =>{
  var charArray = (req.body.str).split('');
  reverse(charArray);
  var revStr = charArray.join('');
  return res.status(200).json({
    reversedString: revStr
  });
});
router.post('/type3',auth.required,(req,res)=>{
  return res.status(200).json({
    missingItems: absent(req.body.arr)
  });
});
module.exports = router;