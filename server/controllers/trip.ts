import BaseCtrl from './base';
import Trip from '../models/trip';
import {ITripDocument } from '../models/types';


export default class TripCtrl extends BaseCtrl<ITripDocument> {
  model = Trip;
  projection: '_id, name, creator, createdAt';

  /*getMyList = (req, res) =>
    this.model.find({creator: req.body.creator }, this.projection)
      .then(l => res.json(l))
      .catch(err => res.status(500).json({message: err}));*/

  setCreator = (req, res, next) => {
    req.body.creator = req.user._id;
    next();
  };
}

