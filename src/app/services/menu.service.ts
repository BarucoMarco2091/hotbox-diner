import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc } from '@angular/fire/firestore';
import { Observable } from "rxjs";

export interface MenuItem {
    id?: string;
    nome: string;
    descricao: string;
    preco: number;
    imagem: string;
}

@Injectable({ providedIn: 'root' })
export class MenuService {
    constructor(private firestore: Firestore) {}

    getItens(): Observable<MenuItem[]> {
        const itensRef = collection(this.firestore, 'hamburgueres');
        return collectionData(itensRef, { idField: 'id '}) as Observable<MenuItem[]>;
    }

    addItem(item: MenuItem) {
        const itensRef = collection(this.firestore, 'hamburgueres');
        return addDoc(itensRef, item);
    }

    deleteItem(id: string) {
        const itemDoc = doc(this.firestore, `hamburgueres/${id}`);
        return deleteDoc(itemDoc);
    }
}