import axios from 'axios';
import csv from 'csvtojson';
import { pipeAsync } from './common';

const getFormattedDate = (): string => new Date().toISOString().split('T')[0];

const buildHistoricalRankingsUrl = (formattedDate: string): string =>
  `https://raw.githubusercontent.com/beefsack/bgg-ranking-historicals/master/${formattedDate}.csv`;

type GameRank = {
  /** BGG Things ID */
  'ID': string;

  /** Board Game Name */
  'Name': string;

  /** Board Game Publish Year */
  'Year': string;

  /** BGG Board Game Rank */
  'Rank': number;

  /** BGG Board Game Average Rating */
  'Average': number;

  /** BGG Board Game Bayes Average Rating */
  'Bayes average': number;

  /** Total Number of BGG Board Game Rating */
  'Users rated': number;

  /** BGG Relative Board Game URL */
  'URL': string;

  /** Board Game Thumbnail URL */
  'Thumbnail': string;
};

const fetchBggRankings = async (url: string): Promise<GameRank[]> =>
  axios
    .get(url)
    .then((response) => response.data)
    .then((csvData) => csv().fromString(csvData));

export const getHistoricalRankings = async (): Promise<void> => {
  return await pipeAsync(
    getFormattedDate,
    buildHistoricalRankingsUrl,
    fetchBggRankings,
  )('');
};
