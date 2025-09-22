import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import type { UserDocument } from '../users/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';     // <-- Importação correta
import { RegisterDto } from './dto/register.dto'; // <-- Importação correta

// Crie uma interface para o payload do usuário que vem do JWT
interface AuthenticatedUser {
  userId: string;
  email: string;
  roles: string[];
}

const REFRESH_COOKIE = 'rt';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //@UseGuards(JwtAuthGuard)
  //@Get('me')
  //me(@GetUser() user: UserDocument) {
    // O JwtAuthGuard e a JwtStrategy já validaram o token
    // e o decorator @GetUser extrai o payload do usuário do request.
    //return user;
  //}

  /**
   * Registra um novo usuário. A lógica de negócio está no AuthService.
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Realiza o login. O LocalAuthGuard executa a validação de email/senha.
   * Se for bem-sucedido, anexa o usuário ao request.
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @GetUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user: safeUser, accessToken, refreshToken } = await this.authService.login(user);

    res.cookie(REFRESH_COOKIE, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
      path: '/auth/refresh',
    });

    return { user: safeUser, accessToken };
  }

  /**
   * Gera um novo accessToken usando um refreshToken.
   */
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@GetUser() user: { userId: string; refreshToken: string }) {
    return this.authService.refresh(user.userId, user.refreshToken);
  }

  /**
   * Realiza o logout, limpando o cookie e o hash no banco.
   */
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetUser('sub') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(userId);
    res.clearCookie(REFRESH_COOKIE, { path: '/auth/refresh' });
    return { ok: true };
  }

  /**
   * Retorna os dados do usuário logado a partir do payload do token.
   */
  //@UseGuards(JwtAuthGuard)
  //@Get('me')
  //me(@GetUser() user: { sub: string; roles: string[] }) {
    //return user;
  //}
  
  /**
   * Retorna os dados do usuário logado a partir do payload do token.
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@GetUser() user: AuthenticatedUser) { // <-- SUBSTITUIMOS 'any' PELO TIPO CORRETO
	return user;
  }	
}
