// src/pages/escolha/escolha.ts

import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';

// importando a classe
import { Acessorio } from '../../domain/carro/acessorio';
import { Carro } from '../../domain/carro/carro';
import { CadastroPage } from '../cadastro/cadastro';



@Component({
  templateUrl: 'escolha.html'
})
export class EscolhaPage {

  public carro: Carro;
  public acessorios: Acessorio[];
  private _precoTotal: number = 0;

  constructor(public navParams: NavParams,public navCtrl:NavController) {

    this.carro = navParams.get('carroSelecionado');
    this._precoTotal = this.carro.preco; // o preço total começa com o preço do carro
    this.acessorios = [
      new Acessorio('Freio ABS', 800),
      new Acessorio('Ar-condicionado', 1000),
      new Acessorio('MP3 Player', 500)
    ];
  }

  get precoTotal() {
    return this._precoTotal;
  }

  atualizaTotal(ligado: boolean, acessorio: Acessorio) {
    ligado ?
      this._precoTotal += acessorio.preco :
      this._precoTotal -= acessorio.preco;
  }

  avancaNoAgendamento() {

        this.navCtrl.push(CadastroPage, {
            carro: this.carro, 
            precoTotal: this._precoTotal
        });
    }    
}