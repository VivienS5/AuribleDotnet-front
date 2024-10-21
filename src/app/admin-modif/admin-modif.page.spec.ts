import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminModifPage } from './admin-modif.page';

describe('AdminModifPage', () => {
  let component: AdminModifPage;
  let fixture: ComponentFixture<AdminModifPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModifPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
