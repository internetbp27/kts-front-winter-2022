export type GetOrganizationReposListParams = {
    org: string;
    query?: {
        type?: string;
        sort?: string;
        direction?: string;
        per_page?: number;
        page?: number
    }
}

export interface IReposListStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<void>;
}