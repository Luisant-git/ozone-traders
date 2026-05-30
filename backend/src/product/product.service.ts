import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        gallery: createProductDto.gallery as any,
        stock: createProductDto.stock ?? 0,
      },
    });
  }

  findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findAllActive() {
    return this.prisma.product.findMany({
      where: {
        status: 'active',
        inStock: true,
      },
      include: {
        category: true,
      },
    });
  }

  findFeatured() {
    return this.prisma.product.findMany({
      where: {
        status: 'active',
        featured: true,
        inStock: true,
      },
      include: {
        category: true,
      },
      take: 8,
    });
  }

  findByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: {
        categoryId,
        status: 'active',
        inStock: true,
      },
      include: {
        category: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { id: _, createdAt, updatedAt, category, ...data } = updateProductDto as any;
    return this.prisma.product.update({
      where: { id },
      data: {
        ...data,
        gallery: data.gallery as any,
      },
    });
  }

  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async updateStock(id: number, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error('Product not found');

    const newStock = Math.max(0, (product.stock ?? 0) - quantity);
    return this.prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
  }

  async search(query: string) {
    if (!query || query.trim().length === 0) return [];

    const products = await this.prisma.product.findMany({
      where: {
        status: 'active',
        inStock: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { has: query.toLowerCase() } },
        ],
      },
      include: { category: true },
      take: 10,
    });

    return products.map(product => {
      const firstGallery = (product.gallery as any[])?.[0];
      return {
        id: product.id,
        name: product.name,
        price: product.basePrice,
        wholesalePrice: product.wholesalePrice,
        stock: product.stock,
        image: product.image || firstGallery?.url,
        category: product.category?.name,
      };
    });
  }
}