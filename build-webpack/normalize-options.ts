import { getDefaultOptions, WebpackOptions } from './options';

export const normalizeOptions = (userOptions: Partial<WebpackOptions>): WebpackOptions => {
  const defaults = getDefaultOptions();

  return {
    ...defaults,
    ...userOptions,

    entry: userOptions.entry ?? defaults.entry,
    srcDir: userOptions.srcDir ?? defaults.srcDir,
    buildDir: userOptions.buildDir ?? defaults.buildDir,
    publicDir: userOptions.publicDir ?? defaults.publicDir,
    template: userOptions.template ?? defaults.template,
  };
};
