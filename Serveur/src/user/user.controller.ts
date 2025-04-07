import { Controller, Get, UseGuards} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from 'src/user/user.service';

@ApiTags('Utilisateur')
@Controller('/user')
export class UserController {
  
  constructor(    
    private userService: UserService,
  ){}

  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'You can have the access at the detail of all user'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @Get('/users')
  async getAllUser() {
    return this.userService.findAllUser();
  }
}
