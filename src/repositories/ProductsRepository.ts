import { IProduct } from "../models/Product";
import axiosInstance from "../utils/axiosInstance";
import { getAuth } from "firebase/auth";

interface CreateProductParams {
    name: string;
    category: string;
}
class ProductsRepository {
    async getProducts(){
        const token = await getAuth().currentUser?.getIdToken();
       return await axiosInstance.get<IProduct[]>("/products", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    async createProduct({name, category} : CreateProductParams){
        const token = await getAuth().currentUser?.getIdToken();
        return await axiosInstance.post("/products", { name, category }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}

export default new ProductsRepository();