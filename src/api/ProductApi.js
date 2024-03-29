import axiosClient from "./Client";
export const ProductApi = {
  GetComment: (id, filters) => {
    const url = `/comments/product/${id}?${filters}`;
    return axiosClient.get(url);
  },
  AddNewComment: (idProduct, idUser, body) => {
    const url = `/comments/product/${idProduct}/user/${idUser}`;
    return axiosClient.post(url, body);
  },
  GetBanners: () => {
    const url = "/banners";
    return axiosClient.get(url);
  },
  GetDetailBanner: (id) => {
    const url = `/banners/${id}/product/preview`;
    return axiosClient.get(url);
  },
  GetCategoriesRoof: () => {
    const url = `/categories/roof`;
    return axiosClient.get(url);
  },
  GetProductPreview: (filters) => {
    const url = `/products/preview?${filters}`;
    return axiosClient.get(url);
  },
  GetProductPreviewFromCategory: (categoryID, filters) => {
    const url = `/products/category/${categoryID}/preview?${filters}`;
    return axiosClient.get(url);
  },
  GetDetailProduct: (id) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  GetListCategoriesTree: () => {
    const url = "/categories";
    return axiosClient.get(url);
  },
  GetCategoryChildren: (id) => {
    const url = `/categories/children/${id}`;
    return axiosClient.get(url);
  },
  GetCategoryList: () => {
    const url = `/categories/list`;
    return axiosClient.get(url);
  },
  GetListInAdmin: (filters) => {
    const url = `/products?${filters}`;
    return axiosClient.get(url);
  },
  GetDescriptionFromProduct: (id) => {
    const url = `/products/${id}/description`;
    return axiosClient.get(url);
  },
  GetSpecification: (id) => {
    const url = `/products/${id}/specification`;
    return axiosClient.get(url);
  },
  GetMedia: (id) => {
    const url = `/products/${id}/media`;
    return axiosClient.get(url);
  },
  GetProductFromCategorySelected: (id) => {
    const url = `/products/category/${id}/preview`;
    return axiosClient.get(url);
  },
  GetPreviewRecommend: (userId, filter) => {
    const url = `/products/recommend/user/${userId}?${filter}`;
    return axiosClient.get(url);
  },
  //for add product
  AddNewProduct: (idProvider, idUser, body) => {
    const url = `/products/provider/${idProvider}/user/${idUser}`;
    console.log(body);
    return axiosClient.post(url, body);
  },
  AddSpecificationTreeInProduct: (idProduct, body) => {
    const url = `/products/${idProduct}/specification`;
    return axiosClient.post(url, body);
  },
  UpdateProduct: (productID, body) => {
    const url = `/products/${productID}`;
    return axiosClient.patch(url, body);
  },
  DeleteProduct: (idProduct) => {
    const url = `/products/${idProduct}`;
    return axiosClient.delete(url);
  },
  DeleteListProduct: (providerID, body) => {
    const url = `/products/provider/${providerID}`;
    return axiosClient.delete(url, { data: body });
  },
  DeleteElementInProduct: (productID, userID, body) => {
    const url = `/products/${productID}/user/${userID}/elements`;
    return axiosClient.delete(url, { data: body });
  },
};
