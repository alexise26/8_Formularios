import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;
  usuario:Object ={
    nombrecompleto:{
      nombre:"Alexis",
      apellido:"Escalante"
    },
    email:"alexise26@gmail.com",
    pasatiempos:[
      "correr"
    ]
  }

  constructor() {
    this.forma= new FormGroup({
      'nombrecompleto': new FormGroup({

        'nombre': new FormControl('',   [Validators.required, Validators.minLength(3)]),
        'apellido': new FormControl('',[ Validators.required, this.noHerrera]),

      }),
        'email': new FormControl('',    [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")] ),
        'pasatiempos':new FormArray([
          new FormControl('Correr', Validators.required)
        ]),
        'username': new FormControl('',[Validators.required],this.existeusuario),
        'password1':new FormControl('', Validators.required),
        'password2':new FormControl( )
    })
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)//Le decimos quien es "this", en este caso es forma
    ])
    //this.forma.setValue(this.usuario);//Para cargar todos los valores en la forma

    // this.forma.valueChanges.subscribe(data=>{
    //   console.log(data)
    // }) Revisa toda la forma

    this.forma.controls['username'].valueChanges.subscribe(data=>{
      console.log(data)
    })
    this.forma.controls['username'].statusChanges.subscribe(data=>{
      console.log(data)
    })

  }

  guardarCambios(){
    console.log(this.forma.value);
    //this.forma.reset();
  }
  agregarPasatiempo(){
    console.log("hola");
    (<FormArray>this.forma.controls['pasatiempos']).push(new FormControl('', Validators.required));//Agregar nuevo control
  }

  noHerrera( control:FormControl):{[s:string]:boolean}{
    if (control.value === "herrera") {
        return {
          noherrera:true
        }
    }
    return null;
  }
  noIgual( control:FormControl):{[s:string]:boolean}{
    let forma:any = this;
    if (control.value !== forma.controls['password1'].value) {
        return {
          noiguales:true
        }
    }
    return null;
  }

  existeusuario(control:FormControl):Promise<any>|Observable<any>{

    let promesa = new Promise(
      (resolve,reject)=>{

          setTimeout(()=>{
            if (control.value === "alexise26") {
                resolve({existe:true})
            }else{
              resolve(null)
            }
          },3000
          )

        }
    )

    return promesa;
  }

}
