import { Component, OnInit } from '@angular/core';
import { PartidaInfoService } from '../services/partida-info.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-maestria-app',
  templateUrl: './maestria-app.component.html',
  styleUrls: ['./maestria-app.component.scss']
})
export class MaestriaAppComponent implements OnInit {
  public partidas: any = [];
  public listaInfos: Array<any>;
  public listaGames: Array<any>;
  public partidaId: Array<any>;
  public partidaTeste: Array<any>;
  public qntPartida: number = 10;
  public qntMasteryFormat: string;
  public kill: number = 0;
  public mediaKill: number = 0;
  public death: number = 0;
  public mediaDeath: number = 0;
  public assist: number = 0;
  public mediaAssist: number = 0;
  public cs: number = 0;
  public mediaCs: number = 0;

  constructor(public partidaInfoService: PartidaInfoService, public http: HttpClient, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    this.spinner.show();
    this.listaGames = new Array<any>();

    var loop = 0;
    this.partidaInfoService.getMastery().subscribe((
      data: any) => {
      const obj = data;
      this.listaInfos = new Array<any>();
      this.partidaId = new Array<any>();
      // this.listaGames = obj_json.results;
      var qntMastery = obj.championPoints.toString();
      var primeiraNum = qntMastery.slice(0, 3);
      var segundaNum = qntMastery.slice(3, qntMastery.length);
      this.qntMasteryFormat = primeiraNum + "." + segundaNum;
    });

    this.partidaInfoService.getGames().subscribe((
      data: any[]) => {
      const obj = data;
      this.listaGames = new Array<any>();
      this.partidaId = new Array<any>();
      // this.listaGames = obj_json.results;
      for (var i in obj) {
        this.listaGames.push(obj[i]);
      }

      for (var e = 0; e < this.qntPartida; e++) {
        this.partidaId.push(this.listaGames[0][e].gameId);
      }

      for (var x = 0; x < this.qntPartida; x++) {
        this.partidaInfoService.getPartidaId(this.partidaId[x]).subscribe((
          data: any) => {
          const obj = data;
          this.partidaTeste = new Array<any>();
          for (var i in obj) {
            this.partidaTeste.push(obj[i]);
          }
          console.log("Testando ", this.partidaTeste[10][0].firstTower);
          console.log("Testando ", this.partidaTeste[10][1].firstTower);
          for (var i in this.partidaTeste) {
            if (this.partidaTeste[11][i].championId == 23) {
              this.kill = this.partidaTeste[11][i].stats.kills + this.kill;
              this.death = this.partidaTeste[11][i].stats.deaths + this.death;
              this.assist = this.partidaTeste[11][i].stats.assists + this.assist;

              this.cs = this.partidaTeste[11][i].stats.totalMinionsKilled + this.cs;

              this.mediaCs = this.cs / this.qntPartida;
              this.mediaKill = this.kill / this.qntPartida;
              this.mediaDeath = this.death / this.qntPartida;
              this.mediaAssist = this.assist / this.qntPartida;
            }
          }

        }
        );
      }

    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.spinner.hide();
  }
}
