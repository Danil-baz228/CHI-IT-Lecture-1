import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

 
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(+id);
  }

 
  @Post()
  async create(@Body() createUserDto: { username: string; password: string }) {
    return this.usersService.create(createUserDto);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard) 
  async remove(@Param('id') id: string) {
    return this.usersService.deleteById(+id);
  }

  


}
