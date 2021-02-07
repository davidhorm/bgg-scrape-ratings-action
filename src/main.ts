import * as core from '@actions/core';
import { getHistoricalRankings } from './use-cases/get-historical-rankings';

async function run(): Promise<void> {
  try {
    getHistoricalRankings();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
