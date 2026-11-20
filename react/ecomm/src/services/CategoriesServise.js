import api from "./Api";

export function addCategory(category,image)
{
    const formData = new FormData();
     formData.append("categoryName",category.categoryName);
    formData.append("description",category.description);
     if(image)
    {
        formData.append("image",image)
    }
    return api.post("api/admin/categories",formData);
}
export function getAllCategory()
{
    return api.get("api/catalog/categories");
}