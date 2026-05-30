import { IsString, IsOptional, IsInt } from 'class-validator';

export class AddToCartDto {
  @IsOptional()
  id?: number | string;

  @IsString()
  name: string;

  @IsString()
  price: string;

  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsString()
  weight?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsOptional()
  @IsString()
  hsnCode?: string;
}