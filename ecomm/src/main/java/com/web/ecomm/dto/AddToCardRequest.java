package com.web.ecomm.dto;

import jakarta.validation.constraints.NotNull;

public class AddToCardRequest {
	@NotNull(message = "product id is required")
	private Long productId;
	@NotNull(message = "quantity is required")
	private Integer  quantity;
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	

}
