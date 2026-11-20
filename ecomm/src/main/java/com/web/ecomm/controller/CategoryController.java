package com.web.ecomm.controller;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.web.ecomm.model.Category;
import com.web.ecomm.service.CategoryService;
@RestController
@RequestMapping("/api/admin/categories")
@CrossOrigin(origins = "http://localhost:5173/")
public class CategoryController {
	
	private CategoryService categoryService;
	
	public CategoryController(CategoryService categoryService)
	{
		this.categoryService=categoryService;
	}
	
	@PostMapping
	public Category saveCategory(
	        @RequestParam("categoryName") String categoryName,
	        @RequestParam("description") String description,
	        @RequestParam("image") MultipartFile image) {
	    
	    Category category = new Category();
	    category.setCategoryName(categoryName);
	    category.setDescription(description);
	    
	    return categoryService.saveCategory(category, image);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable Long id)
	{
		Category resCategory=categoryService.getCategoryById(id);
		if(resCategory!=null)
		{
			return ResponseEntity.ok(resCategory);
		}
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping
	public ResponseEntity<List<Category>> getAllCategory()
	{
		List<Category> allCategory=categoryService.getAllCategory();
		if(allCategory.isEmpty())
		{
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(allCategory);
		
	}
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteById(@PathVariable Long id)
	{
		Category resCategory=categoryService.getCategoryById(id);
		if(resCategory!=null)
		{
			categoryService.deleteCategory(id);
			return ResponseEntity.ok("Category deleted Successfully !");
		}
		return ResponseEntity.ok("Category is not found !");

	}
	
	@PutMapping("/{id}")
	public Category updateCategory(@RequestBody Category category,@PathVariable Long id)
	{
	  Category updatedCategory=categoryService.getCategoryById(id);
	  if(updatedCategory!=null)
	  {
		  return categoryService.updateCotegory(id,category);
	  }
	  return null;
	}

}
