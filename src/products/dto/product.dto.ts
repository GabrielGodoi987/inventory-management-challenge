import type { ProductEntity } from 'src/domain/entities/product.entity';
import * as yup from 'yup';

export const findProductByIdDto = yup.object({
  id: yup
    .string()
    .uuid('Invalid product ID')
    .required('Product ID is required'),
});

export const createProductdto = yup.object({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Product description is required'),
  stock: yup
    .number()
    .required('Product stock is required')
    .min(0, 'Stock cannot be negative'),
});

export const updateProductdto = yup.object({
  name: yup.string(),
  description: yup.string(),
  stock: yup.number().min(0, 'Stock cannot be negative'),
});

export class ProductResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly stock: number,
  ) {}

  static fromEntity(entity: ProductEntity): ProductResponseDto {
    return new ProductResponseDto(
      entity.id,
      entity.name,
      entity.description,
      entity.stock,
    );
  }
}

export type FindProductByIdDto = yup.InferType<typeof findProductByIdDto>;
export type CreateProductDto = yup.InferType<typeof createProductdto>;
export type UpdateProductDto = yup.InferType<typeof updateProductdto>;
