import {ApiResponse, IApiStore, RequestParams, StatusHTTP} from "./types";
import qs from 'qs';
import fetch from 'cross-fetch';

export default class ApiStore implements IApiStore {
    readonly baseUrl: string;
    constructor(baseUrl: string) {
        // TODO: Примите из параметров конструктора baseUrl
        // и присвойте его в this.baseUrl
        this.baseUrl = baseUrl;
    }

    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        // TODO: Напишите здесь код, который с помощью fetch будет делать запрос
        let url:string = this.baseUrl;
        let options:Object = {};

        if (params.method == 'GET'){
            url += params.endpoint + '?' + qs.stringify(params.data);
            
            options = {
                method: params.method,
                headers: params.headers
            }
        }
        else if (params.method == 'POST'){
            options = {
                method: params.method,
                headers: params.headers,
                body: JSON.stringify(params.data)
            };
        }
        //console.log(options);
        
        return fetch(url, options)
            .then((response) => { 
                //console.log(response);
                if (!response.ok){
                    return {
                        success: false,
                        data: response.statusText,
                        status: StatusHTTP.ERROR_BAD_REQUEST
                    }
                }                      
                return response.json();
            })
            .then((data) => {
                return {
                    success: true,
                    data: data,
                    status: StatusHTTP.SUCCESS
                };
            })
    }
}