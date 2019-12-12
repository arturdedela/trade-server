import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class InRegisterDto {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;

  @ApiModelProperty()
  @IsPhoneNumber('RU')
  readonly phoneNumber: string;

  @ApiModelProperty()
  @IsString()
  readonly firstName: string;

  @ApiModelProperty()
  @IsString()
  readonly lastName: string;
}
