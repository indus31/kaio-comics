import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserType } from './model/user.type';
import { Observable, take } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // get http://localhost:3000/users
  findAll(): Observable<Array<UserType>> {
    return this.usersService.findAll().pipe(take(1)); // take arrete d'observer après la reception d'un seul élément
  }
  @Get('lastname/:lastname')
  findOne(@Param('lastname') lastname: string): Observable<UserType> {
    return this.usersService.findOne(lastname).pipe(take(1));
  }
  @Get('username/:username')
  findByUsername(@Param('username') username: string): Observable<UserType> {
    Logger.log('dans le controller de la gateway'+JSON.stringify(this.usersService.findByUsername(username).pipe(take(1))));
    return this.usersService.findByUsername(username).pipe(take(1));
  }
  @Post()
  add(@Body() user: UserType) {
    return this.usersService.add(user);

  }
}
