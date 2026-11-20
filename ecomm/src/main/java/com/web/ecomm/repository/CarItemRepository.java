package com.web.ecomm.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.ecomm.model.CartItem;

public interface CarItemRepository extends JpaRepository<CartItem, Long> {
Optional<CartItem> findByCardIdAndProductId(Long cardId,Long productId);
}
