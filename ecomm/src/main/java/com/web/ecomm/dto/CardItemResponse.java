package com.web.ecomm.dto;

import java.math.BigDecimal;

public class CardItemResponse {
	private Long cartItemId;
	private Long productId;
	private String productName;
	private String imagePath;
	private BigDecimal price;
	private Integer quantity;
	private Integer availablesStock;
	private BigDecimal lineTotal;
	
	
	public Long getCartItemId() {
		return cartItemId;
	}
	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public Integer getQuantity() {
		return quantity;
	}
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	public Integer getAvailablesStock() {
		return availablesStock;
	}
	public void setAvailablesStock(Integer availablesStock) {
		this.availablesStock = availablesStock;
	}
	public BigDecimal getLineTotal() {
		return lineTotal;
	}
	public void setLineTotal(BigDecimal lineTotal) {
		this.lineTotal = lineTotal;
	}
	
	
}
