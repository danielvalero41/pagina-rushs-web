import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  id
  cliente:Cliente = new Cliente()
  constructor(public auth: AngularFireAuth,private db: AngularFirestore) { }

  ngOnInit(): void {
    this.auth.user.subscribe((logeado)=>{
      let clientes:any[] = new Array<any>()
      if(logeado != null){
        this.id = logeado.uid          
        this.db.collection('clientes').valueChanges().subscribe((res)=>{
        clientes = res        
        this.cliente = clientes.find(obj => obj.Id == logeado.uid)          
        })        
      }//if                         
    })        
  }

  Salir(){
    this.auth.signOut();
  }

}
