let allDeals = [];

fetch('https://docs.google.com/spreadsheets/d/1Zt4vb39E_D9yZ-bJ8huW-mNM4dy3rL-R-a8i0FE0eqY/gviz/tq?tqx=out:csv')
  .then(r => r.text())
  .then(text => {
      const rows = text.trim().split('\n').slice(1).filter(r => r.trim() !== '');
      allDeals = rows.map(r => {
          const parts = r.split(',').map(c => c.trim().replace(/^"+|"+$/g, ''));
          const price  = Number(parts[2]);
          const fee    = Number(parts[3]);
          if (isNaN(price) || isNaN(fee)) return null;
          return {
              dish:       parts[0],
              restaurant: parts[1],
              price,
              fee,
              total: price + fee
          };
      }).filter(Boolean);
  });

function findDeal(){
  const budget = Number(document.getElementById('budget').value);
  const ok = allDeals.filter(d => d.total <= budget).sort((a,b) => a.total - b.total);
  const best = ok[0];
  document.getElementById('result').innerHTML = best ?
    `<h2>Best deal: ${best.dish} at ${best.restaurant} — ₹${best.total}</h2>` :
    `<h2>Nothing under ₹${budget} right now.</h2>`;
}

document.getElementById('findBtn').addEventListener('click', findDeal);
