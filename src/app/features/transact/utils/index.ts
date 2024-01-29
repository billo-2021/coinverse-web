import { TransactStep, TransactTab } from '../enums';

function isTransactStep(index: number): index is TransactStep {
  return index >= TransactStep.TRANSACT_REQUEST && index <= TransactStep.TRANSACT_CONFIRMATION;
}

function isTransactTab(index: number): index is TransactTab {
  return index >= TransactTab.DEPOSIT && index <= TransactTab.WITHDRAW;
}

export { isTransactStep, isTransactTab };
