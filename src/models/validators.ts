
import { HttpResponse } from '@/types/common';

export interface PubKey {
  type: string;
  value: string;
}

export interface Validator {
  address: string;
  pub_key?: PubKey;
  voting_power: string,
  proposer_priority: string,
  voting_percentage: number,
  moniker: string,
  operator_address: string
}

export class ValidatorResponse {
  address: string;
  voting_power: string;
  proposer_priority: string;
  voting_percentage: number;
  moniker: string;
  operator_address: string

  constructor(props?: Validator) {
    this.address = props?.address ?? '';
    this.voting_power = props?.voting_power ?? '';
    this.proposer_priority = props?.proposer_priority ?? '';
    this.voting_percentage = props?.voting_percentage ?? 0;
    this.moniker = props?.moniker ?? '';
    this.operator_address = props?.operator_address ?? ''
  }
}

export type ValidatorsResponse = HttpResponse<{
  Validators: ValidatorResponse[];
}>;

