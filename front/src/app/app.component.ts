import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'; //HTTP CLIENT
import { Products } from './products.model';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:true,
  imports:   
 [RouterOutlet, CommonModule]
})
export class AppComponent implements OnInit{
  title = 'front';
  products: Products[] = [];
    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient) {}

  ngOnInit(): void {
  
    this.http.get<{products: Products[]}>('http://localhost:3000/api/products')
      .subscribe({

        next: (response) => {
          this.products = response.products;
          console.log('Received data:', this.products);
        },
        error: (error) => {
          console.error('Error fetching data:', error);
        }
      });
  }

}