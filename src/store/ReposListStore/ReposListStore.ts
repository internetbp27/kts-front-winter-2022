import { normalizeRepoItem, RepoItemAPI, RepoItemModel } from "@store/models/GitHub";
import rootStore from "@store/RootStore";
import {Meta} from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import { action, computed, IReactionDisposer, makeObservable, observable, reaction, runInAction } from "mobx";

import ApiStore from "../../shared/store/ApiStore";
import { HTTPMethod } from "../../shared/store/ApiStore/types";
import { GetOrganizationReposListParams, IReposListStore} from "./types";

const BASE_URL = 'https://api.github.com';

type PrivateFields = "_list" | "_meta";

export default class ReposListStore implements IReposListStore, ILocalStore {
    private readonly _apiStore = new ApiStore(BASE_URL);

    private _list: RepoItemModel[] = [];
    private _meta: Meta = Meta.initial;
    
    constructor() {
        makeObservable<ReposListStore, PrivateFields>(this, {
            _list: observable.ref,
            _meta: observable,
            list: computed,
            meta: computed,
            getOrganizationReposList: action
        });
    }

    get list(): RepoItemModel[]{
        return this._list;
    }

    get meta(): Meta{
        return this._meta;
    }

    async getOrganizationReposList(
        params: GetOrganizationReposListParams
    ): Promise<void> {
        // TODO: Здесь сделайте вызов из this.apiStore и верните результат
        // Документация github: https://docs.github.com/en/rest/reference/repos#list-organization-repositories
        
        this._list = [];

        if (params.org && params.org.length > 0){
            this._meta = Meta.loading;
            try {
                const result = await this._apiStore.request<RepoItemAPI[]>({
                    method: HTTPMethod.GET,
                    endpoint: `/orgs/${params.org}/repos`,
                    headers: {
                        "Accept": "application/vnd.github.v3+json"
                    },
                    data: params.query || {}
                });

                runInAction(() => {
                    if (result.success){
                        try {
                            this._meta = Meta.success;
                            this._list = result.data.map(normalizeRepoItem);
                            return;    
                        } catch (error) {
                            this._meta = Meta.error;
                            this._list = [];
                        }
                    }
                });
            }
            catch (error) {
                this._meta = Meta.error;
            }
            return
        }
    }

    destroy(): void{
        this._list = [];
    }

    private readonly _qpReaction: IReactionDisposer = reaction(
        () => rootStore.query.getParam("search"),
        (search) => {
            if (search){
                this.getOrganizationReposList({
                    org: search.toString(),
                    query: {
                      per_page: 5
                    }
                });
            }            
        }
    );
}