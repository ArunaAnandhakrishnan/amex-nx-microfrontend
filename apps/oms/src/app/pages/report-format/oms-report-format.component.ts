import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  OmsReportFormatPanelComponent,
  ReportFormatFormData
} from './report-format-panel';

import {
  OmsReportFormatService
} from '../../services/oms-report-format.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-report-format',

  standalone: true,

  imports: [
    CommonModule,
    OmsReportFormatPanelComponent
  ],

  templateUrl:
    './oms-report-format.component.html',
})
export class OmsReportFormatComponent
  implements OnInit {

  @Output()
  backClicked =
    new EventEmitter<void>();

  settlementOptions = [

    {
      value: 'pdf',
      label: 'Adobe PDF'
    },

    {
      value: 'excel',
      label: 'Microsoft Excel'
    }
  ];

  submissionOptions = [

    {
      value: 'pdf',
      label: 'Adobe PDF'
    },

    {
      value: 'excel',
      label: 'Microsoft Excel'
    },

    {
      value: 'csv',
      label: 'Comma Separated Values (CSV)'
    },

    {
      value: 'extended_csv',
      label: 'Extended (CSV)'
    },

    {
      value: 'merchant_excel',
      label: 'Merchant Extended Excel'
    },

    {
      value: 'online_csv',
      label: 'Online Merchants (CSV)'
    }
  ];

  form: ReportFormatFormData = {
    receiveByEmail: false,
    settlementAdviceFormat: 'pdf',
    submissionDetailsFormat: 'pdf',
    emailAddresses: []
  };

  isSubmitting = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private reportFormatService:
      OmsReportFormatService
  ) {}

  ngOnInit() {

    this.loadData();
  }

  loadData() {

    this.reportFormatService
      .getReportFormat()
      .subscribe(data => {

        if (data) {

          this.form = {

            receiveByEmail:
              (data as any).emailReports ??
              (data as any).receiveByEmail ??
              false,

            settlementAdviceFormat:
              (data as any).settlementAdvice ??
              (data as any).settlementAdviceFormat ??
              'pdf',

            submissionDetailsFormat:
              (data as any).submissionDetails ??
              (data as any).submissionDetailsFormat ??
              'pdf',

            emailAddresses:
              (data as any).emailAddresses ?? []
          };
        }

        console.log(
          'Loaded Report Format:',
          data
        );
      });
  }

onSubmit(
    event: ReportFormatFormData
  ) {

    console.log(
      'Report Format Submitted:',
      event
    );

    this.form = event;

    this.isSubmitting = true;

    setTimeout(() => {

      this.reportFormatService
        .saveReportFormat({

          emailReports:
            event.receiveByEmail,

          emailAddresses:
            event.emailAddresses,

          settlementAdvice:
            event.settlementAdviceFormat,

          submissionDetails:
            event.submissionDetailsFormat
        });

      this.isSubmitting = false;

      alert(
        'Report Format Saved Successfully'
      );

    }, 1500);
  }

  onBack() {

    console.log(
      'Back Clicked'
    );

    this.backClicked.emit();
  }
}