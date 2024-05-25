let expect = require("chai").expect;
let getBurgerMW = require("../../../../middleware/burger/getBurgerMW");

describe("getBurgerMW middleware", function () {
	it("should return a burger", function (done) {
		const req = { params: { burgerid: 0 } };
		const res = {
			locals: {},
		};
		const fakeBurgerModel = {
			findOne: function () {
				expect(arguments[0]).to.eql({ _id: 0 });
				return Promise.resolve({
					_id: 0,
					nev: "Dupla húsos",
					pogacsak: 2,
					csipos: false,
					szosz: false,
					extra: "",
				});
			},
		};

		getBurgerMW({ BurgerModel: fakeBurgerModel })(req, res, function (err) {
			expect(err).to.be.undefined;
			expect(res.locals.burger).to.eql({
				_id: 0,
				nev: "Dupla húsos",
				pogacsak: 2,
				csipos: false,
				szosz: false,
				extra: "",
			});
			done();
		});
	});
	it("should call next with error", function (done) {
		const req = { params: { burgerid: 1 } };
		const res = {
			locals: {},
		};
		const fakeBurgerModel = {
			findOne: function () {
				expect(arguments[0]).to.be.eql({ _id: 1 });
				return Promise.reject("NEMJÓ");
			},
		};

		getBurgerMW({ BurgerModel: fakeBurgerModel })(req, res, function (err) {
			expect(res.locals.burger).to.be.undefined;
			expect(err).to.eql("NEMJÓ");
			done();
		});
	});
	it("should call next with no burger found", function (done) {
		const req = { params: { burgerid: 2 } };
		const res = {
			locals: {},
		};
		const fakeBurgerModel = {
			findOne: function () {
				expect(arguments[0]).to.be.eql({ _id: 2 });
				return Promise.resolve(null); // Simulate no burger found
			},
		};

		getBurgerMW({ BurgerModel: fakeBurgerModel })(req, res, function (err) {
			expect(err).to.be.an("error");
			expect(err.message).to.equal("Burger not found");
			expect(res.locals.burger).to.be.undefined;
			done();
		});
	});
});
