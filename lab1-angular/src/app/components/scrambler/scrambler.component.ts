import { ThrowStmt } from '@angular/compiler';
import { Component, Input } from '@angular/core';

export enum Method {
  column,
  visioner,
  playfair,
}

@Component({
  selector: 'app-scrambler',
  templateUrl: './scrambler.component.html',
  styleUrls: ['./scrambler.component.scss'],
})
export class ScramblerComponent {
  toPerform: any;
  afterCalc: any;
  key: any;
  blockwidth: any;
  @Input() method: Method | undefined;
  @Input() isEncrypt: boolean | undefined;

  calc() {
    this.toPerform = this.toPerform.replace(/\s/g, '');
    switch (this.method) {
      case Method.column:
        this.afterCalc = this.isEncrypt
          ? this.columnEncrypt()
          : this.columnDecrypt();
        break;
      case Method.visioner:
        this.afterCalc = this.isEncrypt
          ? this.visionerEncrypt()
          : this.visionerDecrypt();
        break;
      case Method.playfair:
        this.afterCalc = this.isEncrypt
          ? this.playfairEncrypt()
          : this.playfairDecrypt();
        break;
    }
  }

  columnEncrypt(): string {
    let encrypted = '';
    let precedence: number[] = this.setPresedence(this.key);
    const arrHeight = Math.ceil(this.toPerform.length / this.key.length);
    let matrix = [];
    let startInd = 0;
    for (let i = 0; i < arrHeight; i++) {
      // matrix.fill(this.toPerform.slice(0, matrix.length-1));
      let substring = this.toPerform.slice(
        startInd,
        startInd + this.key.length
      );
      matrix.push([...substring]);
      startInd += this.key.length;
    }
    for (let j = 0; j < this.key.length; j++) {
      for (let i = 0; i < arrHeight; i++) {
        encrypted += matrix[i][precedence.indexOf(j)]
          ? matrix[i][precedence.indexOf(j)]
          : '';
      }
    }

    return encrypted;
  }

  //the lower the number - the more the presedence
  setPresedence(key: string): Array<number> {
    let sortedKey = [...key].sort();
    let sortedInd = 0,
      priorityInd = 0;
    let precedence = new Array<number>(key.length);
    // let copyOfKey = key;
    [...key].forEach((val, ind) => {
      sortedInd = sortedKey.indexOf(val);
      precedence[ind] = sortedInd;
      sortedKey[sortedInd] = '';
    });
    return precedence;
  }

  columnDecrypt() {}
  visionerEncrypt() {}
  visionerDecrypt() {}
  playfairEncrypt() {}
  playfairDecrypt() {}
}