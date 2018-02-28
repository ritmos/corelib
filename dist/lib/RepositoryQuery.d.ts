import { IReactiveRepository } from './Repository';
import { Entity } from './Entity';
export declare class RepositoryQuery {
    static names: {
        MongoRepository: string;
        APIRepository: string;
    };
    static isMongo<T extends Entity>(repo: IReactiveRepository<T>): any;
    static toMongoQuery(query: object): object;
    static decideImpl<T extends Entity>(mongo: any, inMemory: any, repo: IReactiveRepository<T>): any;
    static decideImplIcludingAPI<T extends Entity>(mongo: any, api: any, inMemory: any, repo: IReactiveRepository<T>): any;
}
