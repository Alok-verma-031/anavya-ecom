package com.web.ecomm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.ecomm.model.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
