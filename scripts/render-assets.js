import upath from 'upath';
import sh from 'shelljs';

export default function renderAssets() {
  const sourcePath = upath.resolve('./src/assets');
  const destPath = upath.resolve('./docs/.');

  sh.cp('-R', sourcePath, destPath);
};
