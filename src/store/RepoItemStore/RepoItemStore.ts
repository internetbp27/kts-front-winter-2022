import {Meta} from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { computed, makeObservable, observable } from "mobx";

import ApiStore from "../../shared/store/ApiStore";
import { HTTPMethod } from "../../shared/store/ApiStore/types";
import { GetReposByIdParams, RepoFullItem, IRepoItemStore} from "./types";

const BASE_URL = 'https://api.github.com';

type PrivateFields = "_item" | "_meta";

export default class RepoItemStore implements IRepoItemStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);

    private _item: RepoFullItem | null = null;
    private _meta: Meta = Meta.initial;
    
    constructor() {
        makeObservable<RepoItemStore, PrivateFields>(this, {
            _item: observable,
            _meta: observable,
            item: computed,
            meta: computed
        });
    }

    get item(): RepoFullItem | null{
        return this._item;
    }

    get meta(): Meta{
        return this._meta;
    }
    
    async getRepoById(
        params: GetReposByIdParams
    ): Promise<void> {
        this._meta = Meta.loading;
        this._item = null;

        try {
            const result = await this._apiStore.request<any>({
                method: HTTPMethod.GET,
                endpoint: `/repositories/${params.id}`,
                headers: {
                    "Accept": "application/vnd.github.v3+json"
                },
                data: []
            });

            if (result.success && result.data){            
                this._meta = Meta.success;
                this._item = {
                    id: result.data.id,
                    name: result.data.name,
                    updated_at: result.data.updated_at,
                    org_url: result.data.owner.html_url,
                    org_name: result.data.owner.login,
                    stars_count: result.data.stargazers_count,
                    avatar_url: result.data.owner.avatar_url,
                    description: result.data.description
                }
                return;  
            }
        }
        catch (error) {
            this._meta = Meta.error;
        }        
    }

    destroy(): void{
        this._item = null;
    }
}