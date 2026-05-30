import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsBoolean } from 'class-validator';

class GalleryDto {
  @ApiProperty({ example: 'https://cdn/img/pepper-1.jpg' })
  url: string;
}

export { GalleryDto };

export class CreateProductDto {
  @ApiProperty({ example: 'Premium Black Pepper' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'High-quality black pepper from Kerala' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  categoryId: number;

  @ApiPropertyOptional({ example: 'pepper.jpg' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({ example: '5.00', description: 'Price per gram (retail)' })
  @IsString()
  basePrice: string;

  @ApiPropertyOptional({ example: '400.00', description: 'Price per kg (wholesale)' })
  @IsOptional()
  @IsString()
  wholesalePrice?: string;

  @ApiPropertyOptional({ example: '6.00', description: 'MRP per gram' })
  @IsOptional()
  @IsString()
  mrp?: string;

  @ApiPropertyOptional({ example: 500, description: 'Total stock quantity in grams/kg' })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiPropertyOptional({ example: '09041100' })
  @IsOptional()
  @IsString()
  hsnCode?: string;

  @ApiPropertyOptional({ example: 'Salem, Tamil Nadu' })
  @IsOptional()
  @IsString()
  originLocation?: string;

  @ApiPropertyOptional({ example: 'Premium Grade A' })
  @IsOptional()
  @IsString()
  qualityGrade?: string;

  @ApiPropertyOptional({ example: 'Vacuum Sealed Pouch' })
  @IsOptional()
  @IsString()
  packagingType?: string;

  @ApiPropertyOptional({ example: ['pepper', 'spices', 'kerala'] })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional({ type: [GalleryDto] })
  @IsOptional()
  @IsArray()
  gallery?: GalleryDto[];

  @ApiPropertyOptional({ example: 'active' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}