import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
    constructor(private authSvc: AuthService ) { }

    ngOnInit(): void { }

    onExit(): void {
        this.authSvc.logout();
    }
}
