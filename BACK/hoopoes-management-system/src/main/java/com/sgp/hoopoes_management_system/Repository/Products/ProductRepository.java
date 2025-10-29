package com.sgp.hoopoes_management_system.Repository.Products;

import com.sgp.hoopoes_management_system.Domain.Products.Product;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    boolean existsByName(String name);
    Optional<Product> findByName(String name);
}