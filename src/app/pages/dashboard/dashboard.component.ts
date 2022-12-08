import { Component, EventEmitter, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { NbDialogService, NbThemeService } from '@nebular/theme';
import { CalenderComponent } from './calender/calender.component';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  NbDialogRef = null;

  @Output() countChanged: EventEmitter<any> = new EventEmitter();
  constructor(
    private dialogService: NbDialogService,
  ) { }

  events: any =
    [
      {
        title: "DIWALI",
        start: "2022-11-21",
        end: "2022-11-30", background: "linear-gradient(90deg, pink 80%, cyan 0%)"
      },
      { title: 'absent', date: '2022-11-09', color: '#ff00ff' },
      { title: 'aaaabsent', date: '2022-11-09', color: '#ff00ff' },
      { title: 'vvvvv', date: '2022-11-08', color: '#ff00ff' },
      { title: 'wwwww', date: '2022-11-08', color: '#ff00ff' },
      { title: 'Present', date: '2022-11-07', color: '#0000ff' },
    ]

  PresentDay: number = 0;
  AbsentDay: number = 0;

  ngOnInit(): void {
    this.events.forEach((e: { [x: string]: string; }) => {
      if (e["title"] == 'Present') {
        this.PresentDay++;
      } else {
        this.AbsentDay++;
      }
    })
  }

  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dayMaxEvents: true,
  //   height:700,
  //   headerToolbar: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'dayGridMonth,dayGridWeek,dayGridDay listDay',
  //   },
  //   views: {
  //     listDay: { buttonText: 'list day' },
  //     listWeek: { buttonText: 'list week' },
  //     listMonth: { buttonText: 'list month' }
  //   },
  //   dateClick: this.handleDateClick.bind(this), // bind is important!
  //   events: this.events,
  //   eventDidMount: function (info) {
  //     if (info.event.extendedProps.background) {
  //       info.el.style.background = info.event.extendedProps.background;
  //     }
  //   },
  // };

  calendarOptions: CalendarOptions = {
    timeZone: 'UTC',
    themeSystem: 'bootstrap5',
    height: 700,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth'
    },
    dateClick: this.handleDateClick.bind(this),
    weekNumbers: true,
    dayMaxEvents: true, // allow "more" link when too many events
    events: this.events,
  }

  handleDateClick(arg) {
    this.NbDialogRef = this.dialogService.open(
      CalenderComponent,
      {
        context: {
          EventDate: arg.dateStr
        },
        closeOnBackdropClick: false,
      }).onClose.subscribe((data) => {
        if (data != null) {
          this.events.push(data);
        }
      }
      )
   }
  demo() {
    pdfFonts.fonts = {
      demo: {
        normal: 'https://endlos.in/font/TESLA.woff',
      },
    }

    let OfferLetter = {
      watermark:
      {

        text: 'ENDLOS',
        opacity: 0.2,
        bold: true,
        italics: false,
        fontSize: 150,
      },
      content: [
        {
          margin: [0, 0, 0, 20],
          columns: [
            {
              width: '100%',
              columns: [
                [
                  { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
                ]
              ]
            },
          ],

        },
        {
          text: 'OFFER LETTER',
          alignment: 'center',
          fontSize: 14,
          bold: true,

        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 100,
                y2: 0,
                lineWidth: 1
              }
            ],
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        {
          text: 'Date: 15-10-2022',
          alignment: 'right',
        },
        {
          text: 'To'
        },
        {
          text: 'Kavan Shreshtha',
          bold: true
        },
        {
          text: 'Address : Gandhinagar, India'
        },
        {
          text: 'Mobile No.: 848434943165'
        },
        {
          text: 'Email : kavanshrestha@gmail.com'
        },

        {
          width: 'auto',
          text: 'Offer Letter',
          alignment: 'center',
          bold: true,
          margin: [0, 10]
        },
        {
          text: 'Dear Kavan,',
          margin: [0, 10]
        },

        {
          text: 'We offer you the position of Senior QA Engineer and are excited to make ypu a part of our organization. Your skills and experience will be an ideal fit for our organization.',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          text: 'As we discussed, You will be reporting to Mr. Yash Patel starting on 01.11.2022 on 1108, Shivalik Shilp, Iscon Cross Road, Sarkhej-Gandhinagar Highway, Ahmedabad, Gujarat 380015. You’ve been offered a yearly CTC of INR 8,40,000/- inclusive of deductibles if any. ',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          text: 'If you choose to accept this job offer, please sign the second copy of this letter and return it to me at your earliest convenience. When your acknowledgment is received, we will send you an employment agreement and a non-disclosure agreement that details our benefit plans. We look forward to welcoming you to the team. The further HR Policies will be discussed later',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          text: 'Please let me know if you have any questions or if I can provide any additional information.',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          text: 'Sincerely',
          margin: [0, 10, 0, 0],
        },
        {
          text: 'Yash Patel,',
          bold: true,
        },
        {
          text: 'Director'
        },
        {
          text: 'Endlos Innovations Private Limited',
          margin: [0, 0, 0, 10],
        },
        {
          text: 'I, Kavan Shreshtha, accept and agree to the proposed terms of employment and request that the Employer prepares a formal employment contract for execution.',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 120,
                y2: 0,
                lineWidth: 1
              }
            ],
          margin: [0, 50, 0, 0]
        },
        {
          text: 'Kavan Shreshtha',
          margin: [15, 0]
        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 120,
                y2: 0,
                lineWidth: 1
              }
            ],
          margin: [0, 50, 0, 0]
        },
        {
          text: 'Date of Signature',
          margin: [15, 0]
        },


      ],
      pageMargins: [60, 60, 60, 60],
      defaultStyle: {
        fontSize: 11,

      },
      header: {
        text: 'ENDLOS TECHNOLOGIES PVT LTD',
        width: 'auto',
        height: 200,
        bold: true,
        alignment: 'center',
        fontSize: 22,
        margin: [0, 30, 0, 0]
      },
      footer: {
        columns: [[
          {
            columns: [
              {
                width: '100%',
                canvas:
                  [
                    {
                      type: 'line',
                      x1: 60,
                      y1: 0,
                      x2: 536,
                      y2: 0,
                      lineWidth: 1,
                    }
                  ],
              },
            ],
          },
          {
            text: '1108, Shivalik Shilp, Near Iscon Cross Road, S.G.Highway, Ahmedabad, Gujarat - 380015',
            margin: [0, 7, 0, 4],
            alignment: 'center',
            width: 'auto',
          },
          {
            width: 'auto',
            margin: [60, 0],
            columns: [
              {
                width: '50%',
                columns: [
                  {
                    text: 'Website: www.endlos.tech',
                    margin: [0, 0],
                    alignment: 'center',
                  }
                ]
              },
              {
                width: '50%',
                columns: [
                  {
                    text: 'Email: info@endlos.tech',
                    margin: [0, 0],
                    alignment: 'center',
                  }
                ]
              }
            ]
          },
        ]
        ],
      }
    }

    let RelievingLetter = {
      watermark:
      {

        text: 'ENDLOS',
        opacity: 0.2,
        bold: true,
        italics: false,
        fontSize: 150,
      },
      content: [
        {
          margin: [0, 0, 0, 20],
          columns: [
            {
              width: '100%',
              columns: [
                [
                  // { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
                ]
              ]
            },
          ],

        },
        {
          text: 'Relieving Letter',
          alignment: 'center',
          lineHeight: 1.2,
          fontSize: 14,
          bold: true,

        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 100,
                y2: 0,
                lineWidth: 1
              }
            ],
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        {
          text: 'Date: 15-10-2022',
          lineHeight: 1.2,
          alignment: 'right',
        },
        {
          text: 'To',
          lineHeight: 1.2,
        },
        {
          text: 'Kavan Shreshtha',
          lineHeight: 1.2,
          bold: true
        },
        {
          text: 'Address : Gandhinagar, India',
          lineHeight: 1.2,
        },
        {
          text: 'Mobile No.: 848434943165',
          lineHeight: 1.2,
        },
        {
          text: 'Email : kavanshrestha@gmail.com',
          lineHeight: 1.2,
        },

        {
          width: 'auto',
          text: 'Sub: Relieving from your employment',
          alignment: 'center',
          bold: true,
          lineHeight: 1.2,
          margin: [0, 20]
        },
        {
          text: 'Dear Kavan,',
          margin: [0, 10],
          lineHeight: 1.2,
        },

        {
          text: 'You worked at _________________________ (“Company”) from _________ to _________ for ____ years (“Term”). Pursuant to your the Employment Agreement dated ______ (“Employment Agreement”) also stands terminated.',
          margin: [0, 10],
          lineHeight: 1.2,
          alignment: 'justify'
        },
        {
          text: 'We would also like to take this opportunity to remind you that, notwithstanding the termination of your employment with the Company, certain of your obligations under your Employment Agreement will continue. These obligations include, but may not be limited to the following  obligations –',
          margin: [0, 10],
          lineHeight: 1.2,
          alignment: 'justify'
        },
        {
          ol: [{
            text: 'All developments made and works created by you during the Term of your employment with the Company is the exclusive proprietary property of the Company, that any and all copyright(s) and other proprietary interest(s) therein shall belong to Company.',
            margin: [0, 10],
            lineHeight: 1.2,
            alignment: 'justify'
          },
          {
            text: 'You shall not divulge the Confidential Information of the Company to any third party. ',
            margin: [0, 10],
            lineHeight: 1.2,
            alignment: 'justify'
          },
          {
            text: 'You shall not give any statement or send write-ups or post anything regarding the Company in any form of media.',
            margin: [0, 10],
            lineHeight: 1.2,
            alignment: 'justify'
          }]
        },
        {
          text: 'You have received your full and final settlement; you have returned the properties of the Company and have completed all ormalities with respect to your cessation of employment with the Company. ',
          margin: [0, 10],
          lineHeight: 1.2,
          alignment: 'justify'
        },
        {
          text: 'If you have any questions concerning the information contained in this letter, please contact me directly. ',
          margin: [0, 10],
          lineHeight: 1.2,
          alignment: 'justify'
        },
        {
          text: 'We wish you all the best for your future endeavours! ',
          margin: [0, 50, 0, 0],
          lineHeight: 1.2,
          alignment: 'justify'
        },
        {
          text: 'Yours sincerely,',
          margin: [0, 0, 0, 20],
          lineHeight: 1.2,
        },
        {
          text: 'SIGNED AND DELIVERED BY: ',
          bold: true,
          margin: [0, 10, 0, 10],
        },
        {
          text: 'Signed for and on behalf of the Company by:',
          margin: [0, 0],
          alignment: 'justify'
        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 120,
                y2: 0,
                lineWidth: 1
              }
            ],
          margin: [0, 50, 0, 0]
        },
        {
          text: 'Kavan Shreshtha',
          margin: [15, 0]
        },
        {
          text: 'Signed by the Employee while accepting the relieving letter:',
          margin: [0, 30]
        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 120,
                y2: 0,
                lineWidth: 1
              }
            ],
          margin: [0, 10, 0, 0]
        },

      ],
      pageMargins: [60, 60, 60, 60],
      defaultStyle: {
        fontSize: 11,
        style: 'demo'

      },
      styles: {
        demo: {
          font: 'demo'
        }
      },
      header: {
        columns: [
          {
            text: 'ENDLOS TECHNOLOGIES PVT LTD',
            width: '100%',
            bold: true,
            alignment: 'center',
            fontSize: 22,
            margin: [0, 30, 0, 0]
          },
          {
            columns: [
              {
                width: '100%',
                canvas:
                  [
                    {
                      type: 'line',
                      x1: -60,
                      y1: 60,
                      x2: -540,
                      y2: 60,
                      lineWidth: 1,
                    }
                  ],
              },
            ],
          },
        ],
      },

      footer: {
        columns: [[
          {
            columns: [
              {
                width: '100%',
                canvas:
                  [
                    {
                      type: 'line',
                      x1: 60,
                      y1: 0,
                      x2: 536,
                      y2: 0,
                      lineWidth: 1,
                    }
                  ],
              },
            ],
          },
          {
            text: '1108, Shivalik Shilp, Near Iscon Cross Road, S.G.Highway, Ahmedabad, Gujarat - 380015',
            margin: [0, 7, 0, 4],
            alignment: 'center',
            width: 'auto',
          },
          {
            width: 'auto',
            margin: [60, 0],
            columns: [
              {
                width: '50%',
                columns: [
                  {
                    text: 'Website: www.endlos.tech',
                    margin: [0, 0],
                    alignment: 'center',
                  }
                ]
              },
              {
                width: '50%',
                columns: [
                  {
                    text: 'Email: info@endlos.tech',
                    margin: [0, 0],
                    alignment: 'center',
                  }
                ]
              }
            ]
          },
        ]
        ],
      }
    }

    let ExperienceLetter = {
      watermark:
      {

        text: 'ENDLOS',
        opacity: 0.2,
        bold: true,
        italics: false,
        fontSize: 150,
      },
      content: [
        {
          margin: [0, 0, 0, 20],
          columns: [
            {
              width: '100%',
              columns: [
                [
                  // { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
                ]
              ]
            },
          ],

        },
        {
          text: 'EXPERIENCE LETTER',
          alignment: 'center',
          lineHeight: 1.2,
          fontSize: 14,
          bold: true,

        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 140,
                y2: 0,
                lineWidth: 1
              }
            ],
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        {
          text: 'Date: 15-10-2022',
          lineHeight: 1.2,
          alignment: 'right',
        },
        {
          text: 'To',
          lineHeight: 1.2,
        },
        {
          text: 'Kavan Shreshtha',
          lineHeight: 1.2,
          bold: true
        },
        {
          text: 'Address : Gandhinagar, India',
          lineHeight: 1.2,
        },
        {
          text: 'Mobile No.: 848434943165',
          lineHeight: 1.2,
        },
        {
          text: 'Email : kavanshrestha@gmail.com',
          lineHeight: 1.2,
        },

        {
          width: 'auto',
          text: 'Sub:  Experience Letter',
          alignment: 'center',
          bold: true,
          lineHeight: 1.2,
          margin: [0, 30]
        },
        {
          text: 'Dear Kavan,',
          margin: [0, 10],
          lineHeight: 1.2,
        },

        {
          text: 'You have worked in our organization from ________ until ______ as____________. ',
          margin: [0, 10],
          lineHeight: 1.2,
          alignment: 'justify'
        },
        {
          text: 'Your performance during your employment has been appreciated in evaluations each year and your contribution to the organization has always been valued',
          margin: [0, 10],
          lineHeight: 1.2,
          alignment: 'justify'
        },

        {
          text: 'We wish you all the best in your future endeavors. ',
          margin: [0, 10, 0, 0],
          lineHeight: 1.2,
          alignment: 'justify'
        },

        {
          text: 'Yours sincerely,',
          margin: [0, 10, 0, 20],
          lineHeight: 1.2,
        },

        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 120,
                y2: 0,
                lineWidth: 1
              }
            ],
          margin: [0, 30, 0, 0]
        },
        {
          text: 'Yash Patel',
          margin: [0, 10, 0, 0],
          lineHeight: 1.2,
        },
        {
          text: 'Director,',
          margin: [0, 0],
          lineHeight: 1.2,
        },
        {
          text: 'ENDLOS TECHNOLOGIES PRIVATE LIMITED',
          margin: [0, 0]
        },

      ],
      pageMargins: [60, 60, 60, 60],
      defaultStyle: {
        fontSize: 11,
        style: 'demo'

      },
      styles: {
        demo: {
          font: 'demo'
        }
      },
      header: {
        columns: [
          {
            text: 'ENDLOS TECHNOLOGIES PVT LTD',
            width: '100%',
            bold: true,
            alignment: 'center',
            fontSize: 22,
            margin: [0, 30, 0, 0]
          },
          {
            columns: [
              {
                width: '100%',
                canvas:
                  [
                    {
                      type: 'line',
                      x1: -60,
                      y1: 60,
                      x2: -540,
                      y2: 60,
                      lineWidth: 1,
                    }
                  ],
              },
            ],
          },
        ],
      },

      footer: {
        columns: [[
          {
            columns: [
              {
                width: '100%',
                canvas:
                  [
                    {
                      type: 'line',
                      x1: 60,
                      y1: 0,
                      x2: 536,
                      y2: 0,
                      lineWidth: 1,
                    }
                  ],
              },
            ],
          },
          {
            text: '1108, Shivalik Shilp, Near Iscon Cross Road, S.G.Highway, Ahmedabad, Gujarat - 380015',
            margin: [0, 7, 0, 4],
            alignment: 'center',
            width: 'auto',
          },
          {
            width: 'auto',
            margin: [60, 0],
            columns: [
              {
                width: '50%',
                columns: [
                  {
                    text: 'Website: www.endlos.tech',
                    margin: [0, 0],
                    alignment: 'center',
                  }
                ]
              },
              {
                width: '50%',
                columns: [
                  {
                    text: 'Email: info@endlos.tech',
                    margin: [0, 0],
                    alignment: 'center',
                  }
                ]
              }
            ]
          },
        ]
        ],
      }
    }

    let EmployeeAgreement = {
      watermark:
      {

        text: 'ENDLOS',
        opacity: 0.2,
        bold: true,
        italics: false,
        fontSize: 150,
      },
      content: [
        {
          margin: [0, 0, 0, 20],
          columns: [
            {
              width: '100%',
              columns: [
                [
                  // { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 }] },
                ]
              ]
            },
          ],

        },
        {
          text: 'EMPLOYMENT AGREEMENT',
          alignment: 'center',
          fontSize: 16,
          bold: true,
          margin: [0, -5, 0, 0],
        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 200,
                y2: 0,
                lineWidth: 1
              }
            ],
          alignment: 'center',
          margin: [0, 0, 0, 30],
        },
        {
          text: 'This agreement lays down the terms of employment, agreed upon by the employer  and employee. Whether stated explicitly in the agreement or not, both the employee and the employer have the duty of mutual confidence and trust, and to make only lawful and reasonable demands on each other.',
          alignment: 'justify'
        },
        {
          canvas:
            [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 475,
                y2: 0,
                lineWidth: 1,
              }
            ],
          width: '100%',
          margin: [0, 20, 0, 10],
        },
        {
          text: 'This EMPLOYMENT AGREEMENT (Hereinafter, the “Agreement”)is entered into on this 20 day of September, 2022, ',
          alignment: 'justify'
        },
        {
          width: 'auto',
          text: 'BY AND BETWEEN',
          alignment: 'center',
          bold: true,
          margin: [0, 20]
        },
        {
          text: 'ENDLOS TECHNOLOGIES PRIVATE LIMITED, a private limited company incorporated under the Companies Act, 1956, having its registered office at 1108, SHIVALIK SHILP, NR.ISCON CROSS, S G HIGHWAY, AHMEDABAD, 380023(hereinafter referred to as the “Company” or “Employer”, which expression shall, unless repugnant to the meaning or context hereof, be deemed to include all permitted successors and assigns), ',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          width: 'auto',
          text: 'AND',
          alignment: 'center',
          bold: true,
          margin: [0, 5]
        },
        {
          text: 'KIRAN PATI, residing at PUNE, INDIA (hereinafter referred to as the "Employee", which expression shall, unless repugnant to the meaning or context hereof, be deemed to include all permitted successors and assigns).',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          text: 'WHEREAS, the parties hereto desire to enter into this Agreement to define and set forth the terms and conditions of the employment of the Employee by the Company;',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          text: 'NOW, THEREFORE, in consideration of the mutual covenants and agreements set forth below, it is hereby covenanted and agreed by the Company and the Employee as follows:',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          ol: [
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Interpretation',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'In this agreement, the following terms shall have the following meanings:',
                      margin: [0, 20, 0, 10],
                      alignment: 'center',
                    }

                  ]
                },
                {
                  width: 'auto',
                  columns: [
                    {
                      width: '40%',
                      columns: [
                        {
                          text: 'a) “Confidential Information”',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '60%',
                      columns: [
                        {
                          text: 'any trade secret or other information which is confidential or commercially sensitive and which is not in the public domain (other than through the wrongful disclosure by the Employee) and which belongs to any Group Company (whether stored or recorded in documentary or electronic form) and which (without limitation) relates to the business methods, management systems, marketing plans, strategic plans, finances, new or maturing business opportunities, marketing  activities, processes, inventions, designs or similar of any Group Company, or to which any Group Company owes a duty of confidentiality  to any third party and including in particular [insert specific named items of Confidential Information];',
                          margin: [0, 10],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  columns: [
                    {
                      width: '40%',
                      columns: [
                        {
                          text: 'b) “The Employment”',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '60%',
                      columns: [
                        {
                          text: 'the employment of the Employee by the Company in accordance with the terms of this agreement;',
                          margin: [0, 10],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  columns: [
                    {
                      width: '40%',
                      columns: [
                        {
                          text: 'c) “Group Company”',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '60%',
                      columns: [
                        {
                          text: 'the Company, any company of which it is a Subsidiary (being a holding company of the Company) and any Subsidiaries of the Company or any holding company, from time to time;',
                          margin: [0, 10],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  columns: [
                    {
                      width: '40%',
                      columns: [
                        {
                          text: 'd) “Subsidiary”',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '60%',
                      columns: [
                        {
                          text: 'a company as defined in section 1159 of the Companies Act 2006;',
                          margin: [0, 10],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  columns: [
                    {
                      width: '40%',
                      columns: [
                        {
                          text: 'e) “Termination Date”',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '60%',
                      columns: [
                        {
                          text: 'The date on which the Employment ceases.',
                          margin: [0, 10],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                }
              ]
              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Position',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: 'Upon execution of this Agreement, the employee would be posted as the QA ENGINEER of the Company.',
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "During the term period of this Agreement, the Company may change the employee's above mentioned post (or position) or location based on the Company's production, operation or working requirements or according to the employee's working capacities and performance, including but not limited to adjustments made to the employee's job description or work place, promotion, work transfer at the same level, and demotion, etc., or adjustments made to the employee's responsibilities without any change to employee's post (or position).",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Term and Probation Period',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "It is understood and agreed that the first 90 days of employment shall constitute a probationary period ('Probationary Period') during which period the Employer may, in its absolute discretion, terminate the Employee's employment, without assigning any reasons and without notice or cause.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "After the end of the Probationary Period, the Employer may decide to confirm the Employment of the Employee, in its sole discretion.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "After the end of the Probationary Period, this Agreement may be terminated in accordance with Clause 12 of this Agreement.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Performance of Duties',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee agrees that during the Employment Period, he/she shall devote his/her full business time to the business affairs of the Company and shall perform the duties assigned to him/her faithfully and efficiently, and shall endeavor, to the best of his/her abilities to achieve the goals and adhere to the parameters set by the Company. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "The Employee shall be responsible for:",
                          margin: [0, 0],
                          alignment: 'justify',
                        },
                        {
                          ul: [
                            {
                              text: 'QA'
                            },
                            {
                              text: 'QC'
                            }
                          ],
                        }
                      ]

                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Compensation',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      text: 'Subject to the following provisions of this Agreement, during the Employment Period, the Employee shall be compensated for his services as follows:',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {

                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: 'The Employee shall receive annual salary, payable in monthly or more frequent installments, as per the convenience of the Employer, an amount of 2.4 L per annum CTC, subject to such increases from time to time, as determined by the Employer. Such payments shall be subject to such normal statutory deductions by the Employer.',
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "During the term of this Agreement, the Employee's salary shall be paid by means of bank transfer, cheque, or any other method convenient to the Employer, and consented to by the Employee",
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "All reasonable expenses arising out of employment shall be reimbursed assuming that the same have been authorized prior to be incurred and with the provision of appropriate receipts.",
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Obligations of the Employee',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: 'Upon execution of an agreement, the Employee shall not engage in any sort of theft, fraud, misrepresentation, or any other illegal act neither in the employment space nor outside the premise of employment. If he/she shall do so, the Company shall not be liable for such an act done at his own risk',
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee further promises to never engage in any theft of the Employer’s property or attempt to defraud the Employer in any manner.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee shall always ensure that his/her conduct is in accordance with all the rules, regulations, and policies of the Company as notified from time to time.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'd.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee shall not take up part-time or full-time employment or consultation with any other party or be involved in any other business during the term of his/her employment with the Company.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'e.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee shall always ensure that his/her conduct is in accordance with all the rules, regulations, and policies of the Company as notified from time to time, including but not limited to the Leave Policy and Sexual Harassment Policy.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'f.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employer hereby prohibits the Employee from engaging in any sexual harassment and the Employee promises to refrain from any form of sexual harassment during the course of employment in and around the premise of employment. If the Employee violates this term in the agreement, he shall be fully responsible for his/her actions and the Employer shall not be held responsible for any illegal acts committed at the discretion of the Employee.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Leave Policy',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: 'The Employee is entitled to 0 days of paid casual leaves in a year and 1 day(s) of sick leave per month. In addition, the Employee will be entitled to public holidays mentioned under the Leave Policy of the Employer. ',
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee may not carry forward or encash any holiday to the next holiday year.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "In the event that the Employee is absent from work due to sickness or injury, he/she will follow the Leave Policy and inform the designated person as soon as possible and will provide regular updates as to his/her recovery and as far as  practicable will inform the designated person of the Employer of his/her expected date of return to work.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'd.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "If the Employee is absent from work due to sickness or injury for more than three consecutive days he/she must submit to the Employer a self-certification form. If such absence lasts for more than seven consecutive days the Employee must obtain a medical certificate from his/her doctor and submit it to the employer.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'e.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "For any period of absence due to sickness or injury the Employee will be paid statutory sick pay only, provided that he satisfies the relevant requirements. The Employee’s qualifying days for statutory sick pay purposes are Monday to Friday.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Assignment',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee acknowledges that any work including without limitation inventions, designs, ideas, concepts, drawings, working notes, or artistic works that the Employee may individually or jointly conceive or develop during the term of Employment are “works made for hire” and to the fullest extent permitted by law, Employee shall assign, and does hereby assign, to the Employer all of Employee's right, title and interest in and to all Intellectual Property improved, developed, discovered or written in such works.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "Employee shall, upon request of the Employer, execute, acknowledge, deliver and file any and all documents necessary or useful to vest in the Employer all of Employee's right, title and interest in and to all such matters.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Competing Businesses',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'During the Term of this Agreement and for a period of one (3) year after the termination of this Agreement, the Employee agrees not to engage in any employment, consulting, or other activity that competes with the business, proposed business or business interests of the Employer, without the Employer’s prior written consent.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Confidentiality',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: ' The Employee acknowledges that, in the course of performing and fulfilling his duties hereunder, he may have access to and be entrusted with confidential information concerning the present and contemplated financial status and activities of the Employer, the disclosure of any of which confidential information to the competitors of the Employer would be highly detrimental to the interests of the Employer.',
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee further acknowledges and agrees that the right to maintain the confidentiality of trade secrets, source code, website information, business plans or client information or other confidential or proprietary information, for the purpose of enabling the other party such information constitutes a proprietary right which the Employer is entitled to protect.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "Accordingly, the Employee covenants and agrees with the Employer that he will not, under any circumstance during the continuance of this agreement, disclose any such confidential information to any person, firm or corporation, nor shall he use the same, except as required in the normal course of his engagement hereunder, and even after the termination of employment, he shall not disclose or make use of the same or cause any of confidential information to be disclosed in any manner.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'd.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employer owns any intellectual property created by the Employee during the course of the employment, or in relation to a certain field, and he shall thereon have all the necessary rights to retain it. After termination of employment, Employee shall not impose any rights on the intellectual property created. Any source code, software or other intellectual property developed, including but not limited to website design or functionalitythat was created by the employee, during the course of employment under this Agreement, shall belong to the Employer.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Remedies',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'If at any time the Employee violates to a material extent any of the covenants or agreements set forth in paragraphs 6 and 9, the Company shall have the right to  terminate all of its obligations to make further payments under this Agreement. The Employee acknowledges that the Company would be irreparably injured by a violation of paragraph 6 or 9 and agrees that the Company shall be entitled to an injunction restraining the Employee from any actual or threatened breach of paragraph 6 or 9 or to any other appropriate equitable remedy without any bond or other security being required.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Amendment and Termination',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: 'In case the Employer terminates the employment without just cause, in which case the Employer shall provide the Employee with advance notice of termination or compensation in lieu of notice equal to 1 month.',
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee may terminate his employment at any time by providing the Employer with at least 3 months advance notice of his intention to resign.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Employee may terminate on the last day of the month in which the date of the Employee’s death occurs; or the date on which the Company gives notice to the Employee if such termination is for Cause or Disability.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'd.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "For purposes of this Agreement, 'Cause' means the Employee's gross misconduct resulting in material damage to the Company, willful insubordination or disobedience, theft, fraud or dishonesty, willful damage or loss of Employer’s property, bribery and habitual lateness or absence, or any other willful and material breach of this Agreement.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Restrictive Covenant',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'Following the termination of employment of the Employee by the Employer, with or without cause, or the voluntary withdrawal by the Employee from the Employer, the Employee shall, for a period of three years following the said termination or voluntary withdrawal, refrain from either directly or indirectly soliciting or attempting to solicit the business of any client or customer of the Employer for his own benefit or that of any third person or organization, and shall refrain from either directly or indirectly attempting to obtain the withdrawal from the employment by the Employer of any other Employee of the Employer having regard to the same geographic and temporal restrictions. The Employee shall not directly or indirectly divulge any financial information relating to the Employer or any of its affiliates or clients to any person whatsoever.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Notices',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },

                {
                  width: 'auto',
                  margin: [0, 10],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Any notice required to be given hereunder shall be deemed to have been properly given if delivered personally or sent by pre-paid registered mail as follows:",
                          margin: [0, 0],
                          alignment: 'justify',
                        },
                        {
                          ul: [
                            {
                              text: 'To the Employee: ______________________________'
                            },
                            {
                              text: 'To the Employer: info@endlos.tech'
                            }
                          ],
                        }
                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 10],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "And if sent by registered mail shall be deemed to have been received on the 4th business day of uninterrupted postal service following the date of mailing. Either party may change its address for notice at any time, by giving notice in writing to the other party pursuant to the provisions of this agreement.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Non-Assignment',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'The interests of the Employee under this Agreement are not subject to the claims of his creditors and may not be voluntarily or involuntarily assigned, alienated or encumbered.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Successors',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'This agreement shall be assigned by the Employer to any successor employer and be binding upon the successor employer. The Employer shall ensure that the successor employer shall continue the provisions of this agreement as if it were the original party of the first part.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Indemnification',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'The Employee shall indemnify the employer against any and all expenses, including amounts paid upon judgments, counsel fees, environmental penalties and fines, and amounts paid in settlement (before or after suit is commenced), incurred by the employer in connection with his/her defense or settlement of any claim, action, suit or proceeding in which he/she is made a party or which may be asserted against his/her by reason of his/her employment or the performance of duties in this Agreement. Such indemnification shall be in addition to any other rights to which those indemnified may be entitled under any law, by-law, agreement, or otherwise.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Modification',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'Any modification of this Agreement or additional obligation assumed by either party in connection with this Agreement shall be binding only if evidenced in writing signed by each party or an authorized representative of each party.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Severability',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'Each paragraph of this agreement shall be and remain separate from and independent of and severable from all and any other paragraphs herein except where otherwise indicated by the context of the agreement. The decision or declaration that one or more of the paragraphs are null and void shall have no effect on the remaining paragraphs of this agreement.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Paragraph headings',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'The titles to the paragraphs of this Agreement are solely for the convenience of the parties and shall not be used to explain, modify, simplify, or aid in the interpretation of the provisions of this Agreement.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Applicable Law and Jurisdiction',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'This Agreement shall be governed by and construed in accordance with the laws of Ahmedabad, Gujarat, India. Each party hereby irrevocably submits to the exclusive jurisdiction of the courts of Ahmedabad, Gujarat, India, for the adjudication of any dispute hereunder or in connection herewith.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'Counterparts',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  columns: [
                    {
                      text: 'The Agreement may be executed in two or more counterparts, any one of which shall be deemed the original without reference to the others.',
                      margin: [0, 10, 0, 10],
                      alignment: 'justify',
                    }

                  ]
                },
              ]

              ]
            },
          ]
        },
        {
          text: 'IN WITNESS WHEREOF, the Employee has hereunto set his hand, and the Company has caused these presents to be executed in its name and on its behalf, all as of the day and year first above written',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          width: 'auto',
          margin: [0, 40],
          columns: [
            {
              width: '50%',
              columns: [[
                {
                  width: '100%',
                  canvas:
                    [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 150,
                        y2: 0,
                        lineWidth: 1,
                      }
                    ],
                },
                {
                  alignment: 'left',
                  text: '(Employee)',
                  bold: true,
                  margin: [0, 10, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'Name: KIRAN PATI',
                  margin: [0, 5, 0, 0]
                },
              ]]
            },
            {
              width: '50%',
              columns: [[
                {
                  width: '100%',
                  canvas:
                    [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 150,
                        y2: 0,
                        lineWidth: 1,
                      }
                    ],
                },
                {
                  alignment: 'left',
                  text: '(The Employer)',
                  bold: true,
                  margin: [0, 10, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'YASH PATEL',
                  margin: [0, 5, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'Director,',
                  margin: [0, 0, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'ENDLOS TECHNOLOGIES PRIVATE LIMITED',
                  bold: true,
                  margin: [0, 0, 0, 0]
                }
              ]]
            },
          ]
        },

      ],
      pageMargins: [60, 80, 60, 80],
      defaultStyle: {
        fontSize: 13,
        lineHeight: 1.3,
      },

      header: {
        columns: [
          {
            text: 'ENDLOS TECHNOLOGIES PVT LTD',
            width: '100%',
            bold: true,
            alignment: 'center',
            fontSize: 22,
            margin: [0, 25, 0, 0]
          },
          {
            columns: [
              {
                width: '100%',
                canvas:
                  [
                    {
                      type: 'line',
                      x1: -60,
                      y1: 60,
                      x2: -540,
                      y2: 60,
                      lineWidth: 1,

                    },

                  ],
              },
            ],
          },
        ],
      },

      footer: {
        columns: [[
          {
            columns: [
              {
                width: '100%',
                canvas:
                  [
                    {
                      type: 'line',
                      x1: 60,
                      y1: 0,
                      x2: 536,
                      y2: 0,
                      lineWidth: 1,
                    }
                  ],
              },
            ],
          },
          {
            text: '1108, Shivalik Shilp, Near Iscon Cross Road, S.G.Highway, Ahmedabad, Gujarat - 380015',
            margin: [0, 7, 0, 0],
            fontSize: 12,
            alignment: 'center',
            width: 'auto',
          },
          {
            width: 'auto',
            margin: [60, 0],
            columns: [
              {
                width: '50%',
                columns: [
                  {
                    text: 'Website: www.endlos.tech',
                    margin: [0, 0],
                    alignment: 'center',
                    fontSize: 12,
                  }
                ]
              },
              {
                width: '50%',
                columns: [
                  {
                    text: 'Email: info@endlos.tech',
                    margin: [0, 0],
                    alignment: 'center',
                    fontSize: 12,
                  }
                ]
              }
            ]
          },
        ]
        ],
      }
    }

    let mutualNDA = {

      content: [
        {
          margin: [0, 0, 0, 20],
          columns: [[
            {
              width: 'auto',
              text: 'MUTUAL NON-DISCLOSUREAGREEMENT',
              bold: true,
              alignment: 'center',
              fontSize: 18,
            },
            {
              width: '100%',
              columns: [
                [
                  { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 475, y2: 0, lineWidth: 2, color: '#3788d8' }] },
                ]
              ]
            },
          ]

          ],

        },

        {
          text: 'This Non-Disclosure Agreement (hereinafter, the “Agreement” is entered into on this [.] day of [.], 20[.] (hereinafter, the “Effective Date”)',
          alignment: 'justify'
        },

        {
          width: 'auto',
          text: 'BY AND BETWEEN',
          alignment: 'center',
          bold: true,
          margin: [0, 20]
        },
        {
          width: 'auto',
          text: 'Name:',
          bold: true,
        },
        {
          width: 'auto',
          text: 'Address:',
          bold: true,
        },
        {
          width: 'auto',
          text: 'Represented by:',
          bold: true,
        },
        {
          text: '(hereinafter referred to as the “First Party”, which expression shall, where the context admits, include its successors and permitted assigns), of the ONE PART; AND',
          margin: [0, 25],
          alignment: 'justify'
        },
        {
          width: 'auto',
          text: 'Name:',
          bold: true,
        },
        {
          width: 'auto',
          text: 'Address:',
          bold: true,
        },
        {
          width: 'auto',
          text: 'Represented by:',
          bold: true,
        },
        {
          text: '(hereinafter referred to as the “Second Party”, which expression shall, unless repugnant to the meaning or context hereof, be deemed to include its successors and permitted assigns); ON THE SECOND PART.',
          margin: [0, 15],
          alignment: 'justify'
        },
        {
          text: 'The Party of First and the Second Part are individually referred to as “Party” individually and collectively referred to as “Parties”.',
          margin: [0, 15],
          alignment: 'justify'
        },
        {
          text: 'WHEREAS the Parties intend to participate in discussions in order to explore a potential business relationship and the Parties may share information that is confidential and proprietary either during the discussions or during the course of the business relationship, for the purpose of enabling the parties to interact and work productively(hereinafter referred to as the “Purpose"); ',
          margin: [0, 15],
          alignment: 'justify'
        },
        {
          text: 'WHEREAS the Parties desire to protect such Confidential Information and ensure that it is not disclosed to any third party with the permission of the Party.',
          margin: [0, 15, 0, 30],
          alignment: 'justify'
        },
        {
          text: 'NOW, THEREFORE, THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES HERETO AS FOLLOWS:',
          margin: [0, 15],
          bold: true,
          alignment: 'justify',
          fontSize: 14,
        },
        {
          ol: [
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: ' CONFIDENTIAL INFORMATION',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]
                },

                {
                  width: 'auto',
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: 'For purposes of this Agreement, “Confidential Information” means and includes all information or material that has or could have commercial value or other utility in the business in which Parties are engaged and any data or information that is proprietary to the Parties and not generally known to the public, whether in tangible or intangible form, whenever and however disclosed, including, but not limited to:',
                          margin: [0, 10],
                          alignment: 'justify',
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'i.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Any Trade Secrets, Proprietary documents, business plans, process, structure or practices;',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'ii.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Any marketing strategies, plans, financial information, or projections; operations, sales estimates, business plans and performance results relating to the past, present or future business activities of such party, its affiliates, subsidiaries and affiliated companies; ',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'iii.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Any information related to the cost of project execution or delivery of service;',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'iv.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Plans for products or services, and client or partner lists;',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'v.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Anyalgorithm, software, design, process, procedure, formula, source code, object code, flow charts, databases, improvement, technology or method;',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'vi.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Any concepts, reports, data, know-how, works-in-progress, designs, development tools, specifications;',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'vii.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Any invoices, bills, e-mail communications, mobile text communications, and any other communication related to the projects, products or services undertaken by either of the Parties for the other Party or on the behalf of the other Party or its vendors;',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'viii.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Any other information that should reasonably be recognized as confidential information of the other Party. ',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                      ]
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: 'Confidential Information need not be novel, unique, patentable, copyrightable or constitute a trade secret in order to be designated Confidential Information. The Parties acknowledge that the Confidential Information is proprietary to the other Party, has been developed and obtained through great efforts by the Party and that Parties regard all of their Confidential Information as trade secrets.',
                          margin: [0, 10],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: 'The Parties shall use the Confidential Information solely for and in connection with the Purpose.',
                          margin: [0, 10],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'd.',
                          margin: [0, 10],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: 'Notwithstanding any other provision of this Agreement, the Parties acknowledge that Confidential Information shall not include any information that:',
                          margin: [0, 10],
                          alignment: 'justify',
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'i.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Is or becomes legally and publicly available to either Party without breach of this Agreement;',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'ii.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Was rightfully in the possession of either Party without any obligation of confidentiality; or',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },
                        {
                          width: 'auto',
                          columns: [
                            {
                              width: '5%',
                              columns: [
                                {
                                  text: 'iii.',
                                  margin: [0, 5],
                                  bold: true,
                                }
                              ]
                            },
                            {
                              width: '95%',
                              columns: [[
                                {
                                  text: 'Is disclosed or is required to be disclosed under any relevant law, regulation or order of court, provided the other Party is given prompt notice of such requirement or such order and (where possible) provided the opportunity to contest it, and the scope of such disclosure is limited to the extent possible.',
                                  margin: [0, 5],
                                  alignment: 'justify',
                                },
                              ]
                              ]
                            }
                          ]
                        },

                      ]
                      ]
                    }
                  ]
                },
              ]
              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: ' NON-DISCLOSURE',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: 'The Parties shall use the Confidential Information only for the Purpose and not disclose any or part or summary or extract of the Confidential Information to any third party, including third parties affiliated with the other Party, without that Party’s prior written consent, which prior consent the Party may refuse to give without assigning any reasons.',
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Parties shall hold and keep in strictest confidence any and all Confidential Information and shall treat the Confidential Information with at least the same degree of care and protection as it would treat its own Confidential Information.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "EitherParty shall not disclose the sale of materials of the other Party to any individual/person/any client of the other Party.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'd.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "Either Party shall not copy or reproduce in any way (including without limitation, store in any computer or electronic system) any Confidential Information or any documents containing Confidential Information without the Party’s prior written consent. The Party shall immediately upon request by the other Party deliver to the Party owning the Confidential Information that has been disclosed to the other Party, including all copies (if any) made in terms of these.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'e.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "EitherParty shall not commercially/non-commercially use or disclose any Confidential Information or any materials derived therefrom to any other person or entity other than persons in the direct employment of the other Party who have a need to haveaccess to and knowledge of the Confidential Information solely for the Purpose as defined above, and such persons are under similar obligation of confidentiality and non-disclosure as these presents. In the event that any employees, agents or affiliates of either Party disclose or cause to be disclosed the Confidential Information, that Party shall be liable for such disclosure. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'f.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Parties may not disclose Confidential Information to any third party under any circumstances regardless of whether the third party has executed a Non-Disclosure Agreement with the Party. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'g.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "BothParties agrees to notify the other Party immediately if it learns of any use or disclosure of the Party's Confidential Information in violation of the terms of this Agreement.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'h.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "The Parties further acknowledge and agree that no representation or warranty, express or implied, is or will be made, and no responsibility or liability is or will be accepted by either Party, or by any of its respective directors, officers, employees, agents or advisers, as to, or in relation to, the accuracy of completeness of any Confidential Information made available to the other Party or its advisers; it is responsible for making its own evaluation of such Confidential Information.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'i.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "During the term of this agreement, either Parties may use the association with the other Party only towards the purpose as envisaged under their business association under this Agreement.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'j.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "Both theParties hereby acknowledge, understand and agree that they shall not approach the clients of the other Party in any manner for whom one Party has delivered a product or a service on behalf of the other Party, for an existing project or for any future projects. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'PUBLICATIONS',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  text: "NeitherParty shall not make news releases, public announcements, give interviews, issue or publish advertisements or publicize in any other manner whatsoever in connection with this Agreement, the contents/provisions thereof, other information relating to this Agreement, the Purpose, the Confidential Information or other matter of this Agreement, without the prior written approval of the other Party. Further, neither Party shall use any photographs/video/other materials belonging or related to the other Party in promotional content through electronic, print or other mediums.",
                  margin: [0, 0],
                  alignment: 'justify',

                },
              ]
              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'TERM',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "This Agreement shall be effective from the date hereof and all non-disclosure provisions shall continue to be in force at all times even after the cessation of the discussions or business relationship between the parties.",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Upon any demand made by either Party, the other Party shall immediately cease any and all disclosures or uses of Confidential Information, and at the request of the Party, shall promptly return or destroy all written, graphic or other tangible forms of the Confidential Information and all copies, abstracts, extracts, samples, notes or modules or like thereof, in accordance with this clause and Section 6 of this Agreement. The obligations of the Parties with respect to disclosure and confidentiality shall continue to be binding and applicable without limit in point in time except and until such information enters the public domain.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },

              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'TITLE AND PROPRIETARY RIGHTS',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [
                        {
                          text: "Notwithstanding the disclosure of any Confidential Information by one Party to the other Party, the original Party shall retain title and all intellectual property and proprietary rights in the Confidential Information. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "No license under any trademark, patent or copyright, or application for same, which are now or thereafter may be obtained by the one Party is either granted or implied by the conveying of Confidential Information, to the other Party. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Neither Party shall conceal, alter, obliterate, mutilate, deface or otherwise interfere with any trademark, trademark notice, copyright notice, confidentiality notice or any notice of any other proprietary right of the other Party on any copy of the Confidential Information, and shall reproduce any such mark or notice on all copies of such Confidential Information.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'd.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Likewise, the other Party shall not add or emboss its own or any other any mark, symbol or logo on such Confidential Information.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'RETURN OF CONFIDENTIAL INFORMATION',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '100%',
                      columns: [
                        {
                          text: 'Upon written demand of the either Party, the other Party shall:',
                          margin: [0, 0],
                          alignment: 'justify',
                        }
                      ]
                    },
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Cease using the Confidential Information;",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Return the Confidential Information and all copies, abstract, extracts, samples, notes or modules thereof to the Party that makes such demand, within seven (7) days after receipt of notice; and",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Upon such return, certify in writing that the other Party has complied with the obligations set forth in this paragraph. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'REMEDIES',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
             
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "The Parties acknowledge that if either Party fails to comply with any of its obligations hereunder, the other Party may suffer immediate, irreparable harm for which monetary damages may not be adequate.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "The Parties acknowledge that damages are not a sufficient remedy for the other Party for any breach of any of the Party’s undertakings herein provided; and the Parties further acknowledge that the affected Party is entitled to, without limitation to the other rights guaranteed under this Agreement, to specific performance or injunctive relief (as appropriate) as one of the remedies for any breach or threatened breach of those undertakings by the defaulting Party, in addition to any other remedies available to the affected Party in law or in equity. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'ENTIRE AGREEMENT, AMENDMENT AND ASSIGNMENT',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
             
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                  
                    {
                      width: '100%',
                      columns: [[
                        {
                          text: "This Agreement constitutes the entire agreement between the Parties relating to the matters discussed herein and /supersedes any and all prior oral discussions and/or written correspondence or agreements between the Parties. This Agreement may be amended or modified only with the mutual written consent of the parties, by way of an addendum. Neither this Agreement nor any right granted hereunder shall be assignable or otherwise transferable.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
              ]
              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'DISPUTE RESOLUTION',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
             
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Mediation. The Parties agree to first mediate any disputes or claims between them in good faith and resolve the disputes amicably and share the cost of mediation equally. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "Arbitration. In the event that mediation fails, any controversy or claim arising out of or relating to this Agreement or breach of any duties hereunder shall be settled by Arbitration in accordance with the Arbitration and Conciliation Act of India, 1996. All hearings will be held in [.] India and shall be conducted in English. The parties shall each appoint an arbitrator who shall then appoint a sole arbitrator to preside over the Arbitration proceedings. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
              ]

              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'GOVERNING LAW AND JURISDICTION',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
             
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                  
                    {
                      width: '100%',
                      columns: [[
                        {
                          text: "This Agreement shall be governed by and construed in accordance with the laws of India. Each party hereby irrevocably submits to the exclusive jurisdiction of the courts of [.] India, for the adjudication of any dispute hereunder or in connection herewith.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
              ]
              ]
            },
            {
              width: '100%',
              columns: [[
                {
                  columns: [
                    {
                      width: 'auto',
                      text: 'MISCELLANEOUS',
                      margin: [0, 10],
                      lineHeight: 1.2,
                      bold: true,
                      fontSize: 15,
                    }
                  ]

                },
             
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'a.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "No failure or delay by either Party in exercising or enforcing any right, remedy or power hereunder shall operate as a waiver thereof, nor shall any single or partial exercise or enforcement of any right, remedy or power preclude any further exercise or enforcement thereof or the exercise or enforcement of any other right, remedy or power.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'b.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "The failure of either party to enforce its rights under this Agreement at any time for any period shall not be construed as a waiver of such rights.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'c.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "In the event that any of the provisions of this Agreement shall be held by a court or other tribunal of competent jurisdiction to be unenforceable, the remaining portions hereof shall remain in full force and effect.",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
                {
                  width: 'auto',
                  margin: [0, 5],
                  columns: [
                    {
                      width: '5%',
                      columns: [
                        {
                          text: 'd.',
                          margin: [0, 0],
                          bold: true,
                        }
                      ]
                    },
                    {
                      width: '95%',
                      columns: [[
                        {
                          text: "All obligations respecting the Confidential Information provided hereunder shall survive any termination of this Agreement. ",
                          margin: [0, 0],
                          alignment: 'justify',
                        },

                      ]

                      ]
                    }
                  ]
                },
              ]

              ]
            },
          ]
        },
        {
          text: 'IN WITNESS WHEREOF, the Parties hereto have executed these presents the day, month and year first hereinabove written.',
          margin: [0, 10],
          alignment: 'justify'
        },
        {
          width: 'auto',
          margin: [0, 30],
          columns: [
            {
              width: '50%',
              columns: [[
                {
                  width: '100%',
                  canvas:
                    [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 150,
                        y2: 0,
                        lineWidth: 1,
                      }
                    ],
                },
                {
                  alignment: 'left',
                  text: '(First Party)',
                  bold: true,
                  margin: [0, 10, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'Name:',
                  margin: [0, 5, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'Designation:',
                  margin: [0, 0, 0, 0]
                },
              ]]
            },
            {
              width: '50%',
              columns: [[
                {
                  width: '100%',
                  canvas:
                    [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 150,
                        y2: 0,
                        lineWidth: 1,
                      }
                    ],
                },
                {
                  alignment: 'left',
                  text: '(Second Party)',
                  bold: true,
                  margin: [0, 10, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'Name:',
                  margin: [0, 5, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'Designation:',
                  margin: [0, 0, 0, 0]
                },
                
              ]]
            },
          ]
        },
        {
          text: 'WITNESSES: ',
          margin: [0, 0],
          bold: true,
          fontSize: 14,
          alignment: 'justify'
        },
        {
          width: 'auto',
          margin: [0, 30],
          columns: [
            {
              width: '50%',
              columns: [[
                {
                  width: '100%',
                  canvas:
                    [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 150,
                        y2: 0,
                        lineWidth: 1,
                      }
                    ],
                },
                {
                  alignment: 'left',
                  text: 'Name:',
                  margin: [0, 5, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'Address:',
                  margin: [0, 0, 0, 0]
                },
              ]]
            },
            {
              width: '50%',
              columns: [[
                {
                  width: '100%',
                  canvas:
                    [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 0,
                        x2: 150,
                        y2: 0,
                        lineWidth: 1,
                      }
                    ],
                },
                {
                  alignment: 'left',
                  text: 'Name:',
                  margin: [0, 5, 0, 0]
                },
                {
                  alignment: 'left',
                  text: 'Address:',
                  margin: [0, 0, 0, 0]
                },
                
              ]]
            },
          ]
        },
      ],
      pageMargins: [60, 60, 60, 60],
      defaultStyle: {
        fontSize: 12,
        lineHeight: 1.3,
      },
      footer: function (currentPage, pageCount) { return { text: "" + currentPage.toString() + " of " + pageCount, alignment: 'center' } }


    }
    pdfMake.createPdf(mutualNDA).open();
  }
  ngOnDestroy() {
  }
}
