import { Injectable } from '@angular/core';

@Injectable()
export class PatternsService {
public Alphanumeric: string;
public Number: string;
public Year: string;
public Text: string;
public UserName: string;
public phone_number: string;
public Password: string;
public Email: string;

public Decimal: string;
constructor() {
this.Number = '^[0-9]+$';
this.Alphanumeric =
'^([\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\\s&]|[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z\\s-_\.&()"]|[0-9\\s])*$';
this.Text = '^([0-9]|[a-z]|[A-Z]|\/|\\){1,50}$';
this.Year = '^[1-2][0-9]{3}$';
this.Decimal = '^[0-9]{1,7}(?:.[0-9]{1,20})?$';
this.phone_number = '^[1][0-9]{9}$';
this.UserName = '[a-zA-Z0-9\\-._]{1,50}';
this.Password = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$';
this.Email = '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';

}
}
