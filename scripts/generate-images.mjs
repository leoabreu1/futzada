import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.INFSH_API_KEY;

if (!API_KEY) {
  console.error('Erro: Configure a variavel INFSH_API_KEY');
  console.log('\n  $env:INFSH_API_KEY="inf_sua_chave_aqui"');
  console.log('  node scripts/generate-images.mjs');
  console.log('\nA chave deve comecar com inf_ (pegue em https://inference.sh Settings > API Keys)');
  process.exit(1);
}

if (!API_KEY.startsWith('inf_')) {
  console.warn(`AVISO: Sua chave comeca com "${API_KEY.slice(0, 6)}..." mas deveria comecar com "inf_"`);
  console.warn('Verifique em https://inference.sh Settings > API Keys\n');
}

const GAMES = {
  'jogo-da-velha': 'Flat vector illustration for a football tic-tac-toe game, 3x3 grid with soccer ball icons as X and O, dark background, neon green and yellow accent colors, modern minimal game UI art, no text',
  'wordle': 'Flat vector illustration for a football word guessing game, row of colored letter tiles glowing green yellow and gray, dark background, modern minimal game UI art, clean typography aesthetic, no text',
  'quem-e-o-craque': 'Flat vector illustration of a mysterious football player silhouette behind frosted glass blur effect, magnifying glass overlay, dark background with cyan accent lighting, modern minimal game UI art, no text',
  'conexoes': 'Flat vector illustration of 4 groups of connected dots forming clusters, purple and blue neon colors, dark background, abstract network pattern, modern minimal game UI art, no text',
  'carreira': 'Flat vector illustration of a football career path, winding road with club shield milestones, dark background, pink and green gradient, modern minimal game UI art, no text',
  'duelo': 'Flat vector illustration of two football players face to face in versus battle pose, VS symbol between them, dark background, red lighting, modern minimal game UI art, no text',
  'linha-do-tempo': 'Flat vector illustration of a horizontal timeline with football event markers, teal and blue colors, dark background, modern minimal game UI art, no text',
  'escudo': 'Flat vector illustration of a fragmented football club shield breaking into puzzle pieces, blue glow, dark background, modern minimal game UI art, no text',
  'camisa': 'Flat vector illustration of a classic football jersey number 10, golden yellow color, dark background, modern minimal game UI art, no text',
};

async function generateImage(prompt) {
  // URL correta: https://api.inference.sh/apps/run
  const res = await fetch('https://api.inference.sh/apps/run', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app: 'falai/flux-dev-lora',
      input: {
        prompt,
        image_size: { width: 600, height: 400 },
      },
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${res.status}: ${JSON.stringify(data)}`);
  }

  // Tenta extrair URL da imagem
  if (data?.output?.images?.[0]?.url) return data.output.images[0].url;
  if (data?.output?.images?.[0]?.uri) return data.output.images[0].uri;
  if (data?.output?.image?.url) return data.output.image.url;
  if (data?.output?.image?.uri) return data.output.image.uri;
  if (typeof data?.output === 'string') return data.output;

  // Debug: mostra resposta completa
  console.log('    Resposta:', JSON.stringify(data).slice(0, 300));
  throw new Error('Formato inesperado');
}

async function main() {
  console.log('Gerando imagens com inference.sh (FLUX)...');
  console.log(`API Key: ${API_KEY.slice(0, 10)}...\n`);

  const imageUrls = {};

  for (const [game, prompt] of Object.entries(GAMES)) {
    try {
      process.stdout.write(`  ${game}... `);
      const url = await generateImage(prompt);
      imageUrls[game] = url;
      console.log('OK');
    } catch (err) {
      console.log(`ERRO: ${err.message}`);
    }
  }

  const generated = Object.keys(imageUrls).length;
  if (generated === 0) {
    console.error('\nNenhuma imagem gerada.');
    console.error('Verifique se sua API key comeca com inf_ e esta ativa.');
    console.error('Crie em: https://inference.sh (Settings > API Keys)');
    process.exit(1);
  }

  const tsContent = `// Auto-generated — run: node scripts/generate-images.mjs
export const GAME_IMAGES: Record<string, string> = ${JSON.stringify(imageUrls, null, 2)};

export function getGameImage(gameType: string): string {
  return GAME_IMAGES[gameType as keyof typeof GAME_IMAGES] ?? '';
}
`;

  const outPath = join(__dirname, '..', 'lib', 'generated-images.ts');
  writeFileSync(outPath, tsContent);
  console.log(`\n${generated} imagens geradas -> lib/generated-images.ts`);
}

main().catch(console.error);
