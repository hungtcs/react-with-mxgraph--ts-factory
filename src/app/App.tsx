import './App.scss';
import mxgraphFactory from 'mxgraph';
import React, { Component } from 'react';

export class App extends Component {
  private containerRef: React.RefObject<HTMLDivElement> = React.createRef();

  public componentDidMount() {
    (window as any)['mxBasePath'] = 'assets';
    const mx = mxgraphFactory({
      mxBasePath: 'assets',
    });

    mx.mxGraph;   // typeof mx.mxGraph is any

    const graph = new mx.mxGraph(this.containerRef.current);
    graph.setPanning(true);

    const model = graph.getModel();
    const parent = graph.getDefaultParent();
    model.beginUpdate();
    try {
      const cell1 = graph.insertVertex(parent, '', 'React', 0, 0, 100, 100);
      const cell2 = graph.insertVertex(parent, '', 'mxGraph', 200, 200, 100, 100);
      graph.insertEdge(parent, '', 'with', cell1, cell2);
    } finally {
      model.endUpdate();
    }
  }

  public render() {
    return (<div className="diagram-container" ref={ this.containerRef }></div>);
  }

}
