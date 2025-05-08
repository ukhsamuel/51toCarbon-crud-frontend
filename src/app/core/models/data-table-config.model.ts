export class DataTableConfig {
    Columns: string[] = [];
    Data: any;
    PageSourceName: string = '';

    constructor(values: DataTableConfig) {
        Object.assign(this, values);
    }
};