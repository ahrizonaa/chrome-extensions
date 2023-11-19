import { Example } from './Example';
import { Options } from './Options';

export type Tab = {
  title: string;
  options: Options;
  examples: Example[];
};
