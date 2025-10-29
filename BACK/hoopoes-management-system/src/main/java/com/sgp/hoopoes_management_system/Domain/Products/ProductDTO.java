package com.sgp.hoopoes_management_system.Domain.Products;

import java.math.BigDecimal;

public record ProductDTO(String name, String category, String unityMeasure, Integer minimumStock, BigDecimal price, Boolean active) {
    
    public Product convertProduct() {
        Product product = new Product();
        product.setName(name);
        product.setCategory(category);
        product.setUnityMeasure(unityMeasure);
        product.setMinimumStock(minimumStock);
        product.setPrice(price);
        product.setActive(active);
        return product;
    }
}