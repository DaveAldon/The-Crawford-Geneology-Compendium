import React from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import FamilyNode from '../FamilyNode/FamilyNode';
import ReactFamilyTree from '../../components/react-family-tree';
import { ExtNode, Node } from '../../components/relatives-tree/types';
import styles from './Tree.module.css';

const WIDTH = 80;
const HEIGHT = 110;

interface ITree {
  nodes: Node[];
  rootId: string;
  setRootId: (id: string) => void;
}
export const Tree: React.FC<ITree> = props => {
  const { nodes, rootId, setRootId } = props;
  return (
    <TransformWrapper centerOnInit initialScale={1}>
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <div className={styles.wrapper}>
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <ReactFamilyTree
              nodes={nodes}
              rootId={rootId}
              width={WIDTH}
              height={HEIGHT}
              className={styles.tree}
              renderNode={(node: ExtNode) => (
                <FamilyNode
                  key={node.id}
                  node={node}
                  isRoot={node.id === rootId}
                  onSubClick={setRootId}
                  photoSrc={`https://i.pravatar.cc/150?u=${node.id}`}
                  name={node.name}
                  style={{
                    width: WIDTH,
                    height: HEIGHT,
                    transform: `translate(${node.left * (WIDTH / 2)}px, ${
                      node.top * (HEIGHT / 2)
                    }px)`,
                  }}
                />
              )}
            />
          </TransformComponent>
        </div>
      )}
    </TransformWrapper>
  );
};
