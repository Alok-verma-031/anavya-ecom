package com.web.ecomm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.ecomm.model.Cart;

public interface CardRepository extends JpaRepository<Cart,Long> {

}
