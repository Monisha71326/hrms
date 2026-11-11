import React from 'react';
import './DataTable.css';
export default function DataTable({columns,rows,emptyMessage='No records found',rowAction}) {
 return <div className="data-table-wrap"><table className="hrms-table"><thead><tr>{columns.map(c=><th key={c}>{c}</th>)}{rowAction&&<th>Actions</th>}</tr></thead><tbody>{rows.map((row,i)=><tr key={row.id||i}>{row.cells.map((cell,j)=><td key={j}>{cell}</td>)}{rowAction&&<td><button className="table-action" onClick={()=>rowAction(row)}>View details</button></td>}</tr>)}</tbody></table>{!rows.length&&<div className="table-empty">{emptyMessage}</div>}</div>;
}
