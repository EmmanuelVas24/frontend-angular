import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements AfterViewInit {
  error = '';

  async ngAfterViewInit() {
    try {
      const res = await fetch('http://[::1]:3000/widget-activities');
      if (!res.ok) throw new Error('Failed to fetch activity data');
      const data = await res.json();
      this.renderChart(data);
    } catch (e: any) {
      this.error = e.message || 'Unknown error';
    }
  }

  async renderChart(data: any[]) {
    // Dynamically load Chart.js
    const Chart = (await import('chart.js/auto')).default;
    const ctx = (document.getElementById('activityChart') as HTMLCanvasElement).getContext('2d');
    if (!data || data.length === 0) return;
    // Show all values, but label only the start and end times
    const labels = data.map((d, i) => {
      if (i === 0 || i === data.length - 1) {
        return new Date(d.time).toLocaleString();
      } else {
        return '';
      }
    });
    const hovers = data.map(d => d.hovers);
    const clicks = data.map(d => d.clicks);
    new Chart(ctx!, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Hovers',
            data: hovers,
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25,118,210,0.1)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Clicks',
            data: clicks,
            borderColor: '#d32f2f',
            backgroundColor: 'rgba(211,47,47,0.1)',
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Rocket Widget Activity' }
        },
        scales: {
          x: { title: { display: true, text: 'Time' } },
          y: { title: { display: true, text: 'Count' }, beginAtZero: true }
        }
      }
    });
  }
}
