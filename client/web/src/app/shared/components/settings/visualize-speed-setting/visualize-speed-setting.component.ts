import { Component, OnInit, Input } from '@angular/core';
import { PathFindingSettings } from 'src/app/core/models/pathFindingSettings/pathFindingSettings';

@Component({
  selector: 'app-visualize-speed-setting',
  templateUrl: './visualize-speed-setting.component.html',
  styleUrls: ['./visualize-speed-setting.component.scss']
})
export class VisualizeSpeedSettingComponent implements OnInit {

  @Input() settings: PathFindingSettings;
  @Input() isPlaying: boolean;

  constructor() { }

  ngOnInit() {
  }

}
