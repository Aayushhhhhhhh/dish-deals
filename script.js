let allDeals = [];

fetch('https://docs.google.com/spreadsheets/d/1Zt4vb39E_D9yZ-bJ8huW-mNM4dy3rL-R-a8i0FE0eqY/gviz/tq?tqx=out:csv')
  .then(r => r.text())
  .then(text => {
      const rows = text.split('\n').slice(1);
      allDeals = rows.map(r => {
          const [dish,restaurant,price,fee] = r.split(',');
          return {dish, restaurant, price: Number(price), fee: Number(fee), total: Number(price)+Number(fee)};
      });
  });

function findDeal(){
  const budget = Number(document.getElementById('budget').value);
  const ok = allDeals.filter(d => d.total <= budget).sort((a,b) => a.total - b.total);
  const best = ok[0];
  document.getElementById('result').innerHTML = best ?
    `<h2>Best deal: ${best.dish} at ${best.restaurant} — ₹${best.total}</h2>` :
    `<h2>Nothing under ₹${budget} right now.</h2>`;
}
