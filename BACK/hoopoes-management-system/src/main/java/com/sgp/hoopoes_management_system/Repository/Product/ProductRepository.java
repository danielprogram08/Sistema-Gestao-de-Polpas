package com.sgp.hoopoes_management_system.Repository.Product;

import com.sgp.hoopoes_management_system.Domain.Products.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
