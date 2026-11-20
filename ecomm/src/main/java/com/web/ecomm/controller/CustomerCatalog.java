package com.web.ecomm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.web.ecomm.model.Category;
import com.web.ecomm.model.Product;
import com.web.ecomm.service.CategoryService;
import com.web.ecomm.service.ProductService;

@RestController
@RequestMapping("/api/catalog")
public class CustomerCatalog {
	
	private CategoryService categoryService;
	private ProductService productService;
	
	public CustomerCatalog(
			CategoryService categoryService,
			ProductService productService
			)
	{
		this.categoryService=categoryService;
		this.productService=productService;
	}
	
	@GetMapping("/categories")
	public ResponseEntity<List<Category>> getAllCategories()
	{
		return ResponseEntity.ok(categoryService.getAllCategory());
	}
	
	@GetMapping("/products")
	public ResponseEntity<List<Product>> getAllProduct()
	{
		return ResponseEntity.ok(productService.getAllProducts());
	}
	
	@GetMapping("/products/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Long id )
	{
		return ResponseEntity.ok(productService.getProductById(id));
	}
	
	
	
}
