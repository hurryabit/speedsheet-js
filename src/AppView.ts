type AppView = {
    sheet_view: SheetView;
}

type SheetView = {
    cols: string[];
    rows: RowView[];
}

type RowView = {
    row: number;
    cells: CellView[];
}

type CellView = {
    name: string;
    value: number;
    formula: string;
    active: boolean;
}

export default AppView;
