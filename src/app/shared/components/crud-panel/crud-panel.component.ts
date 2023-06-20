import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-panel.component.html',
  styleUrls: ['./crud-panel.component.css']
})
export class CrudPanelComponent {
  @Input('configs')configs: Array<{
    type: 'create' | 'reset' | 'update' | 'delete' | 'logout',
    f: Function
  }> = [];
}
