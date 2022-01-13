import {Component, OnInit} from '@angular/core';
import {Zulieferer} from "./zulieferer";
import {HttpErrorResponse} from "@angular/common/http";
import {ZuliefererServices} from "./zulieferer.services";
import {Contacts} from "../contact/contact";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-zulieferer',
  templateUrl: './zulieferer.component.html',
  styleUrls: ['./zulieferer.component.scss'],
})

export class ZuliefererComponent implements OnInit {

  zulieferer: Zulieferer[] = [];
  miogazulieferer: Zulieferer[] = [];
  emkZulieferer: Zulieferer[];




  zuliefercontactList: Contacts[] = [];
  deleteZulieferer: Zulieferer;
  showZuliefererContact: Zulieferer;

  defaulttilte = "Ms";
  belongsTo = "Mioga";
  control = false;
  closeResult = '';

  value = 3;

  zuliefererForm = this.fromBuilder.group({
    'title': ['', Validators.required],
    'link' :[''],
    'description': ['',],
    'belongsTo': ['MIOGA', Validators.required],

    'ZuliefererUser' : this.fromBuilder.group({
        'username': [''],
        'password': [''],
        'CustomerNumber' :[''],
        'email': ['']
      }),
    contacts: this.fromBuilder.array([])
  })


  constructor(private zuliefererServices: ZuliefererServices, private fromBuilder: FormBuilder, private modalService: NgbModal
  ) {
  }


  get contacts() {
    return this.zuliefererForm.controls["contacts"] as FormArray
  }

  get ZuliefererUser() {
    return this.zuliefererForm.controls["ZuliefererUser"] as FormGroup
  }


  get contactLenth() {
    return this.contacts.length
  }

  AddContact() {
    const contactForm = this.fromBuilder.group({
      'title': ['Ms', Validators.required],
      'description': [''],
      'company': ['', Validators.required],
      'vorname': [''],
      'name': ['', Validators.required],
      'telefone': ['',],
      'mobile': [''],
      'email': ['', Validators.required, Validators.email],
      'anmerkung': ['']

    })
    this.contacts.push(contactForm);
  }

  deleteContact(ContactFromIndex: number) {
    this.contacts.removeAt(ContactFromIndex)
  }

  onAddzulieferer(): void {
    console.log(JSON.stringify(this.zuliefererForm.value))
    this.zuliefererServices.createZulieferer(this.zuliefererForm.value).subscribe(
      (response: Zulieferer) => {
        console.log(response);
        alert('Neue Zulieferer ' + response.title + ' hinzugefügt')
        this.getZulieferer();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },
    )
    console.log(this.control)
    this.zuliefererForm.reset()
  }


  ngOnInit(): void {
    this.getZulieferer()
  }

  //get all Zulieferer


  public getZulieferer(): void {
    this.zuliefererServices.getAll().subscribe((receivedData) => (
      this.zulieferer = receivedData)
    );

    //get Mioga Zulieferer
    this.zuliefererServices.getMiogaZuLieferer().subscribe((receivedData) => (
      this.miogazulieferer = receivedData)
    );

    //get EMK Zulieferer
    this.zuliefererServices.getEmkZulieferer().subscribe((receivedData) => (
      this.emkZulieferer = receivedData)
    );
  }

  public getZuliefererContacts(zulieferer: any): void {

    this.showZuliefererContact = zulieferer;
    console.log("Zulieferer ID " + zulieferer.id)

    this.zuliefererServices.getZuliefererContactsById(zulieferer.id).subscribe((receivedData) => (
      this.zuliefercontactList = receivedData)
    );
  }

  public onUpdateZulieferer(updateZulieferer: Zulieferer): void {
    this.zuliefererServices.updateZulieferer(updateZulieferer).subscribe(
      (response: Zulieferer) => {
        console.log(response);
        this.getZulieferer();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteZulieferer(zulieferId: any): void {
    this.zuliefererServices.deleteZulieferer(zulieferId).subscribe(
      (response: void) => {
        console.log(response);
        this.getZulieferer();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openAddZuliefererForm(contact: any) {
    this.modalService.open(contact, {ariaLabelledBy: 'addModelForm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  switchToMioga() {
    this.value = 2
  }
  switchToEmk() {
    this.value = 3
  }
  switchToAll() {
    this.value = 1
  }
}
