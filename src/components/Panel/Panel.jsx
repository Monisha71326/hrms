import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Panel.css';
export default function Panel({title,action='View All',onAction,children,className=''}) {
 return <section className={`content-panel ${className}`}><div className="content-panel-heading"><h2>{title}</h2>{action&&<button onClick={onAction}>{action}<ArrowRight size={15}/></button>}</div><div className="content-panel-body">{children}</div></section>;
}
