import { Controller, Get, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@ApiTags('Utilisateur')
@Controller('/user')
export class UserController {
  
  constructor(    
    private userService: UserService,
  ){}

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Success'})
  @ApiResponse({ status: 401, description: '"Unauthorized"'})
  @ApiBearerAuth()
  @Get('/users')
  async getAllUser() {
    return this.userService.findAllUser();
  }
}
