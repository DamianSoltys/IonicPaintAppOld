import {
  Component,
  ViewChild,
  Renderer,
  AfterContentInit,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-canvas-draw',
  templateUrl: './canvas-draw.component.html',
  styleUrls: ['./canvas-draw.component.scss']
})
export class CanvasDrawComponent implements AfterViewInit {
  @ViewChild('myCanvas') canvas: any;

  canvasElement: any;
  lastX: number;
  lastY: number;

  currentColour = '#1abc9c';
  availableColours: any;

  brushSize = 10;

  constructor(public platform: Platform, public renderer: Renderer) {
    console.log('Hello CanvasDraw Component');
    this.availableColours = [
      '#1abc9c',
      '#3498db',
      '#9b59b6',
      '#e67e22',
      '#e74c3c'
    ];
  }
  ngAfterViewInit() {
    this.canvasElement = this.canvas.nativeElement;

    this.renderer.setElementAttribute(
      this.canvasElement,
      'width',
      this.platform.width() + ''
    );
    this.renderer.setElementAttribute(
      this.canvasElement,
      'height',
      this.platform.height() / 1.5 + ''
    );
  }
  changeColour(colour) {
    this.currentColour = colour;
  }

  changeSize(size) {
    this.brushSize = size;
  }
  handleStart(ev) {
    this.lastX = ev.touches[0].pageX;
    this.lastY = ev.touches[0].pageY - ev.target.offsetTop;
  }

  handleMove(ev) {
    console.log(ev);
    const ctx = this.canvasElement.getContext('2d');
    const currentX = ev.touches[0].pageX;
    const currentY = ev.touches[0].pageY - ev.target.offsetTop;

    ctx.beginPath();
    ctx.lineJoin = 'round';
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.strokeStyle = this.currentColour;
    ctx.lineWidth = this.brushSize;
    ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
  }
  clearCanvas() {
    const ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
}
