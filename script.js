function calculateInvestment() {
    const amount = parseFloat(document.getElementById("amount").value);
    const years = parseInt(document.getElementById("years").value);
    const rate = parseFloat(document.getElementById("rate").value) / 100;
    const topup = parseFloat(document.getElementById("topup").value) || 0;
    const frequency = document.getElementById("frequency").value;

    let periods;
    if (frequency === "monthly") periods = 12;
    else if (frequency === "quarterly") periods = 4;
    else if (frequency === "half-yearly") periods = 2;
    else periods = 1;

    let values = [];
    let invested = [];
    let totalAmount = amount;

    for (let i = 1; i <= years * periods; i++) {
        totalAmount += topup;
        totalAmount *= (1 + rate / periods);
        values.push(totalAmount);
        invested.push(amount + i * topup);
    }

    const ctx = document.getElementById("investmentChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: Array.from({ length: years * periods }, (_, i) => i + 1),
            datasets: [
                { label: "Invested Amount", data: invested, backgroundColor: "blue" },
                { label: "Actual Account Value", data: values, borderColor: "red", type: "line" }
            ]
        }
    });
}


function clearFields() {
    document.getElementById("amount").value = "";
    document.getElementById("years").value = "";
    document.getElementById("rate").value = "";
    document.getElementById("topup").value = "";
    document.getElementById("frequency").selectedIndex = 0;

    // Clear the chart
    const ctx = document.getElementById("investmentChart").getContext("2d");
    if (window.investmentChartInstance) {
        window.investmentChartInstance.destroy();
    }

    window.investmentChartInstance = new Chart(ctx, { ... });
}
