import { Controller, Get, Param } from '@nestjs/common';


    interface User {
        id:String;
        name:String; 
        mail:String
    }

@Controller('users')
export class UsersController {
    private users: User[] = [
        {
            id: '1',
            name: 'Maria',
            mail: 'maria@mail.com'
        },
        {
            id: '2',
            name: 'Juan',
            mail: 'juan@mail.com'
        },
        {
            id: '3',
            name: 'Ana',
            mail: 'ana@mail.com'
        },
        {
            id: '4',
            name: 'Carlos',
            mail: 'carlos@mail.com'
        },
        {
            id: '5',
            name: 'Sofia',
            mail: 'sofia@mail.com'
        },
        {
            id: '6',
            name: 'Diego',
            mail: 'diego@mail.com'
        }
        
    
    ];

    @Get()
    getAllUsers(): User[] {
    return this.users;
    }

    @Get('search/:name')
    getUserName(@Param('name') name: String): String | undefined {
        const data= this.users.find(user => user.name === name.toString());
        return data?.name;
    }


    @Get('search/:mail')
    getUserMail(@Param('mail') mail: String): String | undefined {
        const data= this.users.find(user => user.mail === mail.toString());
        return data?.mail;
    }

    @Get(':id')
    getUserById(@Param('id') id: String){

        console.log ('.:: UserID', id);
        const data= this.users.find(user => user.id === id.toString());
        console.log('.:: UserData', data);
        if data == undefined {
            return{
                msg: 'User not found',
                data: data
            }
        }
        return{
            data: 'user Does Not Exist: ' + id,
        }
        
}
    }