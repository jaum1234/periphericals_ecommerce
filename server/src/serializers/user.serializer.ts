import { FindOptionsSelect } from "typeorm";
import { User } from "../models/user.entity"

export class UserSerializer 
{
    public static serialize = (): FindOptionsSelect<User> => {
        const columns: FindOptionsSelect<User> = {
            id: true,
            email: true,
            password: false
        };

        return columns;
    }
}