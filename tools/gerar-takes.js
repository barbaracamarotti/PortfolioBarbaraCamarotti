// Gera os takes leves do site a partir dos renders originais em Assets/Videos/Enobrecimentos.
// Uso: FFMPEG=caminho/do/ffmpeg node tools/gerar-takes.js
// Os renders repetem o mesmo ciclo de luz a cada 4 s, então um ciclo já forma um loop perfeito.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FF = process.env.FFMPEG || 'ffmpeg';
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'Assets', 'Videos', 'Enobrecimentos');
const OUT = path.join(ROOT, 'midia', 'takes');
fs.mkdirSync(OUT, { recursive: true });

// speed: o holográfico tem ciclo de 6 s e é acelerado para caber nos mesmos 4 s dos demais.
const FINISHES = [
  ['ouro', 'Hot Stamping (Ouro).mp4'],
  ['dourado', 'Hot Stamping (Dourado).mp4'],
  ['prata', 'Hot Stamping (Prata).mp4'],
  ['azul', 'Hot Stamping (Azul).mp4'],
  ['vermelho', 'Hot Stamping (Vermelho).mp4'],
  ['arco-iris', 'Hot Stamping (Arco Íris).mp4'],
  ['fosco', 'Fosco.mp4'],
  ['verniz-localizado', 'Verniz Localizado.mp4'],
  ['fosca-verniz', 'Laminação fosca e Verniz localizado.mp4'],
  ['brilho-total', 'Verniz Total Brilho Frente.mp4'],
  ['holografico', 'Laminação Holográfico.mp4', 1.5],
];

const run = (args) => execFileSync(FF, ['-y', '-v', 'error', ...args], { stdio: 'inherit' });

for (const [slug, file, speed = 1] of FINISHES) {
  const input = path.join(SRC, file);
  const pts = `setpts=PTS/${speed}`;
  const seconds = String(4 * speed);
  const encode = (width, crf, name) =>
    run(['-t', seconds, '-i', input, '-an', '-vf', `${pts},scale=${width}:-2,fps=30`, '-t', '4',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-pix_fmt', 'yuv420p',
      '-g', '15', '-movflags', '+faststart', path.join(OUT, name)]);
  encode(1280, 25, `${slug}.mp4`);
  encode(480, 29, `${slug}-mini.mp4`);
  run(['-ss', '1.3', '-i', input, '-frames:v', '1', '-vf', 'scale=1280:-2', '-quality', '76', path.join(OUT, `${slug}.webp`)]);
  run(['-ss', '1.3', '-i', input, '-frames:v', '1', '-vf', 'scale=480:-2', '-quality', '72', path.join(OUT, `${slug}-mini.webp`)]);
  console.log('ok', slug);
}

// Montagem curta usada no card do projeto: 1 s de cada acabamento, em corte seco.
const REEL = ['ouro', 'holografico', 'azul', 'verniz-localizado', 'arco-iris', 'vermelho', 'brilho-total', 'prata'];
const inputs = REEL.flatMap((s) => ['-ss', '1', '-t', '1', '-i', path.join(OUT, `${s}.mp4`)]);
const chain = REEL.map((_, i) => `[${i}:v]`).join('') + `concat=n=${REEL.length}:v=1:a=0,scale=960:-2[v]`;
run([...inputs, '-filter_complex', chain, '-map', '[v]', '-an', '-c:v', 'libx264', '-preset', 'slow', '-crf', '26',
  '-pix_fmt', 'yuv420p', '-movflags', '+faststart', path.join(OUT, 'reel.mp4')]);
console.log('ok reel');
