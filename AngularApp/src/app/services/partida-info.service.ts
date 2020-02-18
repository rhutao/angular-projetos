import { MasteryInfo } from './masteryinfo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PartidaInfo } from './partidainfo';

@Injectable({
  providedIn: 'root'
})
export class PartidaInfoService {

  constructor(private http: HttpClient) { }

  private baseURL: string = "https://br1.api.riotgames.com/lol/";
  private accountId: string = "9Ws6aFCeooe-CwFmsZInWK5oEIZncvuzfDa98Lugg-w";
  private summId: string = "M0k3B0s2uTur0EA4lySSeAQyYHwqfHJEExkk4_Z4nARB";
  public partidas: any = [];
  public listaGames: Array<any>;
  public partidaId: Array<any>;

  getGames() {
    return this.http
            .get<any[]>("https://wtq3ucxgl3.execute-api.us-east-2.amazonaws.com/rgapi/matches/" + this.accountId)
  }

  getPartidaId(idPartida) {
    return this.http
            .get<PartidaInfo[]>("https://wtq3ucxgl3.execute-api.us-east-2.amazonaws.com/rgapi/matches-id/" + idPartida)
  }

  getMastery() {
    return this.http
            .get<MasteryInfo[]>("https://wtq3ucxgl3.execute-api.us-east-2.amazonaws.com/rgapi/mastery/" + this.summId)
  }

}
