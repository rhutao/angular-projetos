import { Component, OnInit } from '@angular/core';
import { PartidaInfoService } from '../services/partida-info.service';
import { HttpClient } from '@angular/common/http';
import { PartidaInfo } from '../services/partidainfo';
import { NgxSpinnerService } from "ngx-spinner";


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
  public qntPartida: number = 15;
  public func1Done: boolean = false;
  public loopFunction1: boolean = false;

  constructor(public partidaInfoService: PartidaInfoService, public http: HttpClient, private spinner: NgxSpinnerService) { }

  async funcTest1() {
    await this.spinner.show();
    this.salvaKda = new Array<any>();
    this.salvaResultado = new Array<any>();
    this.salvaCs = new Array<any>();
    this.salvaInfos = new Array<any>();
    this.salvaQueueTipo = new Array<any>();


    this.partidaInfoService.getGames().subscribe(async (
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
      await this.funcTest2();
    },
      error => {
        console.log(error);
      }
    );
    return;
  }

  async  funcTest2() {
    var loop = 0;

    for (var x = 0; x < this.qntPartida; x++) {
      this.partidaInfoService.getPartidaId(this.partidaId[x]).subscribe( async (
        data: PartidaInfo[]) => {
        const obj = data;
        this.partidaTeste = new Array<any>();
        for (var i in obj) {
          this.partidaTeste.push(obj[i]);
        }


        if (this.partidaTeste[4] == 420) {
          this.salvaQueueTipo.push("RANKED - Solo");
        } else if (this.partidaTeste[4] == 900) {
          this.salvaQueueTipo.push("URF");
        } else if (this.partidaTeste[4] == 450) {
          this.salvaQueueTipo.push("ARAM");
        } else if (this.partidaTeste[4] == 430) {
          this.salvaQueueTipo.push("NORMAL GAME - Blind Pick");
        } else if (this.partidaTeste[4] == 440) {
          this.salvaQueueTipo.push("RANKED - Flex");
        }

        // console.log("Testando ", this.partidaTeste[10][0].firstTower);
        // console.log("Testando ", this.partidaTeste[10][1].firstTower);
        for (var i in this.partidaTeste) {
          if (this.partidaTeste[11][i].championId == 23) {
            var kda: any =
              this.partidaTeste[11][i].stats.kills + "/" +
              this.partidaTeste[11][i].stats.deaths + "/" +
              this.partidaTeste[11][i].stats.assists;

            var resultado: any =
              this.partidaTeste[11][i].stats.win;

            var minions: any =
              this.partidaTeste[11][i].stats.totalMinionsKilled + this.partidaTeste[11][i].stats.neutralMinionsKilled;

            this.salvaKda.push(kda);
            if (this.partidaTeste[11][i].stats.win == true) {
              this.salvaResultado.push("WIN");
            } else {
              this.salvaResultado.push("LOSE");
            }

            this.salvaCs.push(minions);
            if (loop <= 0) {
              this.salvaInfos.push(this.salvaKda, this.salvaResultado, this.salvaCs, this.salvaQueueTipo);
              loop++;
            }
            console.log(loop);

          }
        }

      });
    }
  }

  

  async ngOnInit() {
    // this.spinner.show();
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // await this.funcTest1();
    // await new Promise(resolve => setTimeout(resolve, 2000));
    // await this.funcTest2();
    // this.spinner.hide();

    // this.spinner.show();
    // const secondFunction = async () => {
    //   const result = await this.funcTest1();
    //   await this.funcTest2();
    //   this.spinner.hide();
    // }
    // secondFunction;

    await this.funcTest1();
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.spinner.hide();
  }


}