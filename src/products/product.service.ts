import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/domain/entities/product.entity';
import { Repository } from 'typeorm';
import {
  CreateProductDto,
  FindProductByIdDto,
  ProductResponseDto,
  UpdateProductDto,
} from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductResponseDto[]> {
    const products = await this.productRepository.find();
    return products.map(ProductResponseDto.fromEntity);
  }

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    const product = this.productRepository.create(createProductDto);
    const saved = await this.productRepository.save(product);
    return ProductResponseDto.fromEntity(saved);
  }

  async findOne(id: FindProductByIdDto['id']): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return ProductResponseDto.fromEntity(product);
  }

  async update(
    id: FindProductByIdDto['id'],
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    Object.assign(product, updateProductDto);
    const saved = await this.productRepository.save(product);
    return ProductResponseDto.fromEntity(saved);
  }

  async delete(id: FindProductByIdDto['id']): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
