
import { IRxRepository} from './Repository';
import {Entity} from './Entity';
import * as querystring from 'querystring';

export class RepositoryQuery {
    static names = {MongoRepository:"MongoRepository", APIRepository: "APIRepository"};

    static isMongo<T extends Entity>(repo:IRxRepository<T>){
        return repo.constructor["name"].includes("MongoRepository"); //this wont work on the client
    }

    static toMongoQuery(query:object){
        for(let key in query){
            if (query[key].includes(",")){
                query[key] = { $in: query[key].split(",") }
            }
        }
        return query;
    }

    static toInMemoryRepo(query:object){
        return (e:Entity)=> {
            for(let key in query)
               if(e[key] !== query[key])
                   return false;
            return true;
        }
    }

    static fromQueryStringTo<T extends Entity>(query:object, repo:any){

        if(this.isMongo(repo))
            return this.toMongoQuery(query);
        return this.toInMemoryRepo(query)
    }

    static decideImpl<T extends Entity>(mongo:any, inMemory:any, repo:any){

        switch (repo.constructor["name"]){
            case this.names.MongoRepository:
                return mongo;
            case this.names.APIRepository:
                return "?"+querystring.stringify(mongo);
            default:
                return inMemory;
        }
    }

    static decideImplIcludingAPI<T extends Entity>(mongo:any,api:any, inMemory:any, repo:IRxRepository<T>){

        switch (repo.constructor["name"]){
            case this.names.MongoRepository:
                return mongo;
            case this.names.APIRepository:
                return "?"+querystring.stringify(api);
            default:
                if(this.isMongo(repo)) //This is because ScopeRepository. Will delete it ASAP.
                    return mongo;
                return inMemory;
        }
    }


}