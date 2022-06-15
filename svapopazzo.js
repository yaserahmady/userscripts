(function () {
  "use strict";

  const percentage = 15;

  const format = (num, decimals) =>
    num.toLocaleString("it-IT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  function calculate() {
    var prices = document.querySelectorAll("bdi");

    prices.forEach((price) => {
      if (price.innerText.includes("€")) {
        var value = parseFloat(
          price.innerText.replace(",", ".").replace("€", "")
        );
        var deal = value - value * (percentage / 100);
        price.innerText = `${format(deal)}€ (${format(
          value
        )}€ - ${percentage}%)`;
      }
    });
  }

  calculate();
})();
