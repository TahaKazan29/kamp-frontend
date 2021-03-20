import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  productAddForm:FormGroup;
  constructor(private FormBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm()
  {
    this.productAddForm = this.FormBuilder.group({
      productName: ["",Validators.required],
      unitPrice:["",Validators.required],
      unitsInStock:["",Validators.required],
      categoryId:["",Validators.required]
    })
  }

  add(){
    if(this.productAddForm.valid)
    {
      let productModel = Object.assign({},this.productAddForm.value);
      this.productService.add(productModel).subscribe(response => {
        this.toastrService.success(response.message,"Başarılı");
      },responseError => {
        console.log(responseError)
        if(responseError.error.Errors.length > 0)
        {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
        }
      })
    }
    else {
      this.toastrService.error("Formunuz Eksik ya da Hatalı","Dikkat");
    }

  }

}
