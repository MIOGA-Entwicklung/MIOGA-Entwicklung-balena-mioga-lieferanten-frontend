import {Component, Input, OnInit} from '@angular/core';
import {Contacts} from "../contact";
import {ContactServices} from "../contact.services";
import {ContactComponent} from "../contact.component";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-contacts-content',
  templateUrl: './contacts-content.component.html',
  styleUrls: ['./contacts-content.component.scss']
})
export class ContactsContentComponent implements OnInit {

  @Input()
  public contactsList: Contacts[] | undefined;
  public editContact: Contacts | undefined;
  Contactdefaultvalue = 'Ms';
  closeResult = '';
  deleteContact: Contacts;
  constructor(private contactService: ContactServices, private parent: ContactComponent, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }


  onDeleteContact(contactId: any) {
    this.parent.onDeleteContact(contactId)
  }

  onSubmitUpdateContact(updateContacted: Contacts) {
    console.log(updateContacted)
    this.parent.onUpdateContact(updateContacted)
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


  //open the Form

  openEditForm(contactEditForm: any, Currentcontact: any) {
    this.editContact = Currentcontact;
    this.modalService.open(contactEditForm, {ariaLabelledBy: 'editModelForm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  onShowDeleteQustion(deleteQuestionModel: any, Currentcontact: Contacts ) {
    this.deleteContact = Currentcontact
    this.modalService.open(deleteQuestionModel, {ariaLabelledBy: 'contactDeleteModelFormHeader'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
