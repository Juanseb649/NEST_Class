import { Controller, Get, Param } from '@nestjs/common';
interface User {
  id: string;
  name: string;
  mail: string;
}
@Controller('users')
export class UsersController {
  private users: User[] = [
    {
      id: '1',
      name: 'Maria',
      mail: 'maria@mail.com',
    },
    {
      id: '2',
      name: 'Juan',
      mail: 'juan@mail.com',
    },
    {
      id: '3',
      name: 'Ana',
      mail: 'ana@mail.com',
    },
    {
      id: '4',
      name: 'Carlos',
      mail: 'carlos@mail.com',
    },
    {
      id: '5',
      name: 'Sofia',
      mail: 'sofia@mail.com',
    },
    {
      id: '6',
      name: 'Diego',
      mail: 'diego@mail.com',
    },
  ];
  @Get()
  getAllUsers(): User[] {
    return this.users;
  }
  @Get('search/:name')
  getUserName(@Param('name') name: string): string | undefined {
    const data = this.users.find((user) => user.name === name.toString());
    return data?.name;
  }
  @Get('search/:mail')
  getUserMail(@Param('mail') mail: string): string | undefined {
    const data = this.users.find((user) => user.mail === mail.toString());
    return data?.mail;
  }
  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log('.:: UserID', id);
    const data = this.users.find((user) => user.id === id.toString());
    console.log('.:: UserData', data);
    if (!data) {
      return {
        msg: 'User not found',
        data: null
      };
    }
    return {
      msg: 'User found',
      data: data
    };
  }
}