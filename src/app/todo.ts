export interface Todo {
    id:string | number;
    title:string;
    completed:boolean;
    editing ?:boolean;
    newTitle?: string;
}
