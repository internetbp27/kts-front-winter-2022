import { BrowserHistory, createBrowserHistory } from "history";
import { action, makeObservable, observable } from "mobx";
import qs from "qs";
import { useLocation } from "react-router-dom";



type PrivateFields = "_params" | "_history" | "_location";

export default class QueryParamsStore{
    private _params: qs.ParsedQs = {};
    private _search: string = "";
    private _history;
    private _location;

    constructor() {
        makeObservable<QueryParamsStore, PrivateFields>(this, {
            _params: observable.ref,
            _history: observable,
            _location: observable,
            setSearch: action,
        })
    }

    getParam(key: string): undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[] {
        return this._params[key];
    }

    setSearch(search: string){
        search = search.startsWith("?") ? search.slice(1) : search;

        if (this._search !== search){
            this._search = search;
            this._params = qs.parse(search);
        }

        const nextParams = { ...this._params, ['test']: 'test' };
        const nextSearch = qs.stringify(nextParams);
            this._history.replace({
            ...this._location,
            search: nextSearch
        });
    }



    setHistory(history, location){
        this._history = history;
        this._location = location;
    }
}