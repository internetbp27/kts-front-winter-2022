export type RepoItemAPI = {
    id: number,
    name: string,
    updated_at: string,
    owner: {
        html_url : string,
        login: string,
        avatar_url: string,        
    },
    stargazers_count: number    
}

export type RepoItemModel = {
    id: number;
    name: string;
    updatedAt: string;
    orgUrl: string;
    orgName: string;
    starsCount: number;
    avatarUrl: string;
}

export const normalizeRepoItem = (from: RepoItemAPI): RepoItemModel => ({
    id: from.id,
    name: from.name,
    updatedAt: from.updated_at,
    orgUrl: from.owner.html_url,
    orgName: from.owner.login,
    starsCount: from.stargazers_count,
    avatarUrl: from.owner.avatar_url
})