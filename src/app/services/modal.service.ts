import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: IModal[] = []

  constructor() { }

  register(id: string) {
    this.modals.push({
      id,
      visable: false
    })
  }

  unregister(id: string) {
    this.modals = this.modals.filter(element => element.id !== id)
  }

  isModalOpen(id: string): boolean {
    return Boolean(this.modals.find(element => element.id === id)?.visable);
  }
  toggleModal(id: string) {
    const modal = this.modals.find(element => element.id === id);

    if (modal) {
      modal.visable = !modal.visable;
    }
  }
}
