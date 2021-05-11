import { User } from "../dto/users.dto";
import UserModel from "../models/users.model";
import debug from "debug";

const log: debug.IDebugger = debug("app:in-memory-dao");

class UsersDao {
  constructor() {
    log("Created new instance of UsersDao");
  }

  async addUser(user: User) {
    const saved = await (await UserModel.create(user)).save();
    return saved;
  }
}

export default new UsersDao();
