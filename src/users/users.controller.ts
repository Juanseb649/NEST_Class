import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';


interface User {
    id: string;
    name: string;
    correo: string;
}

@Controller('users')
export class UsersController {

    private users: User[] = [
        {
            id: '1',
            name: 'Juan Sebastian ',
            correo: 'Juan@gmail.com'
        },

        {
            id: '2',
            name: 'Maria pepita',
            correo: 'maria@gmail.com'
        },
        {
            id: '3',
            name: 'Pedro Picapiedra',
            correo: 'pedro@gmail.com'
        },
        {
            id: '4',
            name: 'Ana Salas',
            correo: 'ana@gmail.com'
        }
    ]
    @Get()
    getUsers(): User[] {
        return this.users;
    }
    @Get(':id')
    getUserById(@Param('id') id: string) {
        console.log('.:: UserID', id);
        const data= this.users.find((user)=> user.id === id);
        console.log('.:: data', data);
        return data;

        return {
            data: 'Buscando usuario con id',

        }
    
    }
@Get('search/:name')
getUserByName(@Param('name') name: string) {
    console.log('.:: Name', name);
    const data= this.users.find((user)=> user.name === name);
    return data?.correo;
 }

 @Post()
  createUser(@Body() user: User) {
    console.log('.:: user: ', user);
    this.users.push(user);
    return user;
  }

@Delete(':id')
    deleteUser(@Param('id') id: string) {
        const position = this.users.findIndex((user) => user.id === id);
        this.users.splice(position, 1);
        return {
            msg: "Usuario eliminado correctamente"
        };
    }
}