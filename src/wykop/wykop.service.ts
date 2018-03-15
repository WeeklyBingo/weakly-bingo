import { Component } from "@nestjs/common"
import { News, MicroblogNews } from "./wykop.entity";
import axios, { AxiosStatic, AxiosInstance } from 'axios'
import { Md5 } from "ts-md5"

export interface IWykopService {
    getNews(): Promise<News[]>;
    getMicroblogNews(page?: number): Promise<MicroblogNews[]>;
}

@Component()
export class WykopService implements IWykopService {
    private appKey: string = process.env.WYKOP_APP_KEY;
    private secretKey: string = process.env.WYKOP_SECRET_KEY;
    private apiUrl: string = process.env.WYKOP_API_URL;
    private httpClient: AxiosInstance;
    constructor () {
        this.httpClient = axios.create();
    }

    getNews(): Promise<News[]> {
        return new Promise<News[]>((resolve, reject)=> {
            const url: string = this.getUrlForMicroblogNews(page);
            this.httpClient.get(url, {
                headers: {
                    "apisign": this.generateSignTokenForUrl(url)
                }
            }).then((response)=> {
                resolve(response.data);
            }).catch(error=> {
                reject(error.data);
            });
        });
    }

    getMicroblogNews(page: number = 0): Promise<MicroblogNews[]> {
        return new Promise<MicroblogNews[]>((resolve, reject)=> {
            const url: string = this.getUrlForMicroblogNews(page);
            this.httpClient.get(url, {
                headers: {
                    "apisign": this.generateSignTokenForUrl(url)
                }
            }).then((response)=> {
                resolve(response.data);
            }).catch(error=> {
                reject(error.data);
            });
        });
    }

    private generateSignTokenForUrl(url: string) {
        return Md5.hashAsciiStr(`${this.secretKey}${url}`);
    }

    private getUrlForMicroblogNews(page: number = 0): string {
        return `${this.apiUrl}stream/index/appkey,${this.appKey},page,${page}/`;
    }

}