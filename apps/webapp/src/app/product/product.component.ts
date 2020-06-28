import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ProductsService} from './products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() productName: string;
  @Output() productClicked = new EventEmitter();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  // Output clicked value to other file
  onClicked() : void {
    // this.productClicked.emit();
    this.productsService.deleteProduct(this.productName);
  }
}
