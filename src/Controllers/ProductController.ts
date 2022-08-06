import { Request, RequestHandler, Response } from "express";
import { Product } from "../Models/Product";
import { v4 as uuidv4 } from "uuid";

const products: Product[] = [];

interface CustomRequest extends Request {
  body: {
    name: string;
    description: string;
  };
}

export const createProduct = (req: CustomRequest, res: Response) => {
  const id = uuidv4();
  const { name, description } = req.body;
  const newProduct = new Product(id, name, description);
  products.push(newProduct);
  res.json({
    message: "Product added successfully",
    product: newProduct,
  });
};

export const getProducts:RequestHandler=(req,res) => {
    res.json({products})

};
export const getProduct:RequestHandler<{id:string}>=(req,res) =>{
    const id = req.params.id;
    const index= products.findIndex(item=>item.id=id)
    if (index<0){
        throw new Error('Product Not Found')
    }
    res.json({product:products[index]})

}
export const updateProduct:RequestHandler<{id:string}>=(req,res)=>{
    const id = req.params.id;
    const index= products.findIndex(item=>item.id=id)
    if (index<0){
        throw new Error ('Product Not Found')
    }
    const {name, description}=req.body as {name:string, description:string}
    products[index]=new Product(id,name,description)

    res.json({
        message:"Product updated successfully",
        product: products[index]
    })


}
export const deleteProduct:RequestHandler<{id:string}>=(req,res)=>{
    const id = req.params.id;
    const index= products.findIndex(item=>item.id=id)
    if (index<0){
        throw new Error ('Product Not Found')
    }
   
    products.splice(index,1)

    res.json({
        message:"Product deleted successfully",
       
    })


}