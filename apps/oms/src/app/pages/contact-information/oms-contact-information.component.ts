import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexContactInformationFormComponent,
  ContactSection,
  ContactRow
} from '@ui-components/ui';

import {
  OmsContactInformationService
} from '../../services/oms-contact-information.service';

const EMPTY_ROW = (): ContactRow => ({
  name: '',
  jobTitle: '',
  email: '',
  countryCode: '+971',
  landline: '',
  mobile: ''
});

const SECTION_TITLES = [
  'Marketing',
  'Finance',
  'Operations'
];

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-contact-information',

  standalone: true,

  imports: [
    CommonModule,
    AmexContactInformationFormComponent
  ],

  templateUrl:
    './oms-contact-information.component.html',
})
export class OmsContactInformationComponent
  implements OnInit {

  @Input()
  sectionTitle =
    'CONTACT INFORMATION';

  @Output()
  backClicked =
    new EventEmitter<void>();

  errorMessage = '';

  contactName = '';

  websiteUrl = '';

  omsEmail = '';

  backLabel =
    'Back';

  saveLabel =
    'Save';

  sections: ContactSection[] = [];

  countryCodes = [

    {
      value: '+971',
      label: 'UAE (+971)'
    },

    {
      value: '+91',
      label: 'India (+91)'
    },

    {
      value: '+1',
      label: 'USA (+1)'
    },

    {
      value: '+44',
      label: 'UK (+44)'
    }
  ];

  isSubmitting = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private contactService:
      OmsContactInformationService
  ) {}

  ngOnInit() {

    this.loadContacts();
  }

  loadContacts() {

    this.sections =
      SECTION_TITLES.map(
        title => {

          const existing =
            this.contactService
              .getBySection(title);

          const contacts: ContactRow[] =
            existing.length > 0
              ? existing.map(
                  c => ({
                    name: c.name || '',
                    jobTitle: (c as any).jobTitle || c.designation || '',
                    email: c.email || '',
                    countryCode: c.countryCode || '+971',
                    landline: (c as any).landline || '',
                    mobile: (c as any).mobile || c.phone || ''
                  })
                )
              : [
                  EMPTY_ROW(),
                  EMPTY_ROW(),
                  EMPTY_ROW()
                ];

          return {
            title,
            contacts
          };
        }
      );

    console.log(
      'Loaded Sections:',
      this.sections
    );
  }

  onSubmit(
    event: {
      contactName: string;
      websiteUrl: string;
      omsEmail: string;
      sections: ContactSection[];
    }
  ) {

    console.log(
      'Save Clicked:',
      event
    );

    this.errorMessage = '';

    for (const section of event.sections) {

      for (const contact of section.contacts) {

        const hasAnyValue =
          contact.name?.trim() ||
          contact.jobTitle?.trim() ||
          contact.email?.trim() ||
          contact.landline?.trim() ||
          contact.mobile?.trim();

        if (!hasAnyValue) {

          continue;
        }

        if (!contact.name?.trim()) {

          this.errorMessage =
            'Some unexpected error has occurred. We are sorry for the inconvenience. Please try again after sometime.';

          alert(
            `Name is required in ${section.title}`
          );

          return;
        }

        if (
          contact.email?.trim() &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)
        ) {

          alert(
            `Please enter a valid email address in ${section.title}`
          );

          return;
        }
      }
    }

    this.isSubmitting = true;

    setTimeout(() => {

      for (const section of event.sections) {

        this.contactService
          .saveSectionData(
            section.title,
            section.contacts
          );
      }

      this.isSubmitting = false;

      alert(
        'Contact Information Saved Successfully'
      );

      this.loadContacts();

    }, 1500);
  }

  onBack() {

    console.log(
      'Back Clicked'
    );

    this.backClicked.emit();
  }
}