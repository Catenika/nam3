import { convertTimeFormat } from '@/lib/date';

import { HttpResponse } from '@/types/common';

export interface LastestBlock {
  block_id: string;
  header_version_app?: number;
  header_version_block?: number;
  header_chain_id?: string;
  header_height: string;
  header_time: string;
  header_last_block_id_hash?: string;
  header_last_block_id_parts_header_total?: number;
  header_last_block_id_parts_header_hash?: string;
  header_last_commit_hash?: string;
  header_data_hash: string;
  header_validators_hash?: string;
  header_next_validators_hash?: string;
  header_consensus_hash?: string;
  header_app_hash?: string;
  header_last_results_hash?: string;
  header_evidence_hash?: string;
  header_proposer_address: string;
  commit_height?: number;
  commit_round?: number;
  commit_block_id_hash?: string;
  commit_block_id_parts_header_total?: number;
  commit_block_id_parts_header_hash?: string;
  transactions_count: string;
}

export class LastestBlockResponse {
  block_id: string;
  header_height: string;
  header_data_hash: string;
  header_time: string;
  header_proposer_address: string;
  transactions_count: string;

  constructor(props?: LastestBlock) {
    this.block_id = props?.block_id ?? '';
    this.header_height = props?.header_height ?? '';
    this.header_data_hash = props?.header_data_hash ?? '';
    this.header_time = convertTimeFormat(props?.header_time) ?? '';
    this.header_proposer_address = props?.header_proposer_address ?? '';
    this.transactions_count = props?.transactions_count ?? '0';
  }
}

export type LastestBlockRes = HttpResponse<{
  lastestBlocks: LastestBlockResponse;
}>;
