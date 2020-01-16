import { Component, OnInit } from '@angular/core';
import { APP_CONFIG } from '../app.config';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
    private appConfig: any = APP_CONFIG;
    
    constructor() { }

    ngOnInit() {
    }

}
