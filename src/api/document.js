import apiInstance from ".";

export const getDocsApi = async () => apiInstance.get("/document");

export const getDocsByIdApi = async (id) => apiInstance.post(`/document/${id}`);
