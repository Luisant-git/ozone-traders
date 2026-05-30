import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: number, addToCartDto: AddToCartDto) {
    // Get or create cart for user
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true }
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: true }
      });
    }

    // Extract product ID
    const productId = typeof addToCartDto.id === 'number' ? addToCartDto.id : parseInt(addToCartDto.id || '0');

    // Check if item already exists in cart with same weight
    const existingItem = cart.items.find(item => 
      item.productId === productId && 
      item.weight === addToCartDto.weight
    );

    if (existingItem) {
      // Validate stock for existing item increment
      if (productId) {
        await this.validateStock(productId, addToCartDto.weight || '', existingItem.quantity + (addToCartDto.quantity || 1));
      }

      // Update quantity for existing item
      return this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { 
          quantity: existingItem.quantity + (addToCartDto.quantity || 1)
        }
      });
    }

    // Validate stock for new item
    if (productId) {
      await this.validateStock(productId, addToCartDto.weight || '', addToCartDto.quantity || 1);
    }

    // Create new cart item
    return this.prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        name: addToCartDto.name,
        price: addToCartDto.price,
        imageUrl: addToCartDto.imageUrl,
        weight: addToCartDto.weight,
        quantity: addToCartDto.quantity || 1,
        hsnCode: addToCartDto.hsnCode
      }
    });
  }

  async getCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { 
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return cart?.items || [];
  }

  async removeFromCart(userId: number, itemId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) return null;

    return this.prisma.cartItem.delete({
      where: { 
        id: itemId,
        cartId: cart.id 
      }
    });
  }

  async updateQuantity(userId: number, itemId: number, quantity: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) return null;

    const item = await this.prisma.cartItem.findUnique({
      where: { id: itemId }
    });

    if (item && item.productId) {
      await this.validateStock(item.productId, item.weight || '', quantity);
    }

    return this.prisma.cartItem.update({
      where: { 
        id: itemId,
        cartId: cart.id 
      },
      data: { quantity }
    });
  }

  private async validateStock(productId: number, weight: string, requestedQty: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) return;

    const availableQty = product.stock ?? 0;
    if (requestedQty > availableQty) {
      throw new BadRequestException(`Only ${availableQty} units available.`);
    }
  }

  async clearCart(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId }
    });

    if (!cart) return null;

    return this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });
  }
}