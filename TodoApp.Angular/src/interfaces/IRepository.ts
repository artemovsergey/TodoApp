import { Observable } from "rxjs";

export interface IRepository<T> {

    get(id: number): Observable<T>;

    create(object: T): Observable<T>;
    
    delete(id: number): boolean;
    
    update(id: number, t: T): Observable<T>;

    getAll(): Observable<T[]>

}