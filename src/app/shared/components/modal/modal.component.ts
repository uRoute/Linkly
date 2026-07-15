import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit ,AfterViewInit{

  isRequ:boolean = false

  @ViewChild('closeBnt') closeBtn!:ElementRef <HTMLButtonElement>
  @ViewChild('modal') modal!:ElementRef <HTMLElement>




  ngOnInit(){
    
  }
  ngAfterViewInit(): void {

  }


  openModal(){
    this.modal.nativeElement.classList.toggle('hidden')
  }

  closeModal(){
    this.modal.nativeElement.classList.toggle('hidden')
  }

}
