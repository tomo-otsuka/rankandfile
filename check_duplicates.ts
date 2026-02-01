
import { PLAYERS } from './src/services/mockData';

const ids = PLAYERS.map(p => p.id);
const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);

if (duplicates.length > 0) {
    console.log('Duplicate IDs found:', duplicates);
} else {
    console.log('No duplicate IDs in PLAYERS.');
}
