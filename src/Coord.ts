class Coord {
    row: number;
    col: number;

    constructor(row: number, col: number) {
      this.row = row;
      this.col = col;
    }

    toString = () =>
      String.fromCharCode('A'.charCodeAt(0) + this.col) + (this.row+1).toString();

    static fromString = (s: string) => {
      const col = s.charCodeAt(0) - 'A'.charCodeAt(0);
      const row = Number.parseInt(s.slice(1)) - 1;
      return new Coord(row, col);
    }

    equals(other: Coord): boolean {
      return this.row === other.row && this.col === other.col;
    }
  };

export default Coord;
