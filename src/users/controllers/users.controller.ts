import express from "express";
import UsersDao from "../daos/users.daos";
import { User } from "../dto/users.dto";

class UsersController {
  async createUser(req: express.Request, res: express.Response) {
    const user: User = {
      email: "email@email.com",
      password: "123456",
      name: "test name",
    };

    const userId = await UsersDao.addUser(user);
    res.status(201).send({ id: userId });
  }
}

export default new UsersController();
