import { Directive, Renderer, ElementRef, OnInit, OnDestroy, OnChanges, Input, SimpleChange } from '@angular/core';



import './index.less';


//用来操作dom的内部辅助渲染类
class RippleRenderer{
    // ripple 的背景
    private _backgroundDiv: HTMLElement;
    // ripple 的宿主元素
    private _rippleElement: HTMLElement;
    // 事件监听需要注册的元素
    private _triggerElement: HTMLElement;
    private _bgColor: string;
    private _fColor: string;

    constructor(_elementRef: ElementRef, private _eventHandlers: Map<string, (e: Event) => void>, bgColor: string, fColor: string){
        this._rippleElement = _elementRef.nativeElement;
        this._backgroundDiv = null;
        this._bgColor = bgColor;
        this._fColor = fColor;
    }   


    createBackgroundDivIfNeeded() {
        if(!this._backgroundDiv) {
            this._backgroundDiv = document.createElement('div');
            this._backgroundDiv.classList.add('ripple-background');
            this._rippleElement.appendChild(this._backgroundDiv);
        }
    }

    setTriggerElement(triger) {
        if(this._triggerElement !== triger) {
            // 先把老的trigger事件去掉
            if(this._triggerElement) {
                this._eventHandlers.forEach((handler, eventName) => {
                    this._triggerElement.removeEventListener(eventName, handler);
                });
            }
            this._triggerElement = triger;
            if(this._triggerElement) {
                this._eventHandlers.forEach((handler, eventName) => {
                    this._triggerElement.addEventListener(eventName, handler);
                });
            }
        }
    }

    setTriggerElementToHost() {
        this.setTriggerElement(this._rippleElement);
    }

    clearTriggerElement() {
        this.setTriggerElement(null);
    }

    // 创建前景,这期先简单，只从中心触发
    createForegroundRipple() {
        const parentRect = this._rippleElement.getBoundingClientRect();

        const startX = (parentRect.left + parentRect.width / 2);
        const startY = (parentRect.top + parentRect.height / 2);

        const offsetX = startX - parentRect.left;
        const offsetY = startY - parentRect.top;

        const radius = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

        const rippleDiv = document.createElement('div');
        this._rippleElement.appendChild(rippleDiv);
        rippleDiv.classList.add('ripple-foreground');
        rippleDiv.style.left = `${offsetX - radius}px`;
        rippleDiv.style.top = `${offsetY - radius}px`;
        rippleDiv.style.width = `${2 * radius}px`;
        rippleDiv.style.height = rippleDiv.style.width;
        if(this._fColor) {
            rippleDiv.style.backgroundColor = this._fColor;
        }
        rippleDiv.style.transform = `scale(0.001)`;
        rippleDiv.style.transitionDuration = `3000s`;
        rippleDiv.classList.add('ripple-fade-in');

        // todo remove 掉
        setTimeout(() => {
            this.removeRippleFromDom(rippleDiv);
        },1000);
    }
    
    
    // 前景消失
    fadeOutForegroundRipple(ripple: Element) {
        ripple.classList.remove('ripple-fade-in');
        ripple.classList.add('ripple-fade-out');
    }

    // dom 中移除前景
    removeRippleFromDom(ripple: Element) {
        if (ripple && ripple.parentElement) {
            ripple.parentElement.removeChild(ripple);
        }
    }

    //背景出现
    fadeInBackgroundRipple() {
        this._backgroundDiv.classList.add('ripple-active');
        if(this._bgColor) {
            this._backgroundDiv.style.backgroundColor = this._bgColor;
        }
    }

    //背景消失
    fadeOutBackgroundRipple() {
        this._backgroundDiv.classList.remove('ripple-active');
    }
}  



// 属性型指令
@Directive({
    selector: '[ripple]'
})
export class Ripple implements OnInit, OnDestroy, OnChanges{


    private _rippleRenderer: RippleRenderer;
    private trigger: Element;

    @Input('ripple-disabled') private disabled: boolean;
    @Input('ripple-background-color') private bgColor: string; 
    @Input('ripple-color') private fColor: string; 


    constructor(elementRef:ElementRef){
        const eventHandlers = new Map<string, (e: Event) => void>();
        eventHandlers.set('mousedown', (event: MouseEvent) => this._mouseDown(event));
        eventHandlers.set('click', (event: MouseEvent) => this._click(event));
        eventHandlers.set('mouseleave', (event: MouseEvent) => this._mouseLeave(event));
        this._rippleRenderer = new RippleRenderer(elementRef, eventHandlers, this.bgColor, this.fColor);
    }

    ngOnInit() {
        // If no trigger element was explicity set, use the host element
        if (!this.trigger) {
            this._rippleRenderer.setTriggerElementToHost();
        }
        if (!this.disabled) {
            this._rippleRenderer.createBackgroundDivIfNeeded();
        }
    }
    ngOnDestroy() {
        // Remove event listeners on the trigger element.
        this._rippleRenderer.clearTriggerElement();
    }
    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        // If the trigger element changed (or is being initially set), add event listeners to it.
        const changedInputs = Object.keys(changes);
        if (changedInputs.indexOf('trigger') !== -1) {
            this._rippleRenderer.setTriggerElement(this.trigger);
        }
        if (!this.disabled) {
            this._rippleRenderer.createBackgroundDivIfNeeded();
        }
    }
    start() {
        this._rippleRenderer.createBackgroundDivIfNeeded();
        this._rippleRenderer.fadeInBackgroundRipple();
    }
    end() {
        this._rippleRenderer.createForegroundRipple();
        this._rippleRenderer.fadeOutBackgroundRipple();
    }
    // 创建背景,同时背景出现
    _mouseDown(event) {
        if (!this.disabled && event.button === 0) {
            this.start();
        }
    }
    // 创建前景，同时背景消失
    _click(event) {
        if (!this.disabled && event.button === 0) {
            this.end();
        }
    }
    // 背景消失
    _mouseLeave(event) {
        this._rippleRenderer.fadeOutBackgroundRipple();
    }
}

 