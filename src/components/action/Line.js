import Action from './Action';
import { fabric } from 'fabric';
class Line extends Action {
    constructor(App) {
			super('Line', App);
			this.disableObj = null;
		}
		
		addLineResize = (event) => {
			let line = this.getActiveObject();
			const canvas = this.getCanvas();
			const pointer = this.getCanvas().getPointer(event, false);
			line.set({x2 : pointer.x, y2 : pointer.y});
			canvas.renderAll();
		}

		addLineEvent = (event) => {
			const canvas = this.getCanvas();
			if(event.target.tagName === 'CANVAS'){
				this.disableObj = this.getActiveObject();
				if(this.disableObj){
					// disableObj.evented = false;
					this.disableObj.lockMovementY = true;
					this.disableObj.lockMovementX = true;
				}
				const pointer = canvas.getPointer(event, false);
				let line = new fabric.Line([ pointer.x, pointer.y, pointer.x, pointer.y ], {
					left : pointer.x,
					right :pointer.y,
					strokeWidth : 5,
					stroke : 'black',
					fill : 'black'
				})
				canvas.add(line).setActiveObject(line);
				canvas.selection = false;
				canvas.on('mouse:move', this.addLineResize);
				canvas.on('mouse:up', this.addLineEndEvent);
			}
			canvas.defaultCursor = 'default';
			document.removeEventListener('mousedown', this.addLineEvent);
		}
	
		addLineEndEvent = () => {
			const canvas = this.getCanvas();
			canvas.off('mouse:move', this.addLineResize);
			// console.log('off')
			canvas.selection = true;
			canvas.renderAll();
			this.getImageEditor().saveState('line add');
			if(this.disableObj){
				this.disableObj.lockMovementY = false;
				this.disableObj.lockMovementX = false;
				this.disableObj = null;
			}
			canvas.off('mouse:up', this.addLineEndEvent);
		}

		addLine = () => {
			const canvas = this.getCanvas();
			canvas.defaultCursor = 'pointer';
			canvas.discardActiveObject();
			document.addEventListener('mousedown',this.addLineEvent);    
		}
}
export default Line;