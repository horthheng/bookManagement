import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcryptjs'; // ✅ not 'bcrypt'
import { RegisterDto } from "./dto/create-auth.dto";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

async register(dto: RegisterDto) {
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Create user
    await this.userService.create({ ...dto, password: hashedPassword });

    // Return success message
    return { message: 'User registered successfully' };
  } catch (error) {
    // Handle errors (like duplicate email)
    return { message: 'Registration failed', error: error.message };
  }
}


async login(dto: LoginDto) {
  try {
    const user = await this.userService.findByEmail(dto.email);

    if (!user || !user.password) {
      return { success: false, message: 'Invalid credentials' };
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      return { success: false, message: 'Invalid credentials' };
    }

    const payload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Login successful',
      access_token: token,
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed', error: error.message };
  }
}


}
