const fs = require('fs');
const path = require('path');

async function main() {
    const filePath = path.join(__dirname, '../lib/games/players-db.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extrai jogadores do banco de dados (ID, Nome, Último Clube cadastrado)
    const players = [];
    const regex = /name:\s*'([^']+)'[\s\S]*?clubs:\s*\[((?:'[^']+',?\s*)*)\]/g;
    let match;
    while ((match = regex.exec(fileContent)) !== null) {
        const name = match[1];
        const clubsStr = match[2];
        const clubsArr = clubsStr.split(',').map(s => s.replace(/'/g, '').trim()).filter(Boolean);
        players.push({ name, currentClubDB: clubsArr[clubsArr.length - 1] });
    }

    console.log(`\n🔎 Iniciando mega-auditoria de ${players.length} jogadores via Sofascore...\n`);

    const discrepancies = [];
    const maxToCheck = players.length; 
    let checked = 0;

    for (let i = 0; i < maxToCheck; i++) {
        const p = players[i];
        try {
            // Chamada à API pública (search) do Sofascore
            const res = await fetch(`https://api.sofascore.com/api/v1/search/all?q=${encodeURIComponent(p.name)}`, {
                headers: { 
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                    'Accept': 'application/json'
                }
            });
            const data = await res.json();
            
            // Filtra pelo primeiro jogador retornado na busca
            const playerResult = data.results?.find(r => r.type === 'player');
            if (playerResult && playerResult.entity && playerResult.entity.team) {
                const realCurrentTeam = playerResult.entity.team.name;
                
                // Comparação string-friendly para evitar falsos positivos
                if (!realCurrentTeam.toLowerCase().includes(p.currentClubDB.toLowerCase()) && 
                    !p.currentClubDB.toLowerCase().includes(realCurrentTeam.toLowerCase())) {
                    
                    discrepancies.push({
                        player: p.name,
                        nossoBanco: p.currentClubDB,
                        sofascore: realCurrentTeam
                    });
                    
                    console.log(`⚠️ DISCREPÂNCIA ENCONTRADA: ${p.name}`);
                    console.log(`   > Banco Futle: ${p.currentClubDB}`);
                    console.log(`   > Sofascore 2026: ${realCurrentTeam}\n`);
                }
            }
        } catch (err) {
            // Silencia falhas individuais de rede
        }

        checked++;
        // DELAY CRÍTICO: Sofascore usa Cloudflare. Se for muito rápido, o IP será banido.
        await new Promise(r => setTimeout(r, 800)); 
        
        if (checked % 50 === 0) {
            console.log(`\n⏳ Progresso: ${checked} / ${maxToCheck} jogadores analisados...\n`);
            // Salva checkpoints parciais
            fs.writeFileSync(path.join(__dirname, 'divergencias_sofa.json'), JSON.stringify(discrepancies, null, 2));
        }
    }

    console.log('\n✅ Auditoria Sofascore Concluída!');
    console.log(`Total de jogadores com mudança de clube reportada: ${discrepancies.length}`);
    fs.writeFileSync(path.join(__dirname, 'divergencias_sofa.json'), JSON.stringify(discrepancies, null, 2));
    console.log('📄 Relatório completo gerado em "scripts/divergencias_sofa.json"');
}

main();
