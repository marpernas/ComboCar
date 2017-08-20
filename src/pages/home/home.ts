import { Component,OnInit } from '@angular/core';
// importanto novo componente
import { NavController,LoadingController,AlertController } from 'ionic-angular';
// importando a classe do serviço
import {Http} from '@angular/http';
// não podemos esquecer de importar!!!
import { EscolhaPage } from '../escolha/escolha';
import { Carro } from "../../domain/carro/carro";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  public carros: Carro[];

   constructor(
    public navCtrl: NavController, 
    private _http: Http,
    private _loadingCTRL: LoadingController,
    private _alertCTRL: AlertController) {}

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    let loader = this._loadingCTRL.create({
      content: "Buscando novos carros...Aguarde",
    });
    
    loader.present(); // para exibir o loader que acabamos de construir

    this._http
      .get('https://aluracar.herokuapp.com')
      .map(res => res.json())
      .toPromise() 
      .then(carros => {
        this.carros = carros
        loader.dismiss();
      })

      .catch(err =>{
        // boa pratica para o erro
        console.log(err);
        loader.dismiss();

        let alert = this._alertCTRL.create({
          title: 'Falha na conexão',
          buttons: [{text: 'Estou ciente'}],
          subTitle: 'Não foi possivel obter a lista de carro. Tente mais tarde.'
        }).present();
      });
  }
  
  seleciona(carro) {

    // realizando a navegação adicionando `Escolha` na pilha!
    this.navCtrl.push(EscolhaPage, { carroSelecionado: carro });
  }

}
