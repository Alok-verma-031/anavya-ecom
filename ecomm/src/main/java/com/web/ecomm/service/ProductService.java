package com.web.ecomm.service;

import com.web.ecomm.model.Category;
import com.web.ecomm.model.Product;
import com.web.ecomm.repository.CategoryRepository;
import com.web.ecomm.repository.ProductRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FileStorageService fileStorageService;

    public ProductService(ProductRepository productRepository,
                          CategoryRepository categoryRepository,
                          FileStorageService fileStorageService) {

        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.fileStorageService = fileStorageService;
    }

    // Add Product with Image
    public Product addProduct(Product product,
                              Long categoryId,
                              MultipartFile image) {

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException(
                        "Category not found with ID: " + categoryId));

        // Save image in the uploads/products folder
        String imageName = fileStorageService.saveImage(image);

        product.setCategory(category);
        product.setImagePath(imageName);

        try {
            return productRepository.save(product);

        } catch (RuntimeException e) {

            // Remove uploaded image if database save fails
            fileStorageService.deleteImage(imageName);
            throw e;
        }
    }

    // Get All Products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get Product by ID
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Product not found with ID: " + id));
    }

    // Update Product with Optional New Image
    public Product updateProduct(Long id,
                                 Product updatedProduct,
                                 Long categoryId,
                                 MultipartFile image) {

        Product existingProduct = getProductById(id);

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException(
                        "Category not found with ID: " + categoryId));

        String oldImageName = existingProduct.getImagePath();
        String newImageName = null;

        // Upload a new image only if one is selected
        if (image != null && !image.isEmpty()) {

            newImageName = fileStorageService.saveImage(image);
            existingProduct.setImagePath(newImageName);
        }

        existingProduct.setProductName(updatedProduct.getProductName());
        existingProduct.setDescription(updatedProduct.getDescription());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setStockQuantity(updatedProduct.getStockQuantity());
        existingProduct.setCategory(category);

        try {

            Product savedProduct = productRepository.save(existingProduct);

            // Delete old image after successful database save
            if (newImageName != null && oldImageName != null) {
                fileStorageService.deleteImage(oldImageName);
            }

            return savedProduct;

        } catch (RuntimeException e) {

            // Remove new image if database save fails
            if (newImageName != null) {
                fileStorageService.deleteImage(newImageName);
            }

            throw e;
        }
    }

    // Delete Product and Its Image
    public void deleteProduct(Long id) {

        Product product = getProductById(id);

        String imageName = product.getImagePath();

        productRepository.delete(product);

        // Delete image after successful database deletion
        fileStorageService.deleteImage(imageName);
    }
}