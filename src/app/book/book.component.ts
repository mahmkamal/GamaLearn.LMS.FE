import { AfterViewInit, Component, TemplateRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import * as $ from 'jquery';
// import 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { PatternsService } from '../shared/patterns.service';
import { slideToTop } from '../shared/router.animations';
import Swal from 'sweetalert2';
import { isNgTemplate } from '@angular/compiler';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BookService } from '../shared/services/book.service';
import { Book } from '../shared/services/book.model';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  animations: [slideToTop()]
})
export class BookComponent implements OnInit, AfterViewInit, OnDestroy {
  // datatable: any;
  //dtOptions: DataTables.Settings = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement: any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  changePass: boolean = false;
  list: Book[] = [];
  operation = 'view';
  errorMessage = ''
  item = new Book();
  dropdownSettings: IDropdownSettings = {};
  book = new Book();
  dateTo = new Date();
  changeStatus = { id: 0, status: false }
  constructor(public patterns: PatternsService, private toastr: ToastrService, private BookApi: BookService) {
  }
  refreshDataSource(list: any): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.list = list;
      this.dtTrigger.next(void 0);
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(void 0);
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.state.clear();
    });
  }
  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.dtOptions = {
      pagingType: 'full_numbers',
      stateSave: true,
      processing: true,
      pageLength: 5,
      searching: true,
      lengthMenu: [5, 10, 15, 25, 50]
    };
    this.getAllBooks();

  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  OnDeSelect(event : any) { }
  OnSelect(event : any) { }
  getAllBooks() {
    this.BookApi.getAll().subscribe(result => {
      console.log(result);
      this.list = result;
      this.refreshDataSource(result);
    },
    (error: any) => this.toastr.error('', 'SomeThing Went Wrong, Please Check Connection Or Contact Admin', error)
    );
  }
  open(_item: any) {
    this.operation = _item == null ? 'add' : 'edit';
    switch (this.operation) {
      case 'add':
        this.item = new Book();
        break;
      case 'edit':
        this.item = Object.assign({}, _item);
        this.changePass = false;
        this.BookApi.getById(_item.id).subscribe(book => {
          this.item = book;
        },
        (error: any) => this.toastr.error('', 'Some Thing Went Wrong, Please Check Connection Or Contact Admin', error)
        )
        break;
    }
  };
  save() {
    this.item.isActive = true;
    this.applySave(this.item);
  };
  delete(_item: any, index : any) {
    _item.isActive = false;
    debugger

    this.BookApi.save(_item).subscribe(result => {
      debugger
      Swal.fire({
        text: 'Deleted Successfully',
        icon: 'success',
      });
      this.list.splice(index, 1);
      this.refreshDataSource(this.list);
    },
    (error: any) => this.toastr.error('', 'Some Thing Went Wrong, Please Check Connection Or Contact Admin', error));
  };
  back() {
    if (this.operation !== 'view') {
      this.item = new Book();
      this.operation = 'view';
    }
  };
  private applySave(item : any) {
    item.creationUser = 1;
    this.book = item;
    this.BookApi.save(this.book).subscribe(result => {

      const filterResult = this.list.filter(function (element, index, array) {
        return element['id'] === result.id;
      });
      if (filterResult.length > 0) {
        const index: number = this.list.indexOf(filterResult[0]);
        if (!result.isActive) {
          this.toastr.success(result['nam'] + ' Book' + ' Was Deleted', 'Deleted Successfully');
          this.getAllBooks();
          this.list.splice(index, 1);
          this.refreshDataSource(this.list);
        } else {
          this.list[index] = result;
          this.toastr.info(result['name'] + ' Book' + ' Was Updated', 'Updated Successfully');
          this.item = new Book();
        }
      } else {
        Swal.fire({
          title: result['name'],
          text: 'Created Successfully',
          icon: 'success',
        });
        this.list.push(result);
        this.refreshDataSource(this.list);
        /// ore calling below fn
        // this.getAllBooks();
      }
    },
    (error: any) => this.toastr.error('', 'Some Thing Went Wrong, Please Check Connection Or Contact Admin', error)
    );
    this.operation = 'view';
    

  }
}
