import ApiStore from '../../shared/store/ApiStore';
import { HTTPMethod } from '../../shared/store/ApiStore/types';
import {IGitHubStore, GetOrganizationReposListParams, ApiResp, RepoItem} from "./types";

export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com'); // TODO: не забудьте передать baseUrl в конструктор

    // TODO: реализовать интерфейс IGitHubStore

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
        try {
            const data = await this.apiStore.request(
                {
                    method: HTTPMethod.GET,
                    endpoint: `/orgs/${params.org}/repos`,
                    headers: {
                        "Accept": "application/vnd.github.v3+json"
                    },
                    data: params.query
                }
            );

            let res:RepoItem[] = [];

            if(data.data && data.data.length > 0){                
                data.data.forEach(el => {
                    res.push(
                        {
                            id: el.id,
                            name: el.name,
                            created_at: el.created_at,
                            org_url: el.owner.html_url,
                            stars_count: el.stargazers_count,
                            avatar_url: el.owner.avatar_url
                        }
                    )
                });
            }
            
            return {
                status: true,
                data: res
            };
        }
        catch(error) {          
            console.log("Error", error);
            return {
                status: false,
                data: []
            }
        }
    }
}
