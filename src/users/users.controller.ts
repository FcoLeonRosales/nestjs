/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly usersService: UsersService
    ) { }

    @Get('/')
    async getUsers() {
        return this.usersService.getUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: number) {
        return this.usersService.getUserById(id);
    }

    @Post('/')
    async addUser(@Body() userData: any) {
        return this.usersService.addUser(userData);
    }

    @Put('/:id')
    async updateUser(@Param('id') id: number, @Body() userData: any) {
        return this.usersService.updateUser(id,userData);
    }

    @Patch('/:id')
    async patchUser(@Param('id') id: number, @Body() userData: any) {
        return this.usersService.patchUser(id,userData);
    }
    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        return this.usersService.deleteUser(id);
    }
}
