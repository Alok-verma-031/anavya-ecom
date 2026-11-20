package com.web.ecomm.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.web.ecomm.model.Category;
import com.web.ecomm.repository.CategoryRepository;

@Service
public class CategoryService {
	private CategoryRepository  categoryRepository;
	private FileStorageService fileStorageService;
	public CategoryService(CategoryRepository categoryRepository,FileStorageService fileStorageService)
	{
		this.categoryRepository=categoryRepository;
		this.fileStorageService=fileStorageService;
	}
	
	
	// add
	public Category saveCategory(Category category,MultipartFile image)
	{
		if (image != null && !image.isEmpty()) {
	        String fileName = fileStorageService.saveCategoryImage(image);
	        category.setImagePath(fileName); // Apni entity ka image setter lagayein
	    }
		return categoryRepository.save(category);
	}
	
	// get by id
	public Category getCategoryById(Long id)
	{
		return categoryRepository.findById(id).orElseThrow(()->new RuntimeException("Category Not Found !"));
	}
	
	// get all
	public List<Category> getAllCategory()
	{
		return categoryRepository.findAll();
	}
	
	// update
	public Category updateCotegory(Long id , Category category)
	{
	
			Category newCategory=getCategoryById(id);
			newCategory.setCategoryName(category.getCategoryName());
			newCategory.setDescription(category.getDescription());
			
			return categoryRepository.save(newCategory);
	
	}
	
	
	// delete by id
	public void deleteCategory(Long id)
	{
		categoryRepository.deleteById(id);
	}

}
