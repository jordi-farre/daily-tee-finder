const assert = require("assert");
const sinon = require("sinon");
const ProductService = require("../product/productService.js");
const ProductRepository = require("../product/productRepository.js");
const Product = require("../product/product.js");
const QwerteeGateway = require("../product/qwerteeGateway.js");

var product = new Product();
var gateway = new QwerteeGateway();
var gatewayMock = sinon.mock(gateway);
var repository = new ProductRepository();
var repositoryMock = sinon.mock(repository);
var productService = new ProductService();


describe("daily tee finder", function() {
	it("should get daily t-shirt information from Qwertee rss and store in database", function() {
		gatewayMock.expects("fetch").once().returns([product]);
		repositoryMock.expects("save").once().withArgs(product);

		productService.fetch();

		gatewayMock.restore();
		gatewayMock.verify();
		repositoryMock.restore();
		repositoryMock.verify();
	});
});