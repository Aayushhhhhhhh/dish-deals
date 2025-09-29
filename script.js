let allDeals = [];

fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vS0OU7UPBuTcZb33al8Z7MCuknxEvOz-QY1Zdh3YP_-Quc5jLVLv6vy2Iqg56eJ6J7OW9t1dnU-R72U/pub?output=csv')
  .then(r => r.text())
  .then(text => {
    const rows = text.trim().split('\n').slice(1)   // remove header
    .filter(r => r.trim() !== '');   // throw away blank lines
    
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
    };
  }).filter(Boolean); // remove nulls
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
