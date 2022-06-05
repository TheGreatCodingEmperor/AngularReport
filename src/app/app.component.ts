// import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import 'quill/dist/quill'
// declare var require: any;

// import { jsPDF } from 'jspdf';
// import domtoimage from 'dom-to-image';

// interface Quill {
//   getModule(moduleName: string):any;
// }

// interface BetterTableModule {
//   insertTable(rows: number, columns: number): void;
// }

// export enum ReportPageSize {
//   a4 = 842 / 595
// }


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class AppComponent {
//   htmlText: string = `<div>header</div><p>Testing</p>`
//   pageSize = { width: 595, height: 842 };
//   printSize = { width: 210, height: 297 };
//   quill!: Quill;
//   @ViewChild('container', { static: true }) quillEditorContainer: ElementRef | null = null;
//   @ViewChild('.ql-toolbar', { static: false }) toolbar: ElementRef | null = null;

//   private get tableModule(): BetterTableModule {
//     return this.quill.getModule("better-table");
//   }

//   public editorCreated(event: Quill): void {
//     this.quill = event;
//     console.log(this.quill)
//     // Example on how to add new table to editor
//     this.addNewtable();
//   }

//   addNewtable(): void {
//     this.tableModule.insertTable(3, 3);
//   }


//   toPdf() {
//     let data = {
//       employee: {
//         name: 'john',
//         age: 32,
//         hobby: 'tennis'
//       }
//     }
//     this.http.get("/assets/styles/quill.snow.css", { responseType: 'text' }).subscribe(styleString => {
//       let htmlString = `${(document.getElementById('section-to-print') as any).innerHTML}`;
//       var re = /\[[A-Za-z0-9\.]*\]/g;
//       console.log(htmlString.match(re))
//       let matches = htmlString.match(re);
//       if (matches) {
//         matches.forEach((attr: string) => {
//           console.log(attr)
//           htmlString = htmlString.replace(attr, eval(`data.` + attr.replace('[', '').replace(']', '')));
//         });
//       }
//       htmlString = `<style>
//       ${styleString} 
//       </style>
//       ` + htmlString;
//       `<style>
//       @media print {
//         body {-webkit-print-color-adjust: exact;}
//         body * {
//           visibility: hidden;
//         }
//         #section-to-print, #section-to-print * {
//           visibility: visible;
//         }
//         #section-to-print {
//           position: absolute;
//           left: 0;
//           top: 0;
//         }
//       }
//       body {
//         height: ${this.pageSize.height}px;
//         width: ${this.pageSize.width}px;
//         margin-left: auto;
//         margin-right: auto;
//       }
//       </style>`
//       var myWindow = window.open('', '', 'width=210,height=297') as any;
//       myWindow.document.write(htmlString);

//       myWindow.document.close();
//       myWindow.focus();
//       myWindow.print();
//       // setTimeout(() => {
//       //   myWindow.close();
//       // }, 1500);
//     });
//   }

//   atValues = [
//     { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
//     { id: 2, value: 'Patrik Sjölin' }
//   ];
//   hashValues = [
//     { id: 3, value: 'Fredrik Sundqvist 2' },
//     { id: 4, value: 'Patrik Sjölin 2' }
//   ]

//   // quillConfig = {
//   //   //toolbar: '.toolbar',
//   //   toolbar: {
//   //     container: [
//   //       ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//   //       ['code-block'],
//   //       [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//   //       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//   //       [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
//   //       [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
//   //       [{ 'direction': 'rtl' }],                         // text direction

//   //       [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//   //       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

//   //       [{ 'font': [] }],
//   //       [{ 'align': [] }],
//   //       [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

//   //       ['clean'],                                         // remove formatting button

//   //       ['link'],
//   //       ['link', 'image', 'video']
//   //     ],

//   //   },

//   //   keyboard: {
//   //     bindings: {
//   //       // shiftEnter: {
//   //       //   key: 13,
//   //       //   shiftKey: true,
//   //       //   handler: (range, context) => {
//   //       //     // Handle shift+enter
//   //       //     console.log("shift+enter")
//   //       //   }
//   //       // },
//   //       enter: {
//   //         key: 13,
//   //         handler: (range: any, context: any) => {
//   //           console.log("enter");
//   //           return true;
//   //         }
//   //       }
//   //     }
//   //   }
//   // }

//   pBreaks: number[] = [];

//   pageBreak() {
//     console.log(this.quillEditorContainer);
//     this.pBreaks = [];
//     let toolbarHeight = 0;
//     if (this.toolbar) {
//       toolbarHeight = this.toolbar.nativeElement.offsetHeight;
//     }
//     if (this.quillEditorContainer) {
//       console.log(this.quillEditorContainer.nativeElement.offsetHeight);
//       let element = this.quillEditorContainer.nativeElement;
//       let pbreak = ((element.offsetHeight - toolbarHeight)) / this.pageSize.height;
//       for (let i = 1; i < pbreak; i++) {
//         this.pBreaks.push(this.pageSize.height * i + toolbarHeight);
//       }
//     }
//   }

//   constructor(
//     private http: HttpClient
//   ) {

//   }


//   onSelectionChanged = (event: any) => {
//     if (event.oldRange == null) {
//       this.onFocus();
//     }
//     if (event.range == null) {
//       this.onBlur();
//     }
//   }

//   onContentChanged = (event: any) => {
//     //console.log(event.html);
//   }

//   onFocus = () => {
//     console.log("On Focus");
//   }
//   onBlur = () => {
//     console.log("Blurred");
//   }
//   export() {
//     let textArea = document.createElement("textarea");
//     textArea.value = this.htmlText;
//     // 使text area不在viewport，同时设置不可见
//     textArea.style.position = "absolute";
//     textArea.style.opacity = '0';
//     textArea.style.left = "-999999px";
//     textArea.style.top = "-999999px";
//     document.body.appendChild(textArea);
//     textArea.focus();
//     textArea.select();
//     new Promise((res, rej) => {
//       // 执行复制命令并移除文本框
//       document.execCommand('copy') ? res(null) : rej();
//       textArea.remove();
//     });
//   }

// }


import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone, Sanitizer, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import QuillBetterTable from 'quill-better-table';
declare var require: any
declare const Quill: any;
declare const quillBetterTable: any;

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private zone: NgZone,
    private http: HttpClient,
   private sanitizer: DomSanitizer
  ) {
  }

  @ViewChild('editable', { static: true }) editRef!: ElementRef;
  @ViewChild('container', { static: true }) quillEditorContainer: ElementRef | null = null;
  @ViewChild('.ql-toolbar', { static: false }) toolbar: ElementRef | null = null;

  quill: any;
  pBreaks: number[] = [];
  htmlText: string|SafeHtml = `<div>header2</div><p>Testing</p><div>123</div>`
  pageSize = { width: 595, height: 842 };
  printSize = { width: 210, height: 297 };

  ngOnInit() {
    setTimeout(() => {
      this.initEditor();
    }, 1000)
  }

  initEditor(): void {
    Quill.register({
      'modules/better-table': quillBetterTable
    }, true);
    // tslint:disable-next-line:no-unused-expression
    this.quill = new Quill(this.editRef.nativeElement, {
      theme: 'snow',
      modules: {
        table: false,
        'better-table': {
          operationMenu: {
            items: {
              unmergeCells: {
                text: 'Another unmerge cells name'
              }
            },
            color: {
              colors: ['green', 'red', 'yellow', 'blue', 'white'],
              text: 'Background Colors:'
            }
          }
        },
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['code-block'],
            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'font': [] }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

            ['clean'],                                         // remove formatting button

            ['link'],
            ['link', 'image', 'video']
          ],

        },
        keyboard: {
          bindings: quillBetterTable.keyboardBindings
        }
      }
    }
    );
    // const value = `<h1>New content here</h1>`
    // this.quill.clipboard.dangerouslyPasteHTML(this.htmlText);
    // this.quill.root.innerHTML = this.htmlText;
    // this.quill.container.firstChild.innerHTML = this.htmlText
    this.quill.clipboard.dangerouslyPasteHTML(0, 'Hello world!<br>This is a test paragraph');
    this.quill.on('text-change',  (delta: any, oldDelta: any, source: any) =>{
      this.pageBreak();
      this.htmlText = this.sanitizer.bypassSecurityTrustHtml(this.quill.root.innerHTML);
      // this.htmlText = this.quill.root.innerHTML;
    })
  }

  ngAfterViewInit() {

  }

  onInsertTable() {
    const tableModule = this.quill.getModule('better-table');
    tableModule.insertTable(3, 3);
  }

  pageBreak() {
    console.log(this.quillEditorContainer);
    this.pBreaks = [];
    let toolbarHeight = 0;
    if (this.toolbar) {
      toolbarHeight = this.toolbar.nativeElement.offsetHeight;
    }
    if (this.quillEditorContainer) {
      console.log(this.quillEditorContainer.nativeElement.offsetHeight);
      let element = this.quillEditorContainer.nativeElement;
      let pbreak = ((element.offsetHeight - toolbarHeight)) / this.pageSize.height;
      for (let i = 1; i < pbreak; i++) {
        this.pBreaks.push(this.pageSize.height * i + toolbarHeight);
      }
    }
  }
  toPdf() {
    let DATA: any = document.getElementById('section-to-print');
    let div = document.createElement('div');
    div.innerHTML = this.htmlText as string;
    console.log(div)

    html2canvas(DATA).then((canvas) => {
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, this.printSize.width, (DATA.offsetHeight/this.pageSize.width)*this.printSize.width);
      // PDF.save('angular-demo.pdf');
      var string = PDF.output('datauristring');
      var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
      var x = window.open() as any;
      x.document.open();
      x.document.write(embed);
      x.document.close();
    });
    console.log(this.quill.root.innerHTML)
  }
}