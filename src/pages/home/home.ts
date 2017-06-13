import { Component, OnInit } from '@angular/core';
//import { Validators, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { ServiceProvider } from '../../providers/service/service';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  cadastro: any = {};
  users: any[];
  nome: boolean = false;
  nomeTeste: string;
  email: string ="";
  constructor(public navCtrl: NavController,/*public formBuiler: FormBuilder,*/ public service: ServiceProvider, public alertCtrl: AlertController) {
    /*this.cadastro = this.formBuiler.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required]
    })*/
  }

  ngOnInit(){
      this.getData();
  }

  postDados(req){
    this.service.postData(req.value).subscribe(
      data=>console.log(data.message),
      err=>console.log(err)
    );
  }
  deletarPerfil(user){
    this.service.deleteData(user.id).subscribe(
      data=>{
        console.log(data.message);
        this.getData();
      },
      err=>console.log(err)
    );
  }

  editarPerfil(req) {
    let prompt = this.alertCtrl.create({
      title: 'Editar Perfil',
      inputs: [
        {
          name: 'nome',
          placeholder: 'nome',
		  value:req.nome
        },
        {
          name: 'email',
          placeholder: 'email',
		  value:req.email
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {}
        },
        {
          text: 'Salvar',
          handler: data => {
			  let params: any={
				  id: req.id,
				  nome: data.nome,
				  email: data.email
			  }
			  console.log(data);
			this.service.updateData(params).subscribe(
			  data=>{
					  console.log(data.message);
					  this.getData();
				  },
			  err=>console.log(err)
			);
          }
        }
      ]
    });
    prompt.present();
  }

  mostrarNome(){
    this.nome=!this.nome;
  }
  getData(){
    this.service.getData().subscribe(
      data => this.users = data,
      err =>console.log(err)
    );
  }
}
