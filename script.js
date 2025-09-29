fetch('https://docs.google.com/spreadsheets/d/1Zt4vb39E_D9yZ-bJ8huW-mNM4dy3rL-R-a8i0FE0eqY/gviz/tq?tqx=out:csv')
  .then(r => r.text())
  .then(text => {
      const rows = text.split('\n').slice(1);          // remove header
      const cheapest = rows.map(r => {
          const [dish,restaurant,price,fee,area,date] = r.split(',');
          return {dish, restaurant, price: Number(price), fee: Number(fee)};
      }).sort((a,b) => (a.price + a.fee) - (b.price + b.fee))[0];

      document.body.innerHTML += `
        <h2>Cheapest deal right now</h2>
        <p><strong>${cheapest.dish}</strong> at <strong>${cheapest.restaurant}</strong></p>
        <p>Total ₹${cheapest.price + cheapest.fee}</p>
      `;
  });
