import { User } from "./user";

export class DataTableConfig {
    Columns: string[] = [];
    Data: User[] = [];
    PageSourceName: string = '';

    constructor(values: DataTableConfig) {
        Object.assign(this, values);
    }
};