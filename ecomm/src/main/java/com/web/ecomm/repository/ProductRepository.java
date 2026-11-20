package com.web.ecomm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.ecomm.model.Product;

public interface ProductRepository extends JpaRepository<Product,Long> {
	
	Boolean existByCategoryId(Long id);

}
