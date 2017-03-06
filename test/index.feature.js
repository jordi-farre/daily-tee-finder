var assert = require("assert");
var sinon = require("sinon");


describe("daily tee finder", function() {
	it("should get daily t-shirt information from Qwertee rss and store in database", function() {
		var productRepository = sinon.spy();
		productRepository.save();
		assert(productRepository.calledOnce);
	});
});