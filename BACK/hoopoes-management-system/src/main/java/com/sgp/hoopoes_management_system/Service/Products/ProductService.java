package com.sgp.hoopoes_management_system.Service.Products;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sgp.hoopoes_management_system.Domain.Products.Product;
import com.sgp.hoopoes_management_system.Domain.Products.ProductDTO;
import com.sgp.hoopoes_management_system.Exception.BadRequestExceptionError;
import com.sgp.hoopoes_management_system.Repository.Products.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    // Cadastrar Produto;
    @Transactional
    public ProductDTO registerProduct(Product product) {
        if (repository.existsByName(product.getName())) {
            throw new BadRequestExceptionError("Já existe um produto com esse nome.");
        }

        ProductDTO dto = new ProductDTO(product.getName(), product.getCategory(), product.getUnityMeasure(), product.getMinimumStock(), product.getPrice(), product.getActive());
        repository.save(dto.convertProduct());
        return dto;
    }

    // Listar todos os Produtos;
    @Transactional(readOnly = true)
    public List<Product> listAllProducts() {
        return repository.findAll();
    }

    // Buscar Produto por nome;
    @Transactional(readOnly = true)
    public Product FindByName(String name) {
        Optional<Product> product = repository.findByName(name);
        return product.orElseThrow(() -> new BadRequestExceptionError("Produto não encontrado."));
    }

    // Editar Produto cadastrado;
    @Transactional
    public ProductDTO editProduct(String name, Product product) {
        if (!repository.existsByName(name)) {
            throw new BadRequestExceptionError("Produto não encontrado.");
        }

        ProductDTO dto = new ProductDTO(product.getName(), product.getCategory(), product.getUnityMeasure(), product.getMinimumStock(), product.getPrice(), product.getActive());
        repository.save(dto.convertProduct());
        return dto;
    }

    // Deletar Produto cadastrado;
    @Transactional
    public void deleteProduct(Long id) {
        if (!repository.existsById(id)) {
            throw new BadRequestExceptionError("Produto não encontrado.");
        }

        repository.deleteById(id);
    }

    // Deletar todos os Produtos cadastrados;
    @Transactional
    public void deleteAllProducts() {
        repository.deleteAll();
    }
}