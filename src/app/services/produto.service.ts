import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc, CollectionReference, DocumentData } from "@angular/fire/firestore";
import { Produto } from "../models/produto";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProdutoService {
  private colecao!: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.colecao = collection(this.firestore, 'produtos');
  }

  listar(): Observable<Produto[]> {
    return collectionData(this.colecao, { idField: 'id' }) as Observable<Produto[]>;
  }

  adicionar(produto: Produto) {
    return addDoc(this.colecao, produto);
  }

  remover(id: string) {
    const docRef = doc(this.firestore, 'produtos', id);
    return deleteDoc(docRef);
  }

  atualizar(id: string, dados: Partial<Produto>) {
    const docRef = doc(this.firestore, 'produtos', id);
    return updateDoc(docRef, dados);
  }
}
