import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'quill/dist/quill'
declare var require: any;

import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

export enum ReportPageSize {
  a4 = 842 / 595
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  htmlText: string = `<div>header</div><p>Testing</p>`
  pageSize = { width: 595, height: 842 };
  printSize = { width: 210, height: 297 };
  @ViewChild('container', { static: true }) quillEditorContainer: ElementRef | null = null;
  @ViewChild('.ql-toolbar', { static: false }) toolbar: ElementRef | null = null;

  toPdf() {
    // let pxToMm = 0.264583;
    // const dashboard = document.getElementById('section-to-print') as any;
    // console.log(dashboard.offsetHeight, this.pageSize.width)
    // const dashboardHeight = this.pageSize.height / this.pageSize.width * this.printSize.width;
    // const dashboardWidth = this.printSize.width;
    // console.log(dashboardHeight, dashboardWidth)
    // const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };

    // domtoimage.toPng(dashboard, options).then((imgData: any) => {
    //   const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', 'a4');
    //   doc.addImage(imgData, 'PNG', 0, 0, this.printSize.width, this.printSize.height);
    //   doc.save('angular-demo.pdf');
    //   //  const imgProps = doc.getImageProperties(imgData);
    //   //  const pdfWidth = doc.internal.pageSize.getWidth();
    //   //  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //   //  doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    //   //  doc.save('Dashboard for hyperpanels.pdf');
    // });
    let data = {
      employee: {
        name: 'john',
        age: 32,
        hobby: 'tennis'
      }
    }
    this.http.get("/assets/styles/quill.snow.css", { responseType: 'text' }).subscribe(styleString => {
      let htmlString = `${(document.getElementById('section-to-print') as any).innerHTML}`;
      var re = /\[[A-Za-z0-9\.]*\]/g;
      console.log(htmlString.match(re))
      let matches = htmlString.match(re);
      if (matches) {
        matches.forEach((attr: string) => {
          console.log(attr)
          htmlString = htmlString.replace(attr, eval(`data.` + attr.replace('[', '').replace(']', '')));
        });
      }
      htmlString = `<style>
      ${styleString} 
      </style>
      ` + htmlString;
      `<style>
      @media print {
        body {-webkit-print-color-adjust: exact;}
        body * {
          visibility: hidden;
        }
        #section-to-print, #section-to-print * {
          visibility: visible;
        }
        #section-to-print {
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      body {
        height: ${this.pageSize.height}px;
        width: ${this.pageSize.width}px;
        margin-left: auto;
        margin-right: auto;
      }
      </style>`
      var myWindow = window.open('', '', 'width=210,height=297') as any;
      myWindow.document.write(htmlString);

      myWindow.document.close();
      myWindow.focus();
      myWindow.print();
      // setTimeout(() => {
      //   myWindow.close();
      // }, 1500);
    });
  }
  atValues = [
    { id: 1, value: 'Fredrik Sundqvist', link: 'https://google.com' },
    { id: 2, value: 'Patrik Sjölin' }
  ];
  hashValues = [
    { id: 3, value: 'Fredrik Sundqvist 2' },
    { id: 4, value: 'Patrik Sjölin 2' }
  ]

  quillConfig = {
    //toolbar: '.toolbar',
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
      bindings: {
        // shiftEnter: {
        //   key: 13,
        //   shiftKey: true,
        //   handler: (range, context) => {
        //     // Handle shift+enter
        //     console.log("shift+enter")
        //   }
        // },
        enter: {
          key: 13,
          handler: (range: any, context: any) => {
            console.log("enter");
            return true;
          }
        }
      }
    }
  }

  pBreaks: number[] = [];

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

  constructor(
    private http: HttpClient
  ) {

  }


  onSelectionChanged = (event: any) => {
    if (event.oldRange == null) {
      this.onFocus();
    }
    if (event.range == null) {
      this.onBlur();
    }
  }

  onContentChanged = (event: any) => {
    //console.log(event.html);
  }

  onFocus = () => {
    console.log("On Focus");
  }
  onBlur = () => {
    console.log("Blurred");
  }
  export() {
    let textArea = document.createElement("textarea");
    textArea.value = this.htmlText;
    // 使text area不在viewport，同时设置不可见
    textArea.style.position = "absolute";
    textArea.style.opacity = '0';
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    new Promise((res, rej) => {
      // 执行复制命令并移除文本框
      document.execCommand('copy') ? res(null) : rej();
      textArea.remove();
    });
  }

}
