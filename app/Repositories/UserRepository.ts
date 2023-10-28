import { IPerson } from "App/Interfaces/PersonInterfaces";
import Person from "App/Models/Person";

export interface IPersonRepository {
  getUserById(id: number): Promise<IPerson | null>;
  createUser(user: IPerson): Promise<IPerson>;
  updateUser(user: IPerson, id: number): Promise<IPerson | null>;
  getUserByNumberDocument(document: string): Promise<IPerson | null>;
}

export default class UserRepository implements IPersonRepository {
  constructor() {}

  async getUserById(id: number): Promise<IPerson | null> {
    const res = await Person.query().where("id", id);

    return res.length > 0 ? (res[0].serialize() as IPerson) : null;
  }

  async createUser(user: IPerson): Promise<IPerson> {
    const toCreate = new Person();

    toCreate.fill({ ...user });
    await toCreate.save();
    return toCreate.serialize() as IPerson;
  }

  async updateUser(user: IPerson, id: number): Promise<IPerson | null> {
    const toUpdate = await Person.find(id);

    if (!toUpdate) {
      return null;
    }

    toUpdate.fill({ ...user });
    await toUpdate.save();
    return toUpdate.serialize() as IPerson;
  }

  async getUserByNumberDocument(numberDocument: string): Promise<IPerson | null> {
    const user = await Person.query()
      .where("numberDocument", numberDocument);

    if (Person.length == 0) {
      return null;
    }

    const newUser = {
      ...user[0].serialize(),
      password: user[0]?.$getAttribute("password"),
    };

    return newUser as IPerson;
  }
}
