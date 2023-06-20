import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterModule } from '@angular/router';
import { CrudPanelComponent } from 'src/app/shared/components/crud-panel/crud-panel.component';

@Component({
  selector: 'app-single-view-page',
  standalone: true,
  imports: [CommonModule, RouterModule, CrudPanelComponent],
  templateUrl: './single-view-page.component.html',
  styleUrls: ['./single-view-page.component.css']
})
export class SingleViewPageComponent implements OnInit {
  private _apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private id: any;
  private deletes: Array<number> = [];
  private updates: Array<any> = [];
  
  data = signal({
    id:0,
    title: 'Article Title',
    category: 'some category',
    price: 0.00,
    rating: {
      rate: 0,
      count: 0
    },
    description: 'some description',
    image: 'https://cdn-icons-png.flaticon.com/512/1088/1088537.png'
  });

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (!params['id']) {
          this.router.navigate(['/', 'home']);
          return;
        }
        this.id = params['id']
        this.getElement(this.id, ()=>{
          this.checkUpdate();
        });
      }
    );
  }

  getElement(id: number, next: Function = ()=>{}): void {
    this._apiService.getProduct(id).subscribe({
      next: res => {
        this.data.set(res);
        next();
      },
      error: err => {
        alert('Algo salió mal, vuelva a intentarlo más tarde.');
        console.error('Algo salió mal, vuelva a intentarlo más tarde. ', err);
      }
    });
  }

  updateElement = () => {
    const { rating } = this.data();
    const body = {
      title: 'Some Title',
      price: 150.00,
      description: 'This is a test description',
      image: 'https://m.media-amazon.com/images/I/61b5L9WATpL._AC_SX679_.jpg',
      category: 'some category'
    };
    this._apiService.updateProduct(this.id, body).subscribe({
      next: res => {
        res['rating'] = rating;
        this.data.set(res);
        this.updates = JSON.parse(localStorage.getItem('updates') ?? '[]');
        this.updates.push(res);
        localStorage.setItem('updates', JSON.stringify(this.updates));
      },
      error: err => {
        alert('Algo salió mal, vuelva a intentarlo más tarde.');
        console.error('Algo salió mal, vuelva a intentarlo más tarde. ', err);
      }
    });
  }

  deleteElement = () => {
    this._apiService.deleteProduct(this.id).subscribe({
      next: res => {
        if (!res.title) {
          alert('Algo salió mal, vuelva a intentarlo más tarde.');
          console.error(`Algo salió mal, vuelva a intentarlo más tarde.`, res);
          return;
        }
        alert(`Se ha eliminado el producto con el id: ${this.id}`);
        this.deletes = JSON.parse(localStorage.getItem('deletes') ?? '[]');
        this.deletes.push(this.id);
        localStorage.setItem('deletes', JSON.stringify(this.deletes));
        this.router.navigate(['/', 'home']);
      },
      error: err => {
        alert('Algo salió mal, vuelva a intentarlo más tarde.');
        console.error(`Algo salió mal, vuelva a intentarlo más tarde.`, err);
      }
    });
  }

  checkUpdate(): void {
    let updates = JSON.parse(localStorage.getItem('updates') ?? '[]');
    updates.some(
      (item:any)=>{
        if(item.id == this.data().id) {
          this.data.set(item);
        }
      }
    );
  }
}
