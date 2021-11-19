import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';

declare let window: any;
declare let document: any;
declare let $: any;

@Component({
	selector: '[loadMore], load-more',
	template: `<loading *ngIf="loading && loader"></loading>`
})
export class LoadMoreDirective {
	mouse_wheel: any;
	_container!: HTMLElement;

	loading: boolean = false;
	_disabled: boolean = false;

	initialLoad: boolean = true;

	@Input('loader') loader: boolean = true;
	@Input('firstLoad') firstLoad: boolean = false;
	@Input('offset') offset: any = 50;
	//@Input('disabled') disabled:boolean = false;
	@Input('container') set container(value: HTMLElement) {
		this._container = value;
	};

	@Output()
	public loadMore = new EventEmitter<any>();

	private el: HTMLElement;

	constructor(el: ElementRef) {
		this.el = el.nativeElement;
	}

	ngOnInit() {

		if (this.firstLoad === true) {
			this.loading = true;
			this.firstLoad = false;
			this.loadMore.emit(this);
			
		}

		if (this._container != undefined) {

			this._container.onscroll = (event: any) => {
				
				let bottom = this._container.scrollTop + this._container.clientHeight + this.offset;
				var el = this.el.offsetTop - this._container.offsetTop;

				console.log(bottom, el, bottom >= el, (!this._disabled), (!this.loading));

				if (bottom >= el && (!this._disabled) && (!this.loading)) {

					this.loading = true;
					this.loadMore.emit(this);
				}
			}
		} else {
			window.onscroll = (event: any) => {
				
				let _container: Window = window;
				let bottom = (_container.scrollY + _container.innerHeight + this.offset);
				if ( 
					 ( bottom >= this.el.offsetTop && (!this._disabled) && (!this.loading) )
					 	
					) {
					this.loading = true;
					this.loadMore.emit(this);
				}
			}
		}
	}

	complete(disabled?: boolean) {
		this.loading = false;
		if (disabled != undefined) {
			this._disabled = disabled;
		}
		//console.log(this._disabled);
	}
	disabled(disabled: boolean = true) {
		this._disabled = disabled;
	}


}
