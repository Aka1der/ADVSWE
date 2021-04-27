import TripCtrl from "../controllers/trip";
import POICtrl from "../controllers/poi";


module.exports = function(router, jwtAuth, isOwner, isAdminOrOwner) {


  const tripCtrl = new TripCtrl();
  const poiCtrl = new POICtrl();

  /**
   *
   *
   * @swagger
   * components:
   *   schemas:
   *     AbstractTrips:
   *       type: object
   *       properties:
   *         name:
   *           type: string
   *           description: The name of the trip.
   *           example: Tahiti
   *         description:
   *           type: string
   *           description: Details of the trip.
   *           example: BobMcDonald@travellog.com
   *         begin:
   *           type: date
   *           description: Start date of the trip.
   *           example:
   *         end:
   *           type: date
   *           description: End date of the trip.
   *           example:
   *         createdAt:
   *           type: date
   *           description: Creation date of the trip.
   *           example:
   *         creator:
   *           type: string
   *           enum: [local, remote]
   *           description: The creator of the trip.
   *         pois:
   *           type: string
   *           enum: [local, remote]
   *           description: The user's provider.
   *           example:
   *     NewTrip:
   *       allOf:
   *         - $ref: '#/components/schemas/AbstractTrips'
   *         - type: object
   *           properties:
   *               type: string
   *               description: The user's password.
   *               example: verysecret
   *     DBTrip:
   *       allOf:
   *         - $ref: '#/components/schemas/AbstractTrips'
   *         - $ref: '#/components/schemas/DBObject'
   *
   */

  /**
   * @swagger
   * /trips:
   *   post:
   *     summary: Add an trip to TravelLog.
   *     description:  Add an triß to TravelLog.
   *     tags:
   *       - Trips
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewTrip'
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: The created Trip.
   *         content:
   *           application/json:
   *             schema:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips').post(jwtAuth, tripCtrl.setCreator, tripCtrl.insert, tripCtrl.show); //1
  /**
   * @swagger
   * /trips:
   *   get:
   *     summary: Retrieve a paginated list of TravelLog trips.
   *     description: Retrieve a list of trips from TravelLog.
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: A list of trips.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips').get(jwtAuth, tripCtrl.getListPeg); //2
  /**
   * @swagger
   * /trips/mine:
   *   get:
   *     summary: Retrieve  my list of TravelLog trips.
   *     description: Retrieve my list of trips from TravelLog.
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: A list of my trips.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/mine').get(jwtAuth, tripCtrl.getMyList); //3 -
  /**
   * @swagger
   * /trips/count:
   *   get:
   *     summary: Retrieve the amount TravelLog trips.
   *     description: Retrieve the amountfrom TravelLog.
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: A the amount of trips.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/count').get(jwtAuth, tripCtrl.count); //4
  /**
   * @swagger
   * /trips/{id}/addPOI:
   *   post:
   *     summary: Add a Poi to a trip.
   *     description:  Add a Poi to a trip.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the trip to update.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewTrip'
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: a Poi to a trip.
   *         content:
   *           application/json:
   *             schema:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId/addPOI').post(jwtAuth, isOwner,poiCtrl.setCreatorAndLocType, poiCtrl.insert, tripCtrl.addPoi, tripCtrl.show); //5 -
  /**
   * @swagger
   * /trips/{id}:
   *   put:
   *     summary: Update an trip at TravelLog.
   *     description:  Update an trip at TravelLog.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the trip to update.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewTrip'
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: The created trip.
   *         content:
   *           application/json:
   *             schema:
   *                 $ref: '#/components/schemas/DBTrip'
   *       500:
   *         description: Trip not found
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId').put(jwtAuth, isOwner, tripCtrl.setCreator, tripCtrl.update, tripCtrl.show); //6
  /**
   * @swagger
   * /trips/{id}:
   *   get:
   *     summary: show details of trip.
   *     description: show details of trip.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: String ID of the trip to update.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: A trip.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/DBTrip'
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId').get(jwtAuth, tripCtrl.show); //7
  /**
   * @swagger
   * /trips/{tripId}/{poiId}:
   *   delete:
   *     summary: Delete a Poi from a trip.
   *     description:  Delete a Poi from a trip.
   *     parameters:
   *       - in: path
   *         name: tripId
   *         required: true
   *         description: String ID of the trip
   *         schema:
   *           type: string
   *       - in: path
   *         name: poiId
   *         required: true
   *         description: String ID of the poi
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: Poi successfully deleted
   *       500:
   *         description: Poi not found
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId/:poiId').delete(jwtAuth, isOwner, tripCtrl.deletePoi, tripCtrl.show); //8 -
  /**
   * @swagger
   * /trips/{Id}:
   *   delete:
   *     summary: Delete a trip.
   *     description:  Delete a trip.
   *     parameters:
   *       - in: path
   *         name: Id
   *         required: true
   *         description: String ID of the trip to delete.
   *         schema:
   *           type: string
   *     tags:
   *       - Trips
   *     security:
   *       - jwt: []
   *     responses:
   *       200:
   *         description: Trip successfully deleted
   *       500:
   *         description: Trip not found
   *       401:
   *         description: Permission insufficient
   *       403:
   *         description: Permission insufficient
   */
  router.route('/trips/:tripId').delete(jwtAuth, isAdminOrOwner, poiCtrl.deleteByTrip, tripCtrl.delete); //9
  router.param('tripId', tripCtrl.load);
  router.param('poiId', poiCtrl.load); ///10
}
