import { Component, Inject, Injectable, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { CreateCv } from 'src/shared/createcv.model';
import { CreateCvService } from 'src/shared/createcv.service';
import * as htmlToImage from 'html-to-image';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
	constructor(public service: CreateCvService, public router: Router) { };
	data: CreateCv[];
	cvdata: CreateCv;
  page: number = 1;
  isData = false;
	closeResult = '';
	ngOnInit(): void {
    this.service.getCV().subscribe(data => {
      this.data = data;
      if (this.data.length > 0 && this.data != null) {
        this.isData = true;
      }
      /*console.log(this.data);*/
    });
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

	download() {
		htmlToImage.toPng(document.getElementById('cv'))
			.then(function (dataUrl) {

				let pdf = new jsPDF('p', 'px', 'a4');
				pdf.addImage(dataUrl, 'PNG', 0, 0, 446, 653);
				pdf.save('mycv.pdf');

			});
		console.log(this.data);
	}

	open(id: number) {
		this.router.navigate(['/profile/resumeview/' + id]);
  }  
}

