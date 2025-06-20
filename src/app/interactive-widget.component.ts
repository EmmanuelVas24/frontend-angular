import { Component } from '@angular/core';

@Component({
  selector: 'app-interactive-widget',
  templateUrl: './interactive-widget.component.html',
  styleUrls: ['./interactive-widget.component.css']
})
export class InteractiveWidgetComponent {
  hovered = false;
  clicked = false;
  hoverCount = 0;
  clickCount = 0;
  apiMessage = '';

  onHover() {
    this.hovered = true;
    this.hoverCount++;
  }

  onLeave() {
    this.hovered = false;
    this.clicked = false;
  }

  onClick() {
    this.clicked = true;
    this.clickCount++;
    setTimeout(() => this.clicked = false, 600);
  }

  async sendActivity() {
    this.apiMessage = '';
    const payload = {
      name: 'rocket',
      hovers: this.hoverCount,
      clicks: this.clickCount,
      time: new Date().toISOString()
    };
    try {
      const res = await fetch('http://[::1]:3000/widget-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        this.apiMessage = 'Activity sent successfully!';
      } else {
        this.apiMessage = 'Failed to send activity.';
      }
    } catch (e: any) {
      this.apiMessage = 'Error: ' + (e.message || 'Unknown error');
    }
  }
}
