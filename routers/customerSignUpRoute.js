const express = require('express');
const router = new express.Router();
const bcryptjs = require('bcryptjs');

const Customer = require('../models/customerModel');

router.post('/customers/register', (req, res) => {
  const email = req.body.email;

  Customer.findOne({ email: email }).then(result => {
    if (result !== null) {
      res.json({ msg: 'User already exists!' });
      return;
    }
    const fName = req.body.firstName;
    const lName = req.body.lastName;
    const age = req.body.age;
    const dob = req.body.dob;
    const phoneNo = req.body.phoneNo;
    const locName = req.body.locationName;

    const password = req.body.password;
    bcryptjs.hash(password, 10, (e, hashed_pw) => {
      const data = new Customer({
        firstName: fName,
        lastName: lName,
        age: age,
        email: email,
        password: hashed_pw,
        dob: dob,
        phoneNo: phoneNo,
        locationName: locName,
      });

      data
        .save()
        .then(() => {
          res.json({ message: 'User registered successfully 👍' });
        })
        .catch(err => {
          res.json({ message: 'User registration failed ❌', err: err });
        });
    });

    //   const img = req.body.image;
  });
});

// Customer login
router.post('/customer/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Customer.findOne({ email: email })
    .then(result => {
      if (result === null) {
        res.json({ message: 'Invalid credentials !' });
        return;
      }

      bcryptjs.compare(password, result.password, (err, success) => {
        if (!success) {
          res.json({ message: 'Invalid credentials !' });
          return;
        }

        res.json({ message: 'Logged In!' });
      });
    })
    .catch(e => res.json(e));
});

module.exports = router;
