import React from 'react';
import * as Icons from 'lucide-react';
import './StatCard.css';
export default function StatCard({title,value,sub,icon,color='blue',trend}) {
 const Icon=Icons[icon]||Icons.Users;
 return <article className="metric-card"><div className={`metric-icon ${color}`}><Icon size={27}/></div><div className="metric-copy"><span>{title}</span><strong>{value}</strong><small>{trend&&<em>↑</em>}{sub}</small></div><div className={`metric-bars ${color}`}>{[12,18,14,24,29].map((h,i)=><i key={i} style={{height:h}}/>)}</div></article>;
}
