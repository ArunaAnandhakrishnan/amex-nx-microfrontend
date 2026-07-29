import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  AmexAddDeleteMerchantPanelComponent,
  AccentCardComponent
} from '@ui-components/ui';

import {
  Merchant
} from '../../models/merchant.model';

import {
  OmsMerchantService
} from '../../services/oms-merchant.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-merchant-panel',

  standalone: true,

  imports: [
    CommonModule,
    AmexAddDeleteMerchantPanelComponent,
    AccentCardComponent
  ],

  templateUrl:
    './oms-merchant-panel.component.html',

  styleUrls: [
    './oms-merchant-panel.component.css'
  ]
})
export class OmsMerchantPanelComponent
  implements OnInit {

  @Output()
  startClicked =
    new EventEmitter<void>();

  @Output()
  backClicked =
    new EventEmitter<void>();

  /** 'menu' = the ADD/DELETE landing card with the two links.
   * 'add' / 'delete' = the corresponding form. */
  view: 'menu' | 'add' | 'delete' = 'menu';

  menuTitle = 'ADD/DELETE A MERCHANT ACCOUNT';

  /** Now rendered outside amex-add-delete-merchant-panel (its [showTitle] is false), directly above the card. */
  addFormTitle = 'To add new Merchant Number, please enter the following details';
  deleteFormTitle = 'Delete an existing Merchant Account';

  merchantOptions: any[] = [];

  merchants: Merchant[] = [];

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private merchantService:
      OmsMerchantService
  ) {}

  isAddingMerchant = false;

  isDeletingMerchant = false;

  ngOnInit() {

    this.loadMerchants();
  }

  loadMerchants() {

    this.merchantService
      .getMerchants()
      .subscribe(merchants => {

        this.merchants =
          merchants;

        this.merchantOptions =
          merchants.map(
            merchant => ({

              merchantNo:
                merchant.merchantNo,

              ibanLast5Digits:
                merchant.ibanLast5Digits,

              label:
                merchant.merchantNo
            })
          );

        console.log(
          'Merchant List:',
          merchants
        );
      });
  }

  onMenuLinkClick(id: string) {

    console.log(
      'Merchant Menu:',
      id
    );

    if (id === 'add') {

      this.view = 'add';
    }

    if (id === 'delete') {

      this.view = 'delete';
    }
  }

  onPanelBack() {

    console.log(
      'Back to Add/Delete Menu'
    );

    this.view = 'menu';
  }

  onAddMerchant(
  event: any
) {

  console.log(
    'NEW CODE EXECUTED'
  );

  console.log(
    'Add Merchant Event:',
    event
  );
  const merchantNo =
    event?.merchantNo;

  const ibanLast5Digits =
    event?.lastFiveIban;

  const tradeLicense =
    event?.tradeLicense;

    console.log(
  'IBAN:',
  ibanLast5Digits,
  typeof ibanLast5Digits
);

  if (
    !merchantNo ||
    ibanLast5Digits === null ||
    ibanLast5Digits === undefined ||
    !tradeLicense
  ) {

    alert(
      'Please enter all fields'
    );

    return;
  }

  const ibanValue =
    String(
      ibanLast5Digits
    ).trim();

  if (
  ibanValue.length !== 5 ||
  !/^\d+$/.test(ibanValue)
) {

  console.log(
    'IBAN VALIDATION FAILED'
  );

  alert(
    'Please enter exactly 5 numeric digits from the IBAN.'
  );

  return;
}

  const isAdded =
    this.merchantService
      .addMerchant(
        merchantNo,
        ibanValue
      );

  if (isAdded) {

    alert(
      'Merchant Added Successfully'
    );

    this.view = 'menu';

  } else {

    alert(
      'Merchant already exists'
    );
  }
}

  onDeleteMerchant(
  merchantNos: string[]
) {

  console.log(
    'Delete Merchants:',
    merchantNos
  );

  if (!merchantNos?.length) {

    alert(
      'Please select at least one merchant to delete'
    );

    return;
  }

  merchantNos.forEach(merchantNo => {

    this.merchantService
      .deleteMerchant(
        merchantNo
      );
  });

  alert(
    'Merchant Deleted'
  );

  this.view = 'menu';

  this.loadMerchants();
}

  onStart() {

    console.log(
      'Start Clicked'
    );

    this.startClicked.emit();
    this.backClicked.emit();
  }
}