import TripCtrl from "../controllers/trip";
import multer from 'multer';

module.exports = function(router, jwtAuth, isOwner, isAdminOrOwner) {


  const tripCtrl = new TripCtrl();


  router.route('/trips').post(jwtAuth, tripCtrl.setCreator, tripCtrl.insert, tripCtrl.show); //1
  router.route('/trips').get(jwtAuth, tripCtrl.getList); //2
  //router.route('/trips/mine').get(jwtAuth, isOwner, tripCtrl.getMyList); //3 -
  router.route('/trips/count').get(jwtAuth, tripCtrl.count); //4
  //router.route('/trips/:tripId/addPOI').post(jwtAuth, isOwner, tripCtrl.addPoi); //5 -
  router.route('/trips/:tripId').put(jwtAuth, isOwner, tripCtrl.setCreator, tripCtrl.update, tripCtrl.show); //6
  router.route('/trips/:tripId').get(jwtAuth, tripCtrl.get); //7
  //router.route('/trips/:tripId/:poiId').delete(); //8 -
  router.route('/trips/:tripId').delete(jwtAuth, isAdminOrOwner, tripCtrl.delete); //9
  router.param('tripId', tripCtrl.load);
  router.param('poiId', tripCtrl.load); ///10
}
