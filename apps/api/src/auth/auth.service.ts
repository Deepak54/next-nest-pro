import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/users.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

/**
 * Interface para o payload do Access Token.
 */
interface JwtPayload {
  sub: string;
  email: string;
  roles: string[];
}

/**
 * Interface para o payload do Refresh Token.
 */
interface RefreshTokenPayload {
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Registra um novo usuário, verificando se o e-mail já existe
   * e criptografando a senha.
   * @param registerDto - Contém os dados para o novo usuário.
   * @returns O objeto do usuário criado (sem a senha).
   * @throws ConflictException se o e-mail já estiver em uso.
   */
  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const passwordHash = await argon2.hash(password);

    const newUserDocument = await this.usersService.create({
      ...registerDto,
      passwordHash,
    });

    const { passwordHash: _, ...safeUser } = newUserDocument.toObject();
    return safeUser;
  }

  /**
   * Valida as credenciais de um usuário.
   * @param email - O email do usuário.
   * @param password - A senha do usuário.
   * @returns O objeto do usuário se as credenciais forem válidas.
   * @throws UnauthorizedException se o usuário não for encontrado ou a senha for inválida.
   */
  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    const isPasswordMatching = await argon2.verify(user.passwordHash, password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    
    // Opcional: verificar se o usuário está ativo
    // if (!user.isActive) {
    //   throw new UnauthorizedException('Usuário inativo.');
    // }

    return user;
  }
  
  /**
   * Realiza o login, gera os tokens e atualiza o hash do refresh token.
   * @param user - O objeto do usuário já validado.
   * @returns Um objeto contendo o usuário seguro, accessToken e refreshToken.
   */
  async login(user: UserDocument) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(user),
      this.signRefreshToken(user),
    ]);

    const refreshHash = await argon2.hash(refreshToken);
    await this.usersService.updateRefreshHash(user._id.toString(), refreshHash);

    const { passwordHash: _, refreshTokenHash: __, ...safeUser } = user.toObject();

    return { user: safeUser, accessToken, refreshToken };
  }

  /**
   * Gera um novo access token a partir de um refresh token válido.
   * @param userId - O ID do usuário.
   * @param refreshToken - O refresh token fornecido.
   * @returns Um objeto contendo o novo accessToken.
   */
  async refresh(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user?.refreshTokenHash) {
      throw new UnauthorizedException('Acesso negado.');
    }

    const isRefreshTokenMatching = await argon2.verify(user.refreshTokenHash, refreshToken);
    if (!isRefreshTokenMatching) {
      throw new UnauthorizedException('Acesso negado.');
    }

    const accessToken = await this.signAccessToken(user);
    return { accessToken };
  }

  /**
   * Realiza o logout do usuário invalidando seu refresh token no banco.
   * @param userId - O ID do usuário a ser deslogado.
   */
  async logout(userId: string): Promise<void> {
    await this.usersService.updateRefreshHash(userId, null);
  }

  // --- Métodos Privados para Geração de Tokens ---
  private signAccessToken(user: UserDocument): Promise<string> { // <-- TIPO ADICIONADO AQUI
    const payload: JwtPayload = {
      sub: user._id.toString(), // <-- Agora funciona
      email: user.email,
      roles: user.roles,
    };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
    });
  }
  
  private signRefreshToken(user: UserDocument): Promise<string> { // <-- TIPO ADICIONADO AQUI
    const payload: RefreshTokenPayload = {
      sub: user._id.toString(), // <-- Agora funciona
    };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
    });
  }  
}
