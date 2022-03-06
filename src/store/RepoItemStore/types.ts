export type GetReposByIdParams = {
    id: number
}

export type RepoFullItem = {
    id: number;
    name: string;
    updated_at: string;
    org_url: string;
    org_name: string;
    stars_count: number;
    avatar_url: string;
    description?: string;
}

export interface IRepoItemStore {    
    getRepoById(params: GetReposByIdParams): Promise<void>
}