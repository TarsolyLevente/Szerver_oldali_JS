let expect = require("chai").expect;
let getGuestMW = require("../../../../middleware/guest/getGuestMW");

describe("getGuestMW middleware", function () {
	it("should return a guest", function (done) {
		const req = { params: { guestid: 0 } };
		const res = {
			locals: {},
		};
		const fakeGuestModel = {
			findOne: function () {
				expect(arguments[0]).to.eql({ _id: 0 });
				return {
					populate: function () {
						return Promise.resolve({
							_id: 0,
							nev: "Gipsz Jakab",
							erkezes: 4,
							burger: 0,
						});
					},
				};
			},
		};

		getGuestMW({ GuestModel: fakeGuestModel })(req, res, function (err) {
			expect(err).to.be.undefined;
			expect(res.locals.guest).to.eql({
				_id: 0,
				nev: "Gipsz Jakab",
				erkezes: 4,
				burger: 0,
			});
			done();
		});
	});
	it("should call next with error", function (done) {
		const req = { params: { guestid: 1 } };
		const res = {
			locals: {},
		};
		const fakeGuestModel = {
			findOne: function () {
				expect(arguments[0]).to.be.eql({ _id: 1 });
				return {
					populate: function () {
						return Promise.reject("NEMJÓ");
					},
				};
			},
		};

		getGuestMW({ GuestModel: fakeGuestModel })(req, res, function (err) {
			expect(res.locals.guest).to.be.undefined;
			expect(err).to.eql("NEMJÓ");
			done();
		});
	});
	it("should call next with no Guest found", function (done) {
		const req = { params: { guestid: 2 } };
		const res = {
			locals: {},
		};
		const fakeGuestModel = {
			findOne: function () {
				expect(arguments[0]).to.be.eql({ _id: 2 });
				return {
					populate: function () {
						return Promise.resolve(null);
					},
				};
			},
		};

		getGuestMW({ GuestModel: fakeGuestModel })(req, res, function (err) {
			expect(err).to.be.an("error");
			expect(err.message).to.equal("Guest not found");
			expect(res.locals.guest).to.be.undefined;
			done();
		});
	});
});
