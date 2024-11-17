import { GraphCanvas, NodePositionArgs, Theme } from 'reagraph';
import ArcanistTreeNodes from '../../tables/archetypeTrees/arcanistTree';

const theme: Theme = {
  canvas: { background: '#141633' },
  node: {
    fill: '#7CA0AB',
    activeFill: '#1DE9AC',
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.2,
    label: {
      color: '#2A6475',
      stroke: '#fff',
      activeColor: '#1DE9AC',
    },
    subLabel: {
      color: '#ddd',
      stroke: 'transparent',
      activeColor: '#1DE9AC',
    },
  },
  lasso: {
    border: '1px solid #55aaff',
    background: 'rgba(75, 160, 255, 0.1)',
  },
  ring: {
    fill: '#D8E6EA',
    activeFill: '#1DE9AC',
  },
  edge: {
    fill: '#D8E6EA',
    activeFill: '#1DE9AC',
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: '#fff',
      color: '#2A6475',
      activeColor: '#1DE9AC',
      fontSize: 6,
    },
  },
  arrow: {
    fill: '#D8E6EA',
    activeFill: '#1DE9AC',
  },
  cluster: {
    stroke: '#D8E6EA',
    opacity: 1,
    selectedOpacity: 1,
    inactiveOpacity: 0.1,
    label: {
      stroke: '#fff',
      color: '#2A6475',
    },
  },
};

function rotateAroundOrigin(x: number, y: number, angleDegrees: number) {
  // Convert angle from degrees to radians
  const angleRadians = angleDegrees * (Math.PI / 180);

  // Calculate the new x and y positions
  const newX = x * Math.cos(angleRadians) - y * Math.sin(angleRadians);
  const newY = x * Math.sin(angleRadians) + y * Math.cos(angleRadians);

  // return increaseDistanceRelative(newX, newY, 500);
  return { newX, newY };
}

const getRotateAngle = (type: string) => {
  switch (type) {
    case 'Support':
      return -121;
    case 'Offensive':
      return 121;
    case 'Defensive':
      return 180;
    default:
      return 0;
  }
};

export const ArchetypeTree = () => {
  const edges = ArcanistTreeNodes.flatMap((node) =>
    node.connectedNodes.flatMap((cn) => ({
      id: `${node.type}:${node.id}->${cn.type}:${cn.id}`,
      source: `${node.type}:${node.id}`,
      target: `${cn.type}:${cn.id}`,
    })),
  );

  return (
    <div className="z-50 bg-slate-500">
      <GraphCanvas
        theme={theme}
        nodes={ArcanistTreeNodes.map((node) => ({
          id: `${node.type}:${node.id}`,
          // label: `${node.type}:${node.id}`,
          fill: `#${node.color}`,
          data: node.position,
          cluster: node.type,
          ...(node.type === 'All' && {
            icon: 'file://D:wayfinder-save-editor/assets/Icons/Characters/WF_Tactician.png',
          }),
          size: node.type === 'All' ? 100 : 20,
        }))}
        edges={edges}
        defaultNodeSize={20}
        minNodeSize={20}
        maxNodeSize={100}
        edgeArrowPosition="none"
        layoutType="custom"
        layoutOverrides={
          {
            getNodePosition: (id: string, { nodes }: NodePositionArgs) => {
              const idx = nodes.findIndex((n) => n.id === id);
              const node = nodes[idx];

              const { newX, newY } = rotateAroundOrigin(
                node.data.X,
                node.data.Y,
                getRotateAngle(node.cluster ?? ''),
              );

              const isEdgeNode = node.data.X === 0 && node.data.Y === 3;
              const step = isEdgeNode ? 100 : 40;

              /**
               * The positions provided by the game files are not accurate to their position in the UI.
               * If its the bottom tree (aka Defensive), we need to invert the X axis
               * If its any other tree, we need to invert the Y axis
               */
              const isDefensive = node.cluster === 'Defensive';

              if (node.cluster === 'All') {
                return {
                  x: 0,
                  y: 0,
                  z: 1,
                };
              } else if (isEdgeNode) {
                return {
                  x: newX * step,
                  y: (!isDefensive ? newY * -1 : newY) * step,
                  z: 1,
                };
              } else {
                const angles = rotateAroundOrigin(
                  0,
                  3,
                  getRotateAngle(node.cluster ?? ''),
                );
                return {
                  x:
                    (isDefensive ? newX * -1 : newX) * step +
                    angles.newX * step,
                  y:
                    (!isDefensive ? newY * -1 : newY) * step +
                    (!isDefensive ? angles.newY * -1 : angles.newY) * step,
                  z: 1,
                };
              }
            },
          } as any
        }
        // renderNode={({ node, ...rest }) => (
        //   <SphereWithSvg {...rest} node={node} image={node.icon || ''} />
        // )}
      />
    </div>
  );
};
