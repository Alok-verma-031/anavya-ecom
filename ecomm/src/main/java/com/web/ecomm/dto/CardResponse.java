package com.web.ecomm.dto;

import java.math.BigDecimal;
import java.util.List;

public class CardResponse {

	private Long cartId;
	private List<CardItemResponse> items;
	private Integer totalQuantity;
	private BigDecimal subtotal;
	public Long getCartId() {
		return cartId;
	}
	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}
	public List<CardItemResponse> getItems() {
		return items;
	}
	public void setItems(List<CardItemResponse> items) {
		this.items = items;
	}
	public Integer getTotalQuantity() {
		return totalQuantity;
	}
	public void setTotalQuantity(Integer totalQuantity) {
		this.totalQuantity = totalQuantity;
	}
	public BigDecimal getSubtotal() {
		return subtotal;
	}
	public void setSubtotal(BigDecimal subtotal) {
		this.subtotal = subtotal;
	}
	
	
}
