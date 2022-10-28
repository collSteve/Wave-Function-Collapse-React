import { v4 as uuid } from 'uuid'; 

export function generate_Id(): string {
    return uuid() + "-" + uuid() + "-" + uuid();
}