import { Controller, Get, Session } from '@nestjs/common';

@Controller('auth')
export class AuthController {   
  @Get('/authn')
  async authn(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1
    console.log(session)
    return true;
  }
}
