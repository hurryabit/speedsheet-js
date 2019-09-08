import React from 'react';
import AppView from './AppView';
import Coord from './Coord';
import FormulaForm from './FormulaForm';
import TableView, { CellValue } from './TableView';
import 'bootstrap/dist/css/bootstrap.css';

type Props = {}

type State = {
  cols: string[];
  values: CellValue[][];
  selected: Coord;
  editing: boolean;
}

class Sheet extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      cols: ['A'],
      values: [[new CellValue(0, '0')]],
      selected: new Coord(0, 0),
      editing: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:8000/view_json')
      .then(response => response.json())
      .then((app_view: AppView) => {
        const cols = app_view.sheet_view.cols;
        const values = app_view.sheet_view.rows.map((row_view) =>
          row_view.cells.map(({value, formula}) =>
            new CellValue(value, formula)
          )
        );
        this.setState({cols: cols, values: values});
      })
      .catch((error) => {
        alert('Connection to server failed: ' + error);
      });
  }

  handleSelect = (coord: Coord) => {
    this.setState({
      selected: coord,
      editing: false,
    });
  }

  handleEdit = (coord: Coord) => {
    this.setState({
      selected: coord,
      editing: true,
    })
  }

  handleEnter = (newFormula: string) => {
    const { selected, values } = this.state;
    const body = { coord: selected.toString(), formula: newFormula };
    fetch('http://localhost:8000/update', {
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' },
        method: 'post',
    })
    .then((response) => response.json())
    .then((data: Result<Log, string>) => {
      switch (data.kind) {
        case 'Ok': {
          const newValues = values.map((row) => row.map((value) => value.clone()));
          for (const entry of data.ok) {
            const coord = Coord.fromString(entry.coord);
            newValues[coord.row][coord.col].value = entry.to;
          }
          newValues[selected.row][selected.col].formula = newFormula;
          this.setState({
            values: newValues,
            editing: false,
          })
          break;
        }
        case 'Err': {
          alert(data.err);
          break;
        }
        default: impossible(data);
      }
    })
    .catch((error) => {
      alert('Connection to server failed: ' + error);
    });
  }

  render() {
    const { cols, values, selected, editing } = this.state;
    const value = selected ? values[selected.row][selected.col].formula : '';
    return (
      <div className="col-9">
        <TableView
          cols={cols}
          values={values}
          selected={selected}
          onSelect={this.handleSelect}
          onEdit={this.handleEdit}
        />
        <FormulaForm
          editing={editing}
          value={value}
          onEnter={this.handleEnter}
        />
      </div>
    );
  }
}

type LogEntry = {
  coord: string;
  from: number;
  to: number;
}

type Log = LogEntry[];

class Ok<T> {
  public kind: 'Ok' = 'Ok';
  public ok: T;
  constructor(ok: T) {
      this.ok = ok;
  }
}

class Err<E> {
  public kind: 'Err' = 'Err';
  public err: E;
  constructor(err: E) {
      this.err = err;
  }
}

type Result<T, E> = Ok<T> | Err<E>;

function impossible(x: never): never {
  return x;
}

export default Sheet;
