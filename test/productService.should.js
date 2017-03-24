const assert = require("assert");
const sinon = require("sinon");
const ProductService = require("../product/productService.js");
const ProductRepository = require("../product/productRepository.js");
const Product = require("../product/product.js");
const Site = require("../product/site.js");
const QwerteeGateway = require("../product/qwerteeGateway.js");

var product1 = new Product(new Site("QWERTEE", "Qwertee", "http:://www.qwertee.com"), "http://www.qwertee.com/test1.jpg");
var product2 = new Product(new Site("QWERTEE", "Qwertee", "http:://www.qwertee.com"), "http://www.qwertee.com/test2.jpg");
var gateway = new QwerteeGateway();
var getProductsStub = sinon.stub(gateway, "getProducts");
var repository = new ProductRepository();
var saveProductStub = sinon.stub(repository, "save");
var productService = new ProductService(gateway, repository);


describe("product service", function() {
    it("should get two products from Qwertee and store in database", sinon.test(function() {
        getProductsStub.returns([product1, product2]);

        productService.fetch();

        sinon.assert.calledOnce(getProductsStub);
        sinon.assert.calledTwice(saveProductStub);
        sinon.assert.calledWith(saveProductStub.firstCall, product1);
        sinon.assert.calledWith(saveProductStub.secondCall, product2);
        var savedProduct1 = saveProductStub.firstCall.args[0];
        assert.equal(product1.site.code, savedProduct1.site.code);
        assert.equal(product1.site.description, savedProduct1.site.description);
        assert.equal(product1.site.url, savedProduct1.site.url);
        assert.equal(product1.image, savedProduct1.image);
        var savedProduct2 = saveProductStub.secondCall.args[0];
        assert.equal(product2.site.code, savedProduct2.site.code);
        assert.equal(product2.site.description, savedProduct2.site.description);
        assert.equal(product2.site.url, savedProduct2.site.url);
        assert.equal(product2.image, savedProduct2.image);
    }));
});