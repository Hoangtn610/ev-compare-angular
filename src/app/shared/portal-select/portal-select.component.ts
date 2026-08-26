import { Component, Input, Output, EventEmitter, TemplateRef, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayModule, OverlayRef } from '@angular/cdk/overlay';
import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-portal-select',
    standalone: true,
    imports: [CommonModule, FormsModule, OverlayModule, PortalModule],
    templateUrl: './portal-select.component.html',
    styleUrls: ['./portal-select.component.css']
})
export class PortalSelectComponent {
    @Input() options: any[] = [];
    @Input() placeholder = 'Select';
    @Input() labelKey?: string;
    @Input() valueKey?: string;
    @Input() disabled = false;

    @Input()
    get value(): any {
        return this._value;
    }
    set value(v: any) {
        this._value = v;
    }
    private _value: any = null;

    @Output() valueChange = new EventEmitter<any>();

    @ViewChild('panel') panelTpl!: TemplateRef<any>;
    @ViewChild('trigger', { read: ElementRef }) trigger!: ElementRef<HTMLElement>;

    private overlayRef: OverlayRef | null = null;

    constructor(private overlay: Overlay, private vcr: ViewContainerRef) { }

    open() {
        if (this.disabled) return;
        if (this.overlayRef) {
            this.close();
            return;
        }

        const positionStrategy = this.overlay.position()
            .flexibleConnectedTo(this.trigger.nativeElement)
            .withPush(true)
            .withPositions([
                { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
                { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' }
            ]);

        this.overlayRef = this.overlay.create({
            positionStrategy,
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
            panelClass: 'portal-select-panel'
        });

        const portal = new TemplatePortal(this.panelTpl, this.vcr);
        this.overlayRef.attach(portal);

        this.overlayRef.backdropClick().subscribe(() => this.close());
        this.overlayRef.detachments().subscribe(() => this._clearOverlayRef());
    }

    private _clearOverlayRef() {
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
        }
    }

    close() {
        if (this.overlayRef) {
            this.overlayRef.detach();
            this._clearOverlayRef();
        }
    }

    selectedOption() {
        return this.options.find((option) => this.optionValue(option) === this.value) ?? null;
    }

    optionLabel(option: any) {
        if (this.labelKey && option && typeof option === 'object') return option[this.labelKey];
        if (option && typeof option === 'object') {
            return option.label || option.name || option.model || JSON.stringify(option);
        }
        return option;
    }

    private optionValue(option: any) {
        return this.valueKey ? option[this.valueKey] : option;
    }

    selectOption(opt: any) {
        const val = this.optionValue(opt);
        this._value = val;
        this.valueChange.emit(val);
        this.close();
    }

    displayLabel(opt: any) {
        if (opt == null) return this.placeholder;
        if (this.labelKey && typeof opt === 'object') return opt[this.labelKey];
        if (typeof opt === 'object') return String(opt);
        return String(opt);
    }
}
