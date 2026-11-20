package com.web.ecomm.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
  public class FileStorageService 
  {

    @Value("${app.upload.dir}")
    private String uploadDirectory;

    private static final long MAX_FILE_SIZE =
            5 * 1024 * 1024;

    private static final Set<String> ALLOWED_EXTENSIONS =
            Set.of("jpg", "jpeg", "png", "webp","avif");
    	// product image add
    public String saveImage(MultipartFile file) {
   
        // Check whether a file was selected
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Please select an image");
        }

        // Check file size
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException(
                    "Image size must not exceed 5 MB");
        }

        // Get original filename
        String originalFilename =
                StringUtils.cleanPath(file.getOriginalFilename());

        // Extract extension
        String extension = getExtension(originalFilename);

        // Validate extension
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new IllegalArgumentException(
                    "Only JPG, JPEG, PNG and WebP images are allowed");
        }

        try {
            // Create upload directory if it does not exist
            Path uploadPath = Paths.get(uploadDirectory,"products")
                    .toAbsolutePath()
                    .normalize();

            Files.createDirectories(uploadPath);

            // Generate unique filename
            String newFilename =
                    UUID.randomUUID() + "." + extension;

            // Final file location
            Path targetPath =
                    uploadPath.resolve(newFilename).normalize();

            // Prevent path traversal
            if (!targetPath.startsWith(uploadPath)) {
                throw new IllegalArgumentException(
                        "Invalid image file path");
            }

            // Copy uploaded image to destination
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(
                        inputStream,
                        targetPath,
                        StandardCopyOption.REPLACE_EXISTING
                );
            }

            return newFilename;

        } catch (IOException e) {
            throw new RuntimeException(
                    "Could not save product image", e);
        }
    }

    // category image
    public String saveCategoryImage(MultipartFile file) {
        // Same purana logic, bas folder ka naam "category" hai
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Please select an image");
        }
        try {
            Path uploadPath = Paths.get(uploadDirectory, "category")
                    .toAbsolutePath()
                    .normalize();
            Files.createDirectories(uploadPath);

            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String extension = getExtension(originalFilename);
            String newFilename = UUID.randomUUID() + "." + extension;

            Path targetPath = uploadPath.resolve(newFilename).normalize();
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, targetPath, StandardCopyOption.REPLACE_EXISTING);
            }
            return newFilename;
        } catch (IOException e) {
            throw new RuntimeException("Could not save category image", e);
        }
    }
    
    // Extract file extension
    private String getExtension(String filename) {

        int dotIndex = filename.lastIndexOf('.');

        if (dotIndex < 0 || dotIndex == filename.length() - 1) {
            throw new IllegalArgumentException(
                    "Invalid image filename");
        }

        return filename.substring(dotIndex + 1)
                .toLowerCase();
    }

    // Delete an existing image
    public void deleteImage(String filename) {

        if (filename == null || filename.isBlank()) {
            return;
        }

        try {
            Path uploadPath = Paths.get(uploadDirectory,"products")
                    .toAbsolutePath()
                    .normalize();

            Path imagePath =
                    uploadPath.resolve(filename).normalize();

            if (!imagePath.startsWith(uploadPath)) {
                throw new IllegalArgumentException(
                        "Invalid image filename");
            }

            Files.deleteIfExists(imagePath);

        } catch (IOException e) {
            throw new RuntimeException(
                    "Could not delete product image", e);
        }
    }
}