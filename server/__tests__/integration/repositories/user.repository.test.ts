import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, jest, test } from "@jest/globals";
import { UserDTO } from "../../../src/dtos/authentication.dto";
import { UserRepository } from "../../../src/repositories/user.repository";
import { AppDataSource } from "../../../src/data-source";
import { User } from "../../../src/models/user.entity";
import { FindOptionsWhere } from "typeorm";
import bcrypt from "bcrypt";

describe("User repository module", () => {
    
    let userRepository: UserRepository;
    jest.setTimeout(10000);

    beforeEach(async () => {
        await AppDataSource.initialize();
        userRepository = new UserRepository();
    })

    afterEach(async () => {
        await userRepository.clear();
        await AppDataSource.destroy();
    })


    test("Should store new user in database", async () => {

        const userData: UserDTO = {
            email: "mail@domain.com",
            password: "12345678"
        }

        const mockInsert = jest.spyOn(AppDataSource.getRepository(User), "insert");
        const mockFecth = jest.spyOn(userRepository, "fetch");
        const mockBcrypt = jest.spyOn(bcrypt, "hash");

        await userRepository.create(userData);

        expect(mockFecth).toHaveBeenCalledWith({email: userData.email});
        expect(mockFecth).toHaveBeenCalledTimes(1);

        const hashRounds = 15;

        expect(mockBcrypt).toBeCalledWith(userData.password, hashRounds)
        expect(mockBcrypt).toBeCalledTimes(1);

        expect(mockInsert).toHaveBeenCalledTimes(1);

    });

    test("Should list all users in database", async () => {
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

        await userRepository.create(user1);
        await userRepository.create(user2);
        await userRepository.create(user3);

        const mockFind = jest.spyOn(AppDataSource.getRepository(User), "find");

        const users: User[] = await userRepository.fetchAll();

        const expectedResult = [
            {id: 1, email: user1.email}, {id: 2, email: user2.email}, {id: 3, email: user3.email}
        ]
       
        expect(mockFind).toBeCalledTimes(1);
        expect(users).toEqual(expectedResult);
    });

    test("Should fetch one specific user", async () => {
        const user1: UserDTO = {
            email: "user1@domain.com",
            password: "12345678"
        }

        await userRepository.create(user1);

        const mockFindOne = jest.spyOn(AppDataSource.getRepository(User), "findOne");

        const criteria: FindOptionsWhere<User> = {email: user1.email};

        const user: User = await userRepository.fetch(criteria);

        const expectedResult = {id: 1, email: "user1@domain.com"};

        expect(mockFindOne).toBeCalledTimes(1);
        expect(user).toEqual(expectedResult);
    });

    test("Should update a user", async () => {
        const user: UserDTO = {
            email: "user@domain.com",
            password: "12345678"
        }

        await userRepository.create(user);

        const mockUpdate = jest.spyOn(AppDataSource.getRepository(User), "update");

        await userRepository.update({email: user.email}, {email: "new-email@domain.com"});

        expect(mockUpdate).toBeCalledTimes(1);
    });
});