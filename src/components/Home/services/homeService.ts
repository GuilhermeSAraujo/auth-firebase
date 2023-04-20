import { IProduct } from "../../../models/Product";
import ProductsRepository from "../../../repositories/ProductsRepository";

class HomeService {
    async getProducts(): Promise<IProduct[]>{
        return await ProductsRepository.getProducts().then((resposta) => resposta && resposta.data);;
    }
    async createProduct(name:string, category: string){
        return await ProductsRepository.createProduct({name, category});
    }
}

export default new HomeService();