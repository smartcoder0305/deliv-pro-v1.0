const express = require('express');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');
const Delivery = require('../model/Delivery');
const User = require('../model/User');

const router = express.Router();

// @route    POST api/delivery/new
// @desc     Add delivery
// @access   Private
router.post('/new',
    auth,
    check('route', 'Route is required').notEmpty(),
    check('contact', 'Contact person is required').notEmpty(),
    check('phone', 'Phone is required').notEmpty(),
    check('vehi_type', 'Vehicle type is required').notEmpty(),
    check('trip_name', 'Trip name or code is required').notEmpty(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        try {
            const {date, route, ...rest} = req.body;
            if(!isNaN(Date.parse(date))) {
                rest.date = date;
            }
            const newDeliveryRoute = new Delivery({
                user: req.user.id,
                route: route.map((location, index) => ({index, ...location})),
                ...rest
            });
            const deliveryRoute = await newDeliveryRoute.save();
            return res.json(deliveryRoute);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
)

// @route    POST api/delivery/overview
// @desc     Get all devliveries
// @access   Private
router.post(
    '/overview',
    auth,
    async (req, res) => {
        try {
            const deliveries = await Delivery.find({
                user: req.user.id
            });
            res.json(deliveries);
        } catch (err) {
            console.error(err);
            res.status(500).json({errors: [{msg: 'Server error'}]});
        }
    }
);

// @route    POST api/delivery/overview
// @desc     Get all devliveries
// @access   Private
router.post(
    '/search',
    auth,
    async (req, res) => {
        const {from, to} = req.body;
        console.log(from, to);
        try {
            const deliveries = await Delivery.find({
                route: {
                    $all: [{$elemMatch: {...from}},{$elemMatch: {...to}}]
                  },
                  $expr: {
                    $lt: [
                      {
                        $min: {
                          $reduce: {
                            input: "$route",
                            initialValue: [],
                            in: {
                              $cond: [
                                {
                                  $and: [
                                    { $eq: [ "$$this.lat", from.lat ] },
                                    { $eq: [ "$$this.lng", from.lng ] }
                                  ]
                                },
                                {
                                  $concatArrays: [ "$$value", [ "$$this.index" ] ]
                                },
                                "$$value"
                              ]
                            }
                          }
                        }
                      },
                      {
                        $max: {
                          $reduce: {
                            input: "$route",
                            initialValue: [],
                            in: {
                              $cond: [
                                {
                                  $and: [
                                    { $eq: [ "$$this.lat", to.lat ] },
                                    { $eq: [ "$$this.lng", to.lng ] }
                                  ]
                                },
                                {
                                  $concatArrays: [ "$$value", [ "$$this.index" ] ]
                                },
                                "$$value"
                              ]
                            }
                          }
                        }
                      }
                    ]
                  }
            });
            console.log(deliveries);
            return res.json(deliveries);
        } catch (err) {
            console.log(err);
        }
    }
)

module.exports = router;