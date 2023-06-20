import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/shared/services/api.service';
import { ElementComponent } from 'src/app/shared/components/element/element.component';
import { CrudPanelComponent } from 'src/app/shared/components/crud-panel/crud-panel.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, ElementComponent, CrudPanelComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  elements = signal([]);
  private router =  inject(Router);

  private _apiService = inject(ApiService);

  ngOnInit(): void {
    this.getAllElements(
      () => {
        this.checkUpdates();
        this.checkDeletes();
        this.checkAdds();
      }
    );
  }

  addElement = () => {
    let elements = this.elements();
    console.log(elements[0]);
    
    this._apiService.addNewProduct(elements[0]).subscribe({
      next: res => {
        elements = elements.reverse()
        elements.push(res as never);
        elements = elements.reverse();
        let adds = JSON.parse(localStorage.getItem('adds')??'[]');
        adds.push(res);
        localStorage.setItem('adds',JSON.stringify(adds));
      },
      error: err => {
        alert('Algo salió mal, vuelva a intentarlo más tarde.');
        console.error('Algo salió mal, vuelva a intentarlo más tarde. ', err);
      }
    });
  }

  resetElements = ()=>{
    localStorage.removeItem('updates');
    localStorage.removeItem('deletes');
    localStorage.removeItem('adds');
    this.getAllElements();
  }

  getAllElements(next: Function = ()=>{}): void {
    this._apiService.getAllProducts().subscribe({
      next: res => {
        this.elements.set(res);
        next();
      },
      error: err => {
        alert('Algo salió mal, vuelva a intentarlo más tarde.');
        console.error('Algo salió mal, vuelva a intentarlo más tarde. ', err);
      }
    });
  }

  checkDeletes(): void {
    let deletes = localStorage.getItem('deletes') ?? [];
    this.elements.set(this.elements().filter(
      (element) => !deletes.includes(element['id'])
    ));
  }

  checkUpdates(): void {
    let updates = JSON.parse(localStorage.getItem('updates') ?? '[]');
    let elements = this.elements();
    updates.filter(
      (item: never) => {
        this.elements().some((element) => {
          if (element['id'] == item['id']) {
            elements[elements.indexOf(element)] = item;
          }
        });
      }
    );
  }

  checkAdds(): void {
    let adds = JSON.parse(localStorage.getItem('adds')??'[]');
    let elements = this.elements();
    elements = elements.reverse();
    adds.forEach((item:any)=>{
      elements.push(item as never);
    });
    elements = elements.reverse();
    this.elements.set(elements);
  }

  logout = ()=>{
    this._apiService.logout(this.router);
  }
}
