import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { UserDTO } from "../../../src/dtos/user.dto";
import UserRepository from "../../../src/repositories/user.repository";
import { AppDataSource } from "../../../src/config/data_sources";
import { User } from "../../../src/models/user.entity";
import { FindOptionsWhere } from "typeorm";
import bcrypt from "bcrypt";

describe("User repository module", () => {
    
    jest.setTimeout(10000);

    beforeEach(async () => {
        await AppDataSource.initialize();
    })

    afterEach(async () => {
        await UserRepository.clear();
        await AppDataSource.destroy();
        jest.clearAllMocks();
    })


    test("create method - Should store new user in database", async () => {

        const userData: UserDTO = {
            email: "mail@domain.com",
            password: "12345678"
        }

        const mockInsert = jest.spyOn(AppDataSource.getRepository(User), "insert");
        const mockFecth = jest.spyOn(UserRepository, "fetch");
        const mockBcrypt = jest.spyOn(bcrypt, "hash");

        await UserRepository.create(userData);

        expect(mockFecth).toHaveBeenCalledWith({email: userData.email});
        expect(mockFecth).toHaveBeenCalledTimes(1);

        const hashRounds = 15;

        expect(mockBcrypt).toBeCalledWith(userData.password, hashRounds)
        expect(mockInsert).toHaveBeenCalledTimes(1);

    });

    test("fetchAll method - Should list all users in database", async () => {
        const user1: UserDTO = {
            email: "user1@domain.com",
            password: "12345678"
        }

        const user2: UserDTO = {
            email: "user2@domain.com",
            password: "12345678"
        }

        const user3: UserDTO = {
            email: "user3@domain.com",
            password: "12345678"
        }

        await UserRepository.create(user1);
        await UserRepository.create(user2);
        await UserRepository.create(user3);

        const mockFind = jest.spyOn(AppDataSource.getRepository(User), "find");

        const users: User[] = await UserRepository.fetchAll();

        const expectedResult = [
            {id: 1, email: user1.email}, {id: 2, email: user2.email}, {id: 3, email: user3.email}
        ]
       
        expect(mockFind).toBeCalled();
        expect(users).toEqual(expectedResult);
    });

    test("fetch method - Should fetch one specific user", async () => {
        const user1: UserDTO = {
            email: "user1@domain.com",
            password: "12345678"
        }

        await UserRepository.create(user1);

        const mockFindOne = jest.spyOn(AppDataSource.getRepository(User), "findOne");

        const criteria: FindOptionsWhere<User> = {email: user1.email};

        const user: User = await UserRepository.fetch(criteria);

        const expectedResult = {id: 1, email: "user1@domain.com"};

        expect(mockFindOne).toBeCalled();
        expect(user).toEqual(expectedResult);
    });

    test("update method - Should update a user", async () => {
        const user: UserDTO = {
            email: "user@domain.com",
            password: "12345678"
        }

        await UserRepository.create(user);

        const mockUpdate = jest.spyOn(AppDataSource.getRepository(User), "update");

        const criteria = {email: user.email};
        const newData = {email: "new-email@domain.com"};
        await UserRepository.update(criteria, newData);

        expect(mockUpdate).toBeCalledWith(criteria, newData);
    });

    test("remove method - Should remove a user", async () => {
        const user: UserDTO = {
            email: "user@domain.com",
            password: "12345678"
        }

        await UserRepository.create(user);

        const mockFetch = jest.spyOn(UserRepository, "fetch");
        const mockDelete = jest.spyOn(AppDataSource.getRepository(User), "delete");

        const criteria = {email: user.email}
        await UserRepository.remove(criteria);

        expect(mockFetch).toBeCalledWith(criteria);
        expect(mockDelete).toBeCalledWith(criteria);
    });
});