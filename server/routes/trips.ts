import TripCtrl from "../controllers/trip";
import POICtrl from "../controllers/poi";


module.exports = function(router, jwtAuth, isOwner, isAdminOrOwner) {


  const tripCtrl = new TripCtrl();
  const poiCtrl = new POICtrl();


  router.route('/trips').post(jwtAuth, tripCtrl.setCreator, tripCtrl.insert, tripCtrl.show); //1
  router.route('/trips').get(jwtAuth, tripCtrl.getListPeg); //2
  router.route('/trips/mine').get(jwtAuth, tripCtrl.getMyList); //3 -
  router.route('/trips/count').get(jwtAuth, tripCtrl.count); //4
  router.route('/trips/:tripId/addPOI').post(jwtAuth, isOwner,poiCtrl.setCreatorAndLocType, poiCtrl.insert, tripCtrl.addPoi, tripCtrl.show); //5 -
  router.route('/trips/:tripId').put(jwtAuth, isOwner, tripCtrl.setCreator, tripCtrl.update, tripCtrl.show); //6
  router.route('/trips/:tripId').get(jwtAuth, tripCtrl.show); //7
  //router.route('/trips/:tripId/:poiId').delete(); //8 -
  router.route('/trips/:tripId').delete(jwtAuth, isAdminOrOwner, tripCtrl.delete); //9
  router.param('tripId', tripCtrl.load);
  router.param('poiId', poiCtrl.load); ///10
}
