import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, HttpCode, HttpStatus } from "@nestjs/common";
import type { DeleteResult } from "mongodb";
import { UsersService } from "./users.service";
//import type { UserDocument } from '../users/users.schema';
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import type { UserDocument } from './users.schema'; // Garanta que a importação existe

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly svc: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.svc.findAll();
  }

  @Roles("admin","manager")
  @Get()
  @HttpCode(HttpStatus.OK)
  list(@Query("page") page = "1", @Query("pageSize") pageSize = "20") {
    return this.svc.list(parseInt(page), parseInt(pageSize));
  }

  @Roles("admin")
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: RegisterDto) {
    const { password, ...rest } = dto as any;
    const argon2 = await import("argon2");
    const passwordHash = await argon2.default.hash(password);
    return this.svc.create({ ...rest, passwordHash });
  }

  @Roles("admin","manager")
  @Put(":id")
  @HttpCode(HttpStatus.OK)
  update(@Param("id") id: string, @Body() patch: UpdateUserDto) {
    return this.svc.update(id, patch as any);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<UserDocument | null> { // <-- Altere o tipo aqui
    return this.svc.remove(id);
  }  
}
