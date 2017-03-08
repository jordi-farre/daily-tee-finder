const assert = require("assert");
const sinon = require("sinon");
const index = require("../index.js");
const ProductRepository = require("../product/productRepository.js")


describe("daily tee finder", function() {
	it("should get daily t-shirt information from Qwertee rss and store in database", function() {
		var repository = new ProductRepository();
		var repositorySaveStub = sinon.stub(repository, "save");
		var statusCode;
		var callback = function(error, response) {
			statusCode = response.statusCode;
		}
		
		index.handler(null, null, callback);
		
		assert.equal(200, statusCode);
		assert(repositorySaveStub.calledOnce);
		var stubSaveCall = repository.save.getCall(0);
		assert.equal(product.site.code, stubSaveCall.args[0].site.code);
		assert.equal(product.site.description, stubSaveCall.args[0].site.description);
		assert.equal(product.description, stubSaveCall.args[0].description);
		assert.equal(product.accessURL, stubSaveCall.args[0].accessURL);
		assert.equal(product.imageURL, stubSaveCall.args[0].imageURL);
	});
});