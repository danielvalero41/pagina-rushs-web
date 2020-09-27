import { Component, TemplateRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MessagingService } from './service/messaging.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  message 
  formulario:FormGroup
  formulario_registro:FormGroup
  referencia_modal: BsModalRef
  constructor(public auth: AngularFireAuth,
              private messagingService: MessagingService, 
              public fb:FormBuilder,              
              private modalService: BsModalService,
              private db: AngularFirestore) {
  }
  
  ngOnInit(){
    
    this.messagingService.requestPermission()
    this.messagingService.receiveMessage()
    this.message = this.messagingService.currentMessage
    
    this.formulario = this.fb.group({
      correo: ['',Validators.required],
      password: ['',Validators.required]
    })

    this.formulario_registro = this.fb.group({
      correo: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  login() {
    this.auth.signInWithEmailAndPassword(this.formulario.value.correo,this.formulario.value.password)        
  }
  
  logout() {
    this.auth.signOut();
  }

  abrirModal(template: TemplateRef<any>) {
    this.referencia_modal = this.modalService.show(template);
  }

  Registrarse(){

    if(this.formulario_registro.valid){      
      this.auth.createUserWithEmailAndPassword(this.formulario_registro.value.correo,this.formulario_registro.value.password)
      .then((logeado)=>{
        let id = logeado.user.uid
        this.db.collection('clientes').add({
          Id: id,
          nombre: '',
          apellido: '',
          correo_electronico: this.formulario_registro.value.correo,
          telefono: '',
          genero: '',
          direccion: '',
          saldo: 0
        })
        this.formulario_registro.reset()
        this.auth.signOut();
      })
    }//if
  }//Registrarse
}
