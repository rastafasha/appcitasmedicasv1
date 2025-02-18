import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcumsComponent } from './breadcums.component';

describe('BreadcumsComponent', () => {
    let component: BreadcumsComponent;
    let fixture: ComponentFixture<BreadcumsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BreadcumsComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BreadcumsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});