import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Pastel {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CardapioService {
  private collectionName = 'hamburgueres';

  constructor(private firestore: Firestore) {}

  // Buscar todos os itens como Observable (você usa subscribe no componente)
  get menuItems(): Observable<Pastel[]> {
    const itensRef = collection(this.firestore, this.collectionName);
    return collectionData(itensRef, { idField: 'id' }) as Observable<Pastel[]>;
  }

  // Adicionar novo item no Firestore
  async adicionarPastel(pastel: Pastel) {
    const itensRef = collection(this.firestore, this.collectionName);
    await addDoc(itensRef, pastel);
  }

  // Remover item pelo id
  async removerPastel(id: string) {
    const docRef = doc(this.firestore, this.collectionName, id);
    await deleteDoc(docRef);
  }
}
