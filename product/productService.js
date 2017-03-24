function ProductService(qwerteeGateway, productRepository) {

	this.qwerteeGateway = qwerteeGateway;

	this.productRepository = productRepository;

	this.fetch = function() {
		var productList = this.qwerteeGateway.getProducts();
        for (var index in productList) {
            this.productRepository.save(productList[index]);
        };
	};
	
}

module.exports = ProductService;