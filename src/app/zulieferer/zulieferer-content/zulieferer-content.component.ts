import {Component, Input, OnInit} from '@angular/core';
import {ZuliefererServices} from "../zulieferer.services";
import {ZuliefererComponent} from "../zulieferer.component";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Zulieferer} from "../entites/zulieferer";
import {Contacts} from "../../contact/contact";

@Component({
  selector: 'app-zulieferer-content',
  templateUrl: './zulieferer-content.component.html',
  styleUrls: ['./zulieferer-content.component.scss']
})
export class ZuliefererContentComponent implements OnInit {

  @Input()
  public ZuliefererList: Zulieferer[];

  @Input()
  public zuliefercontactList: Contacts[];

  public deleteZulieferer: Zulieferer;

  public editZulieferer: Zulieferer;

  Contactdefaultvalue = 'Ms';
  closeResult = '';


  zuliefererDescription : Zulieferer;

  constructor(private zuliefererService: ZuliefererServices, private parent: ZuliefererComponent, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }


  onShowDeleteQustion(deleteQuestionModel: any, currentZulieferer: any) {
    this.deleteZulieferer = currentZulieferer
    this.modalService.open(deleteQuestionModel, {ariaLabelledBy: 'zuLiefererDeleteModelFormHeader'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  onDeleteZulieferer(zuliefererId: any) {
    this.parent.onDeleteZulieferer(zuliefererId)
  }


  onSubmitUpdateZulieferer(updateZulieferer: Zulieferer) {
    console.log(updateZulieferer)
    this.parent.onUpdateZulieferer(updateZulieferer)
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
  openEditForm(zuliefererEditForm: any, CurrentZulieferer: any) {
    this.editZulieferer = CurrentZulieferer;
    this.modalService.open(zuliefererEditForm, {ariaLabelledBy: 'editModelForm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  onShowZuliefererContacts(ShowZuliefererContactsModal: any, zulieferer) {
    this.parent.getZuliefererContacts(zulieferer);
    this.modalService.open(ShowZuliefererContactsModal, {ariaLabelledBy: 'zulieferkontakteHeader'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  onShowDescription(showDescriptionsModal: any, zulieferer) {
    this.zuliefererDescription = zulieferer;
    this.modalService.open(showDescriptionsModal, {ariaLabelledBy: 'showDescriptionHeader'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
}
