const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'divergencias_sofa.json');
const dbPath = path.join(__dirname, '../lib/games/players-db.ts');

if (!fs.existsSync(jsonPath)) {
    console.log("Arquivo divergencias_sofa.json não encontrado!");
    process.exit(1);
}

const divergencias = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
let content = fs.readFileSync(dbPath, 'utf8');
let atualizados = 0;

for (const diff of divergencias) {
    const pName = diff.player;
    const newClub = diff.sofascore;
    const oldClub = diff.nossoBanco;
    
    // Filtro 1: Nomes Iguais/Semelhantes ignorando hífens, acentos e caixas (Ex: Al Nassr vs Al-Nassr)
    const nNew = newClub.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    const nOld = oldClub.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    if (nNew.includes(nOld) || nOld.includes(nNew)) continue;
    
    // Filtro 2: Ignorar times de base (U10, U19, U21, reserves, B) e femininos (- W, Women)
    if (/(U\d+|Youth|Academy|Reserves| B\b|\bB\b|\bII\b|\bW\b|- W|-W)/i.test(newClub)) continue;

    // Filtro Adicional para evitar lixo do Sofascore
    if (newClub.length > 25 || newClub.includes("?") || newClub.includes("Unknown")) continue;

    const escapedName = pName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedOld = oldClub.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Procuramos o array de clubes do jogador com regex para substituir EXATAMENTE a entrada final.
    // Assim não quebramos outras entradas do mesmo clube.
    // Captura o bloco do jogador até a lista de clubes e substitui o último.
    const regex = new RegExp(`(name:\\s*'${escapedName}'[\\s\\S]*?clubs:\\s*\\[.*?)'${escapedOld}'(\\s*\\])`, 'g');
    
    // Apenas se encontrar na Regex ele prossegue, pois substitui em memória  
    if (regex.test(content)) {
        // Atualizando o time, resetando o test index
        regex.lastIndex = 0;
        content = content.replace(regex, `$1'${escapedOld}', '${newClub}'$2`);
        atualizados++;
        console.log(`✅ [ATUALIZADO] ${pName}: adicionado '${newClub}' ao histórico.`);
    }
}

fs.writeFileSync(dbPath, content, 'utf8');
console.log(`\n🎉 Processo concluído! Um total de ${atualizados} jogadores receberam um novo clube a partir do relatório.`);
