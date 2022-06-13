import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  currentOrientation = 'vertical';
  color = "#f9c957"
  cardDetails = [
    {
      "id": 1,
      "holderName": "John Joe", "number": "**** **** **** 5454", "expiryMonth": "12", "expiryYear": "24", "status": "active"
    },
    {
      "id": 2,
      "holderName": "Carry Minati", "number": "**** **** **** 5656", "expiryMonth": "9", "expiryYear": "25", "status": "inactive"
    },
    {
      "id": 3,
      "holderName": "Developor", "number": "**** **** **** 5757", "expiryMonth": "9", "expiryYear": "25", "status": "inactive"
    }
  ]
  constructor() { }

  ngOnInit() {
  }
  selectCard(id) {
    this.cardDetails.forEach(element => {
      if (element.id == id) {
        element.status = 'active'
      } else {
        element.status = 'inactive'
      }

    });
  }
}
