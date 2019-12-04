export default class Data {
    constructor(name, header, rows) {
      this.name = name
      this.header = header
      this.rows = rows
    }
}

export const emptyRow = ['-', '-', '-', '-', '-']
export const emptyTable = [emptyRow, emptyRow, emptyRow, emptyRow, emptyRow]
