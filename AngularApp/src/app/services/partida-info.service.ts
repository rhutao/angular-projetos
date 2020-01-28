import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartidaInfo } from './partidainfo';

@Injectable({
  providedIn: 'root'
})
export class PartidaInfoService {

  constructor(private http: HttpClient) { }

  private baseURL: string = "https://br1.api.riotgames.com/lol/match/v4/";
  private accountId: string = "x";
  private apiKey: string = "X";
  public partidas: any = [];
  public listaGames: Array<any>;
  public partidaId: Array<any>;

  getGames() {
    return this.http
            .get<any[]>(this.baseURL + "matchlists/by-account/" + 
                        this.accountId + "?champion=23&api_key=" +
                        this.apiKey);
  }

  getPartidaId(idPartida) {
    return this.http
            .get<PartidaInfo[]>(this.baseURL + "matches/" + 
                                idPartida + "?api_key=" + 
                                this.apiKey);
  }

}
