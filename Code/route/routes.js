/**
 * common
 */
const renderMW = require("../middleware/common/renderMW");
/**
 * guest
 */
const getGuestsMW = require("../middleware/guest/getGuestsMW");
const getGuestMW = require("../middleware/guest/getGuestMW");
const saveGuestMW = require("../middleware/guest/saveGuestMW");
const delGuestMW = require("../middleware/guest/delGuestMW");
/**
 * burger
 */
const getBurgersMW = require("../middleware/burger/getBurgersMW");
const getBurgerMW = require("../middleware/burger/getBurgerMW");
const saveBurgerMW = require("../middleware/burger/saveBurgerMW");
const delBurgerMW = require("../middleware/burger/delBurgerMW");

const BurgerModel = require("../models/burger");
const GuestModel = require("../models/guest");

module.exports = function (app) {
	const objRepo = {
		BurgerModel: BurgerModel,
		GuestModel: GuestModel,
	};

	/**
	 * Main page => Guests page
	 */
	app.get(
		"/",
		getGuestsMW(objRepo),
		getBurgersMW(objRepo),
		renderMW(objRepo, "guests")
	);
	/**
	 * Guests page
	 */
	app.get(
		"/guest",
		getGuestsMW(objRepo),
		getBurgersMW(objRepo),
		renderMW(objRepo, "guests")
	);
	/**
	 * Add new guest
	 */
	app.use(
		"/guest/new",
		getBurgersMW(objRepo),
		saveGuestMW(objRepo),
		renderMW(objRepo, "guesteditnew")
	);
	/**
	 * Edit guest
	 */
	app.use(
		"/guest/edit/:guestid",
		getGuestMW(objRepo),
		getBurgersMW(objRepo),
		saveGuestMW(objRepo),
		renderMW(objRepo, "guesteditnew")
	);
	/**
	 * Delete guest
	 */
	app.get("/guest/del/:guestid", getGuestMW(objRepo), delGuestMW(objRepo));

	/**
	 * Burgers page
	 */
	app.get("/burger", getBurgersMW(objRepo), renderMW(objRepo, "burgers"));
	/**
	 * Add new burger
	 */
	app.use(
		"/burger/new",
		saveBurgerMW(objRepo),
		renderMW(objRepo, "burgereditnew")
	);
	/**
	 * Edit burger
	 */
	app.use(
		"/burger/edit/:burgerid",
		getBurgerMW(objRepo),
		saveBurgerMW(objRepo),
		renderMW(objRepo, "burgereditnew")
	);
	/**
	 * Delete burger
	 */
	app.get(
		"/burger/del/:burgerid",
		getBurgerMW(objRepo),
		delBurgerMW(objRepo)
	);
};
