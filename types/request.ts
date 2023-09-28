export interface IGETQuery {
    pageNo?: number;
    limit?: number;
    id?: number
}

export interface IPagination {
    take?: number;
    skip?: number;
}