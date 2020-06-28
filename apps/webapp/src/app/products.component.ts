import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from './product/products.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html'
})

export class ProductsComponent implements OnInit, OnDestroy{
    productName = 'A Book';
    isDisabled=true;
    products = [];
    private productsSubscription: Subscription;

    constructor(private productsService: ProductsService) {
        setTimeout(() => {
            // this.productName = 'A Tree';
            this.isDisabled=false;

        }, 3000);
    }

    ngOnInit() : void {
        this.products = this.productsService.getProducts();
        this.productsService.productsUpdated.subscribe(()=>{
            this.products = this.productsService.getProducts();
        })
    }

    onAddProduct(form):void {
        if (form.valid){
            // this.products.push(form.value.productName);
            this.productsService.addProduct(form.value.productName);
        }
    }

    onRemoveProduct(productName: string):void {
        // Important: productName
        // !== meaning is 'remove'
        this.products = this.products.filter(p => p !== productName);
    }

    ngOnDestroy() : void{
        this.productsSubscription.unsubscribe();
    }
}

