package com.sgp.hoopoes_management_system.Controller.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.sgp.hoopoes_management_system.Domain.Products.Product;
import com.sgp.hoopoes_management_system.Service.Products.ProductService;

@Controller
@RequestMapping("products")
public class ProductController {

    @Autowired
    private ProductService service;

    // EndPoint de cadastro de Produtos;
    @PostMapping("/register")
    public ResponseEntity registerProduct(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registerProduct(product));
    }

    // EndPoint de listar Produtos;
    @GetMapping("/list")
    public ResponseEntity listAllProducts() {
        return ResponseEntity.status(HttpStatus.OK).body(service.listAllProducts());
    }

    // EndPoint de buscar Produto por nome;
    @GetMapping("/find")
    public ResponseEntity findByName(@RequestParam String name) {
        return ResponseEntity.status(HttpStatus.OK).body(service.FindByName(name));
    }

    // EndPoint de editar Produto cadastrado;
    @PutMapping("/edit")
    public ResponseEntity editProduct(@RequestParam String name, @RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.OK).body(service.editProduct(name, product));
    }

    // EndPoint de deletar Produto cadastrado;
    @DeleteMapping("/delete")
    public ResponseEntity deleteProduct(@RequestParam Long id) {
        service.deleteProduct(id);
        return ResponseEntity.status(HttpStatus.OK).body("Produto deletado com sucesso.");
    }

    // EndPoint de deletar todos os Produtos cadastrados;
    @DeleteMapping("/deleteAll")
    public ResponseEntity deleteAllProducts() {
        service.deleteAllProducts();
        return ResponseEntity.status(HttpStatus.OK).body("Todos os produtos foram deletados com sucesso.");
    }
}