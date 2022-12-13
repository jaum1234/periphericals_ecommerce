import { UserRepository } from "../repositories/user.repository";

class UserController {
    
    public repository: UserRepository;
    
    public constructor() {
        this.repository = new UserRepository();
    }
}

export default new UserController();