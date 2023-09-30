import { Component, OnInit } from '@angular/core';
import {ClientControllerService, ClientDto, ItemDto} from '../../../api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {RxwebValidators} from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {
  public formClient: FormGroup;
  private edit = false;

  // tslint:disable-next-line:new-parens
  public client: ClientDto = new class implements ClientDto {
    adress: string;
    cpf: string;
    fone: string;
    id: number;
    name: string;
    rg: string;
  };

  constructor(
    private clientService: ClientControllerService,
    private formBuilder: FormBuilder,
    private mensageSnack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.formBuild();
    this.route.params.subscribe(params => {
        if (params.id !== undefined) {
            this.edit = true;
            this.clientService.findByIdUsingGET1(params.id).subscribe((res: ClientDto) => {
              this.client = res;
              this.formBuild();
              console.log(res);
            });
        }
    });
  }
  public isEdit(): boolean {
    return this.edit;
  }
  formBuild() {
    this.formClient = this.formBuilder.group({
      id: [this.client.id],
      name: [this.client.name, Validators.compose([
        RxwebValidators.required()
      ])],
      rg: [this.client.rg, Validators.compose([
        RxwebValidators.required()
      ])],
      cpf: [this.client.cpf, Validators.compose([
        RxwebValidators.required()
      ])],
      adress: [this.client.adress, Validators.compose([
        RxwebValidators.required()
      ])],
      fone: [this.client.fone, Validators.compose([
        RxwebValidators.required()
      ])],
    });
  }

  setClient() {
    this.client.id = null;
    this.client.name = this.formClient.value.name;
    this.client.rg = this.formClient.value.rg;
    this.client.cpf = this.formClient.value.cpf;
    this.client.adress = this.formClient.value.adress;
    this.client.fone = this.formClient.value.fone;
  }
  public save() {
    this.setClient();
    console.log(this.client);
    this.clientService.createUsingPOST1(this.client)
      .subscribe(() => {
          this.router.navigate(['/client/list']);
          this.mensageSnack.open('Cliente cadastrado com sucesso!', null, {
            duration: 3000
          });
          this.formClient.reset();
        }, err => {
          this.mensageSnack.open(err.error.message, null, {
            duration: 3000
          });
        }
      );
  }

  public update() {
    this.setClientToSave();
    if (this.formClient.valid) {
      this.clientService.updateUsingPUT1(this.client).subscribe(res => {
        this.client = res;
        this.router.navigate(['/client/list']);
        this.mensageSnack.open('Client Atualizado Com Sucesso!', null, {
          duration: 3000
        });
      }, err => {
        this.mensageSnack.open(err.error.message, null, {
          duration: 3000
        });
      });
    } else {
      this.launchInvalidFormMessage();
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formClient.get(controlName).hasError(errorName);
  }
  private launchInvalidFormMessage() {
    this.mensageSnack.open('Formulário inválido', null, {
      duration: 3000
    });
  }

  setClientToSave() {
    this.client.name = this.formClient.get('name').value;
    this.client.rg = this.formClient.get('rg').value;
    this.client.cpf = this.formClient.get('cpf').value;
    this.client.adress = this.formClient.get('adress').value;
    this.client.fone = this.formClient.get('fone').value;
  }
}
