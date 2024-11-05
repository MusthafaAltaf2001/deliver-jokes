import { Repository } from "typeorm";

export abstract class AbstractRepository<T> {
    constructor(
        private readonly repository: Repository<T>
    ) { }

    async findAll() {
        return this.repository.find({});
    }

    async delete(id: number) {
        await this.repository.delete(id);
    }
}