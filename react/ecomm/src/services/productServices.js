
import api from './Api'

// get all products
export function getAllProducts()
{
    return api.get("/api/catalog/products");
}

// get by id
export function getProductById(id)
{
return api.get(`/api/catalog/products/${id}`);
}

// admin add products
export function addProduct(product,image)
{
    const formData = new FormData();
    formData.append("productName",product.productName);
    formData.append("description",product.description);
    formData.append("price",product.price);
    formData.append("stockQuantity",product.stockQuantity);
    formData.append("categoryId",product.categoryId);
    if(image)
    {
        formData.append("image",image)
    }
    return api.post("api/admin/products",formData)
}
