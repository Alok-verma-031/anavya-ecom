package com.web.ecomm.controller;

import com.web.ecomm.model.Product;
import com.web.ecomm.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // Add Product with Image
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<Product> addProduct(
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("productName") String productName,
            @RequestParam("description") String description,
            @RequestParam("price") java.math.BigDecimal price,
            @RequestParam("stockQuantity") Integer stockQuantity,
            @RequestParam("image") MultipartFile image) {

        Product product = new Product();	

        product.setProductName(productName);
        product.setDescription(description);
        product.setPrice(price);
        product.setStockQuantity(stockQuantity);

        Product savedProduct =
                productService.addProduct(product, categoryId, image);

        return ResponseEntity.ok(savedProduct);
    }

    // Get All Products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts());
    }

    // Get Product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id));
    }

    // Update Product with Optional New Image
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestParam("categoryId") Long categoryId,
            @RequestParam("productName") String productName,
            @RequestParam("description") String description,
            @RequestParam("price") java.math.BigDecimal price,
            @RequestParam("stockQuantity") Integer stockQuantity,
            @RequestParam(value = "image", required = false)
                    MultipartFile image) {

        Product updatedProduct = new Product();

        updatedProduct.setProductName(productName);
        updatedProduct.setDescription(description);
        updatedProduct.setPrice(price);
        updatedProduct.setStockQuantity(stockQuantity);

        Product savedProduct = productService.updateProduct(
                id, updatedProduct, categoryId, image);

        return ResponseEntity.ok(savedProduct);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.ok(
                "Product deleted successfully");
    }
}