import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ILicense, IUser} from "@gitcode/data";
import {takeUntil} from "rxjs/operators";
import {AuthService} from "../../../../services/auth.service";
import {Subject} from "rxjs";
import {GitHubService} from "../../../../services/github.service";

@Component({
  selector: 'gitcode-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  public user: IUser;
  private _unsubscribeAll: Subject<any>;
  // public license: ILicense;
  public ownerName: string;

  constructor(
      private _router: Router,
      private authService: AuthService,
      private gitHubService: GitHubService,


  )
  {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.authService.user$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((user: IUser) => {
          this.user = user;
          if(!user) return;
          const replaceName = (user.email) ? user.email.split('@')[0] : null;
          this.user.displayName = (this.user.displayName) ? this.user.displayName : replaceName;
        });
  }

}
