/** Интерфейс класса для работы с GitHub API
 * названия getOrganizationReposList
 * (а также типов GetOrganizationReposListParams и RepoItem)
 * поменяйте в соответствии с выполняемым запросом.
 * Или не меняйте, если делаете запрос за списком репоизториев для организации)
 * Выберите любой запрос из публичного API GitHub.
 */

//https://docs.github.com/en/rest/reference/repos
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

export type ApiResp<RepoItem> = {
    status: boolean;
    data: RepoItem;
}

export type RepoItem = {
    id: number;
    name: string;
    created_at: string;
    org_url: string;
    stars_count: number;
    avatar_url: string;
}

export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>>;
}
