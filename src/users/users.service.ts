/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    users = [];

    nextId() {
        if (this.users.length === 0) {
            return 1;
        }

        const ids = this.users.map((user) => user.id);
        return Math.max(...ids) + 1;
    }

    getUsers() {
        return this.users;
    }

    getUserById(id: number) {
        const user = this.users.find((user) => user.id == id);
        if (!user) {
            return new NotFoundException('user not found');
        }
        return user;
    }

    addUser(userData: any) {
        const { name, email } = userData;
        const userExist = this.users.find(user => user.email == email);
        if (userExist) {
            return new ConflictException('user alredy exist');
        }
        const user = {
            id: this.nextId(),
            name,
            email
        };

        this.users.push(user);
        return user
    }

    updateUser(id: number, userData: any) {
        const user = this.getUserById(id);
        if (!user) {
            return new NotFoundException('user not found');
        }

        const { name, email } = userData;

        user.name = name;
        user.email = email;

        return user;
    }

    patchUser(id: number, userData: any) {
        const user = this.getUserById(id);
        if (!user) {
            return new NotFoundException('user not found');
        }
        const { name, email } = userData;
        
        user.name = name || user.name;
        user.email = email || user.email;

        return user;
    }

    deleteUser(id: number) {
        const user = this.getUserById(id);
        if (!user) {
            return new NotFoundException('user not found');
        }
        this.users = this.users.filter(user => user.id != id);

        return user;
    }
}
