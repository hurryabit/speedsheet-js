import React from 'react';
import Coord from './Coord';
import 'bootstrap/dist/css/bootstrap.css';

export class CellValue {
  public value: number;
  public formula: string;

  constructor(value: number, formula: string) {
    this.value = value;
    this.formula = formula;
  }

  clone() {
    return new CellValue(this.value, this.formula);
  }
}

type CellProps = {
  value: CellValue;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}

class Cell extends React.Component<CellProps> {
  render() {
    const className = this.props.isSelected ? 'table-primary' : '';
    return (
      <td
        className={className}
        onClick={this.props.onSelect}
        onDoubleClick={this.props.onEdit}
      >
        {this.props.value.value}
      </td>
    );
  }
}

type Props = {
  cols: string[];
  values: CellValue[][];
  selected: Coord;
  onSelect: (coord: Coord) => void;
  onEdit: (coord: Coord) => void;
}

class TableView extends React.Component<Props> {
  render() {
    return (
      <table
        id="sheet"
        className="table table-sm table-bordered text-right"
      >
        <thead>
          <tr className="text-center">
            <th scope="col" style={{width: '10%'}}></th>
            {this.props.cols.map((col, col_index) =>
              <th key={col_index} scope="col" style={{width: '15%'}}>{col}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.values.map((row, row_index) =>
            <tr key={row_index}>
              <th scope="row">{row_index+1}</th>
              {row.map((value, col_index) => {
                const coord = new Coord(row_index, col_index);
                return (
                  <Cell
                    key={col_index}
                    value={value}
                    isSelected={this.props.selected.equals(coord)}
                    onSelect={() => this.props.onSelect(coord)}
                    onEdit={() => this.props.onEdit(coord)}
                  />
                );
              })}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default TableView;
