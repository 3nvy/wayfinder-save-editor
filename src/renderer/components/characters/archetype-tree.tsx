import {
  GraphCanvas,
  Icon,
  InternalGraphNode,
  NodePositionArgs,
  SphereWithIcon,
  Theme,
} from 'reagraph';
import { useMemo, useState } from 'react';
import ArcanistTreeNodes from '../../tables/archetypeTrees/arcanistTree';
import { useSaveContext } from '../../context/context';
import { MUnlockedTreeData } from '../../saveFileTypes';
import {
  AttributesMetadata,
  AttributesMetadataProps,
} from '../../tables/archetypeTrees/attributesMetadata';

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
  // TEMP
  const { saveStructure, assetsPath } = useSaveContext();

  const archetreeData: MUnlockedTreeData[] = JSON.parse(
    JSON.stringify(
      saveStructure?.playerData.m_ArchetypeTreeData.m_UnlockedTreeData,
    ),
  );

  const [activeNodes, setActiveNodes] = useState(() => {
    const tree = archetreeData.find((entry) => entry.characterName === 'Kyros');
    return (
      tree?.unlockedNodes.map((node) => `${node.treeType}:${node.nodeId}`) ?? []
    );
  });

  // END TEMP
  const [selectedNodeData, setSelectedNodeData] = useState<InternalGraphNode>();

  const nodes = useMemo(() => {
    return ArcanistTreeNodes.map((node) => ({
      id: `${node.type}:${node.id}`,
      // label: `${node.type}:${node.id}`,
      subLabel: node.description,
      fill: `#${node.color}`,
      data: {
        ...node.position,
        attributes: node.attributes,
      },
      cluster: node.type,
      icon: `file://${assetsPath}/${node.icon || AttributesMetadata[node.attributes[0]?.name as AttributesMetadataProps]?.icon}.png`,
      ...(node.type === 'All' && {
        icon: 'file://D:wayfinder-save-editor/assets/Icons/Characters/WF_BattleMage.png',
      }),
      size: node.type === 'All' ? 100 : 30,
    }));
  }, [assetsPath]);

  const edges = useMemo(() => {
    return ArcanistTreeNodes.flatMap((node) =>
      node.connectedNodes.flatMap((cn) => ({
        id: `${node.type}:${node.id}->${cn.type}:${cn.id}`,
        source: `${node.type}:${node.id}`,
        target: `${cn.type}:${cn.id}`,
      })),
    );
  }, []);

  return (
    <div className="z-40 absolute top-0 left-0 w-[calc(100vw-40px)] h-[calc(100vh-170px)] mt-[85px] ml-[20px]">
      {selectedNodeData && (
        <div className="z-50 absolute bg-[#1b164a] w-[300px] bottom-0 right-0 m-[15px]">
          <div className="bg-[#2a105e] p-[5px_10px]">
            <p>{selectedNodeData.data.cluster}</p>
          </div>
          <div className="p-[5px_10px]">
            {selectedNodeData.subLabel ? (
              <p>{selectedNodeData.subLabel}</p>
            ) : (
              selectedNodeData.data.attributes.map((attr: any) => (
                <p>
                  +
                  {attr.value *
                    AttributesMetadata[attr.name as AttributesMetadataProps]
                      .multiplier}{' '}
                  {
                    AttributesMetadata[attr.name as AttributesMetadataProps]
                      .name
                  }
                </p>
              ))
            )}
          </div>
        </div>
      )}

      <GraphCanvas
        theme={theme}
        actives={activeNodes.concat('All:0')}
        selections={['All:0']}
        nodes={nodes}
        edges={edges}
        defaultNodeSize={30}
        minNodeSize={30}
        maxNodeSize={100}
        animated={false}
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
        renderNode={({ node, ...rest }) => {
          if (node.id === 'All:0')
            return <Icon {...rest} node={node} image={node.icon || ''} />;
          return (
            <SphereWithIcon
              {...rest}
              color={node.fill ?? rest.color}
              node={node}
              image={node.icon || ''}
            />
          );
        }}
        onNodeClick={({ id }, props, event) => {
          event?.stopPropagation();

          if (id === 'All:0') return;

          setActiveNodes((nodes) => {
            const hasEntry = nodes.find((nodeID) => nodeID === id);
            if (!hasEntry) {
              return [...nodes, id];
            } else {
              return nodes.filter((nodeID) => nodeID !== id);
            }
          });
        }}
        onNodePointerOver={(node) => {
          if (node.id !== 'All:0') setSelectedNodeData(node);
        }}
        onNodePointerOut={() => {
          setSelectedNodeData(undefined);
        }}
      />
    </div>
  );
};
