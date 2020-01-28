import { Component, OnInit } from '@angular/core';
import { PartidaInfoService } from '../services/partida-info.service';
import { HttpClient } from '@angular/common/http';
import { PartidaInfo } from '../services/partidainfo';

@Component({
  selector: 'app-feed-app',
  templateUrl: './feed-app.component.html',
  styleUrls: ['./feed-app.component.scss']
})
export class FeedAppComponent implements OnInit {
  public partidas: any = [];
  public listaGames: Array<any>;
  public partidaId: Array<any>;
  public partidaTeste: Array<any>;
  public salvaKda: Array<any>;
  public salvaResultado: Array<any>;
  public salvaCs: Array<any>;
  public salvaInfos: Array<any>;
  public salvaQueueTipo: Array<any>;
  public qntPartida: number = 5;

  constructor(public partidaInfoService: PartidaInfoService, public http: HttpClient) {}


  ngOnInit() {
    this.salvaKda = new Array<any>();
    this.salvaResultado = new Array<any>();
    this.salvaCs = new Array<any>();
    this.salvaInfos = new Array<any>();
    this.salvaQueueTipo = new Array<any>();
    var loop = 0;

    this.partidaInfoService.getGames().subscribe ((
      data: any[]) => {
        const obj = data;
        this.listaGames = new Array<any>();
        this.partidaId = new Array<any>();
        // this.listaGames = obj_json.results;
        for(var i in obj) {
          this.listaGames.push(obj[i]);
        }

        for(var e=0; e < this.qntPartida; e++) {
          this.partidaId.push(this.listaGames[0][e].gameId);

          if(this.listaGames[0][e].queue == 420) {
            this.salvaQueueTipo.push("RANKED - Solo");
          }else if(this.listaGames[0][e].queue == 900) {
            this.salvaQueueTipo.push("URF");
          }else if(this.listaGames[0][e].queue == 450) {
            this.salvaQueueTipo.push("ARAM");
          }else if(this.listaGames[0][e].queue == 430) {
            this.salvaQueueTipo.push("NORMAL GAME - Blind Pick");
          }else if(this.listaGames[0][e].queue == 440) {
            this.salvaQueueTipo.push("RANKED - Flex");
          }
          
        }

        for(var x = 0; x < this.qntPartida; x++) {
          this.partidaInfoService.getPartidaId(this.partidaId[x]).subscribe((
            data: PartidaInfo[]) => {
              const obj = data;
              this.partidaTeste = new Array<any>();
              for(var i in obj) {
                this.partidaTeste.push(obj[i]);
              }
              
              console.log("Testando ", this.partidaTeste[10][0].firstTower);
              console.log("Testando ", this.partidaTeste[10][1].firstTower);
              for(var i in this.partidaTeste) {
                if(this.partidaTeste[11][i].championId == 23) {
                  var kda: any = 
                  this.partidaTeste[11][i].stats.kills + "/" +  
                  this.partidaTeste[11][i].stats.deaths + "/" +  
                  this.partidaTeste[11][i].stats.assists;

                  var resultado: any = 
                  this.partidaTeste[11][i].stats.win;

                  var minions: any =
                  this.partidaTeste[11][i].stats.totalMinionsKilled;
                  
                  this.salvaKda.push(kda);
                  if(this.partidaTeste[11][i].stats.win == true) {
                    this.salvaResultado.push("WIN");
                  }else {
                    this.salvaResultado.push("LOSE");
                  }
                  
                  this.salvaCs.push(minions);
                                    
                  console.log("salvaKda: ", this.salvaKda);
                  console.log("salvaResultado: ", this.salvaResultado);
                  console.log("salvaCs: ", this.salvaCs);
                  if(loop <= 0) {
                    this.salvaInfos.push(this.salvaKda, this.salvaResultado, this.salvaCs, this.salvaQueueTipo);
                    console.log("Salvando info: ", this.salvaInfos);
                    loop++;
                  }
                  console.log(loop);
                }
              }

            }
          );
        }
      },
        error => {
          console.log(error);
        }
      );
    }
 }
