import { IsString, IsOptional, IsInt, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class WeightOptionDto {
  @IsString()
  weight: string;

  @IsString()
  price: string;

  @IsString()
  @IsOptional()
  wholesalePrice?: string;

  @IsInt()
  stock: number;
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  categoryId: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeightOptionDto)
  weightOptions: WeightOptionDto[];

  @IsString()
  basePrice: string;

  @IsString()
  @IsOptional()
  wholesalePrice?: string;

  @IsString()
  @IsOptional()
  mrp?: string;

  @IsString()
  @IsOptional()
  hsnCode?: string;

  @IsString()
  @IsOptional()
  originLocation?: string;

  @IsString()
  @IsOptional()
  qualityGrade?: string;

  @IsString()
  @IsOptional()
  packagingType?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsOptional()
  gallery?: any[];

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  categoryId?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WeightOptionDto)
  @IsOptional()
  weightOptions?: WeightOptionDto[];

  @IsString()
  @IsOptional()
  basePrice?: string;

  @IsString()
  @IsOptional()
  wholesalePrice?: string;

  @IsString()
  @IsOptional()
  mrp?: string;

  @IsString()
  @IsOptional()
  hsnCode?: string;

  @IsString()
  @IsOptional()
  originLocation?: string;

  @IsString()
  @IsOptional()
  qualityGrade?: string;

  @IsString()
  @IsOptional()
  packagingType?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsArray()
  @IsOptional()
  gallery?: any[];

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsBoolean()
  @IsOptional()
  inStock?: boolean;
}
