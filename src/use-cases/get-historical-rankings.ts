import axios from 'axios';
import { pipeAsync } from './common';

const getFormattedDate = (): string => new Date().toISOString().split('T')[0];

const buildHistoricalRankingsUrl = (formattedDate: string): string =>
  `https://raw.githubusercontent.com/beefsack/bgg-ranking-historicals/master/${formattedDate}.csv`;

const fetchBggRankings = async (url: string): Promise<string> =>
  axios.get(url).then((response) => response.data);

const _TEMP_printValue = (value: string): void => {
  console.log('printValue: ', value.length);
};

export const getHistoricalRankings = async (): Promise<void> => {
  await pipeAsync(
    getFormattedDate,
    buildHistoricalRankingsUrl,
    fetchBggRankings,
    _TEMP_printValue,
  )('');
};
