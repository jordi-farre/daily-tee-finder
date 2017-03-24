const assert = require("assert");
const sinon = require("sinon");
const ProductService = require("../product/productService.js");
const ProductRepository = require("../product/productRepository.js");
const Product = require("../product/product.js");
const Site = require("../product/site.js");
const QwerteeGateway = require("../product/qwerteeGateway.js");

var product = new Product(new Site("QWERTEE", "Qwertee", "http:://www.qwertee.com"), "http://www.qwertee.com/test.jpg");
var gateway = new QwerteeGateway();
var getProductsStub = sinon.stub(gateway, "getProducts");
var repository = new ProductRepository();
var saveProductStub = sinon.stub(repository, "save");
var productService = new ProductService(gateway, repository);


describe("product service", function() {
	it("should get daily t-shirt information from Qwertee rss and store in database", sinon.test(function() {
		getProductsStub.returns([product]);

		productService.fetch();

        sinon.assert.calledOnce(getProductsStub);
        sinon.assert.calledWith(saveProductStub, product);
        var savedProduct = saveProductStub.firstCall.args[0];
        assert.equal(product.site.code, savedProduct.site.code);
        assert.equal(product.site.description, savedProduct.site.description);
        assert.equal(product.site.url, savedProduct.site.url);
        assert.equal(product.image, savedProduct.image);
	}));
});