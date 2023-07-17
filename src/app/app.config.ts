import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
@Injectable()
export class AppConfig {

    // private config: Object = null;
    // private env: Object = null;

    constructor(private http: HttpClient) {


    }

    /**
     * Use to get the data found in the second file (config file)
     */
    /**
     * Use to get the host
     */

    // localhost
    public getHost() {
      return 'http://localhost:5264/api';
  }

    /**
     * Use to get the data found in the first file (env file)
     */
    // public getEnv(key: any) {
    //     return this.env[key];
    // }

    /**
     * This method:
     *   a) Loads "env.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[env].json" to get all env's variables (e.g.: 'config.development.json')
     */
    public load() {
        // return new Promise((resolve, reject) => {
            // debugger;
            // let request2: any = null;
            // request2 = this.http.get('/assets/env.json').map((res: Response) => res.json()).subscribe(r => {
            //     let request3: any = null;
            //     request3 = r;
            // });
            // this.http.get('../assets/env.json').map((res: Response) => res.json()).catch((error: any): any => {
            //     console.log('Configuration file "env.json" could not be read');
            //     resolve(true);
            //     return Observable.throw(error.json || 'Server error');
            // }).subscribe(envResponse => {
            //     this.env = envResponse;
            //     let request: any = null;
            //     // request = this.http.get('../assets');
            //    request = this.http.get('../assets/config.development.json');

            //     // switch (envResponse.env) {
            //     //     case 'production': {
            //     //         request = this.http.get('/assets/config.' + envResponse.env + '.json');
            //     //     } break;

            //     //     case 'development': {
            //     //         request = this.http.get('/assets/config.' + envResponse.env + '.json');
            //     //     } break;

            //     //     case 'default': {
            //     //         console.error('Environment file is not set or invalid');
            //     //         resolve(true);
            //     //     } break;
            //     // };
            //     if (request) {
            //         request.map((res: Response) => res.json())
            //             .catch((error: any) => {
            //                 console.error('Error reading development configuration file');
            //                 resolve(error);
            //                 return Observable.throw(error.json().error || 'Server error');
            //             })
            //             .subscribe((responseData) => {
            //                 this.config = responseData;
            //                 resolve(true);
            //             });
            //     } else {
            //         console.error('Env config file "env.json" is not valid');
            //         resolve(true);
            //     }
            // });

        // });
    }
}
