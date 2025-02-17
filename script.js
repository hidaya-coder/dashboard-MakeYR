const chartConfig = {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Visiteurs mensuels',
            borderRadius: 4,
            backgroundColor:function(context) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;
                if (!chartArea) return null;
                
                const gradient = ctx.createLinearGradient(
                    0, chartArea.bottom, 
                    0, chartArea.top
                );
                gradient.addColorStop(0, '#D8F0D5'); 
                gradient.addColorStop(1, '#EAF7E9'); 
                return gradient;
            },
            hoverBackgroundColor: function(context) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;
                if (!chartArea) return null;
                
                const gradient = ctx.createLinearGradient(
                    0, chartArea.bottom, 
                    0, chartArea.top
                );
                gradient.addColorStop(0, '#14A800'); 
                gradient.addColorStop(1, '#96D88E'); 
                return gradient;
            }
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 3500,
                ticks: {
                    stepSize: 500,
                    color: '#333333'
                },
                grid: { color: '#e0f0df' }
            },
            x: {
                ticks: {
                    color: '#333333',
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: { display: false }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#14A800',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#14A800',
                borderWidth: 1
            }
        }
    }
};

const demoData = {
    monthly: [1200, 1800, 2500, 3000, 2800, 3200, 3500, 3400, 3100, 2700, 2100, 1500],
    yearly: Array(12).fill(null).map((_, i) => 1500 + (i * 200))
};

class VisitorChart { // Classe en PascalCase
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = document.createElement('canvas');
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.container.appendChild(this.canvas);

        this.chart = new Chart(this.canvas.getContext('2d'), {
            ...chartConfig,
            data: {
                ...chartConfig.data,
                datasets: [{
                    ...chartConfig.data.datasets[0],
                    data: demoData.monthly
                }]
            }
        });

        this.addEventListeners();
    }

    updateData(dataType) {
        this.chart.data.datasets[0].data = demoData[dataType];
        this.chart.update();
    }

    addEventListeners() {
        document.querySelectorAll('.typeclassification li').forEach(btn => {
            btn.addEventListener('click', () => {
                this.updateData(btn.textContent.toLowerCase());
            });
        });
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    new VisitorChart('chart-container');
});