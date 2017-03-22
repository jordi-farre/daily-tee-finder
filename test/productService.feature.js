const assert = require("assert");
const sinon = require("sinon");
const ProductService = require("../product/productService.js");
const ProductRepository = require("../product/productRepository.js");
const Product = require("../product/product.js");
const QwerteeGateway = require("../product/qwerteeGateway.js");

var product = new Product();
var gateway = new QwerteeGateway();
var gatewayFetchStub = sinon.stub(gateway, "fetch").returns([product]);
var repository = new ProductRepository();
var repositorySaveStub = sinon.stub(repository, "save");
var statusCode;
var callback = function(error, response) {
	statusCode = response.statusCode;
}
var productService = new ProductService();


describe("daily tee finder", function() {
	it("should get daily t-shirt information from Qwertee rss and store in database", function() {
		productService.fetch();
		
		assert(gatewayFetchStub.calledOnce);
		assert(repositorySaveStub.calledOnce);
		var stubSaveCall = repository.save.getCall(0);
		assert.equal(product.site.code, stubSaveCall.args[0].site.code);
		assert.equal(product.site.description, stubSaveCall.args[0].site.description);
		assert.equal(product.description, stubSaveCall.args[0].description);
		assert.equal(product.accessURL, stubSaveCall.args[0].accessURL);
		assert.equal(product.imageURL, stubSaveCall.args[0].imageURL);
	});
});