let allDeals = [];

fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vS0OU7UPBuTcZb33al8Z7MCuknxEvOz-QY1Zdh3YP_-Quc5jLVLv6vy2Iqg56eJ6J7OW9t1dnU-R72U/pub?output=csv')
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
document.getElementById('findBtn').addEventListener('click', findDeal);
