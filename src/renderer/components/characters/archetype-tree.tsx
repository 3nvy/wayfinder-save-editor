/* eslint-disable @typescript-eslint/no-shadow */
import {
  CollapseProps,
  GraphCanvas,
  GraphEdge,
  GraphNode,
  Icon,
  InternalGraphNode,
  NodePositionArgs,
  SphereWithIcon,
  Theme,
} from 'reagraph';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import ArcanistTreeNodes from '../../tables/archetypeTrees/arcanistTree';
import SurvivalistTreeNodes from '../../tables/archetypeTrees/survivalistTree';
import WarmasterTreeNodes from '../../tables/archetypeTrees/warmasterTree';
import { useSaveContext } from '../../context/context';
import { MUnlockedTreeData, SaveData } from '../../saveFileTypes';
import {
  AttributesMetadata,
  AttributesMetadataProps,
} from '../../tables/attributesMetadata';
import { CharacterInfo } from '../../curves/character-level-curve';

type ArchetypeTreeProps = {
  character: string;
  onClose: () => void;
};

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
    activeFill: '#963ded',
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

const ArchetypeTrees = {
  WarmasterArchetype: WarmasterTreeNodes,
  SurvivalistArchetype: SurvivalistTreeNodes,
  ArcanistArchetype: ArcanistTreeNodes,
};

const treeIndexes: { [key: string]: number } = {
  '1': 2,
  '2': 3,
  '3': 4,
  '4': 5,
  '5': 6,
  '6': 7,
  '7': 8,
  '8': 9,
  '9': 10,
  '10': 11,
  '11': 12,
  '12': 13,
  '13': 14,
  '14': 15,
  '15': 16,
  '16': 17,
  '17': 18,
  '18': 19,
  '19': 20,
  '20': 21,
  '21': 22,
  '22': 23,
  '23': 24,
  '24': 25,
  '25': 26,
  '26': 27,
  '27': 28,
  '28': 29,
  '29': 30,
  '30': 31,
  '31': 32,
  '32': 33,
  '33': 34,
  '34': 35,
  '35': 36,
  '36': 37,
  '37': 1,
  '38': 2,
  '39': 3,
  '40': 4,
  '41': 5,
  '42': 6,
  '43': 7,
  '44': 8,
  '45': 9,
  '46': 10,
  '47': 11,
  '48': 12,
  '49': 13,
  '50': 14,
  '51': 15,
  '52': 16,
  '53': 17,
  '54': 18,
  '55': 19,
  '56': 20,
  '57': 21,
  '58': 22,
  '59': 23,
  '60': 24,
  '61': 25,
  '62': 26,
  '63': 27,
  '64': 28,
  '65': 29,
  '66': 30,
  '67': 32,
  '68': 33,
  '69': 34,
  '70': 35,
  '71': 36,
  '72': 37,
  '73': 1,
  '74': 2,
  '75': 3,
  '76': 4,
  '77': 5,
  '78': 6,
  '79': 7,
  '80': 8,
  '81': 9,
  '82': 10,
  '83': 11,
  '84': 12,
  '85': 13,
  '86': 14,
  '87': 15,
  '88': 16,
  '89': 17,
  '90': 18,
  '91': 19,
  '92': 20,
  '93': 21,
  '94': 22,
  '95': 23,
  '96': 24,
  '97': 25,
  '98': 26,
  '99': 27,
  '100': 29,
  '101': 30,
  '102': 31,
  '103': 32,
  '104': 33,
  '105': 34,
  '106': 35,
  '107': 36,
  '108': 37,
  '109': 31,
  '110': 1,
  '111': 28,
};

export const ArchetypeTree = ({ character, onClose }: ArchetypeTreeProps) => {
  const { saveStructure, saveNewValues, assetsPath } = useSaveContext();

  const [selectedNodeData, setSelectedNodeData] = useState<InternalGraphNode>();

  const characterInfo = CharacterInfo[character as keyof typeof CharacterInfo];

  const archetreeData: MUnlockedTreeData[] = useMemo(() => {
    return JSON.parse(
      JSON.stringify(
        saveStructure?.playerData.m_ArchetypeTreeData.m_UnlockedTreeData,
      ),
    );
  }, [saveStructure?.playerData.m_ArchetypeTreeData.m_UnlockedTreeData]);

  const nodes: GraphNode[] = useMemo(() => {
    const treeNodes =
      ArchetypeTrees[characterInfo.archtypeTree as keyof typeof ArchetypeTrees];
    return treeNodes.map((node) => ({
      id: `${node.type}:${node.id}`,
      label: `${node.type}:${node.id}`,
      subLabel: node.description,
      fill: `#${node.color}`,
      data: {
        ...node.position,
        attributes: node.attributes,
      },
      cluster: node.type,
      icon: `file://${assetsPath}/${node.icon || AttributesMetadata[node.attributes[0]?.name as AttributesMetadataProps]?.icon}.png`,
      ...(node.type === 'All' && {
        icon: `file://${assetsPath}/${characterInfo.icon}.png`,
      }),
      size: node.type === 'All' ? 100 : 30,
    }));
  }, [assetsPath, characterInfo.archtypeTree, characterInfo.icon]);

  const edges: GraphEdge[] = useMemo(() => {
    const treeNodes =
      ArchetypeTrees[characterInfo.archtypeTree as keyof typeof ArchetypeTrees];
    const edgesMap = new Map();

    treeNodes.forEach((node) =>
      node.connectedNodes.forEach((cn) => {
        const idx = [`${node.type}:${node.id}`, `${cn.type}:${cn.id}`]
          .sort()
          .toString();

        edgesMap.set(idx, {
          id: `${node.type}:${node.id}->${cn.type}:${cn.id}`,
          source: `${node.type}:${node.id}`,
          target: `${cn.type}:${cn.id}`,
          size: 4,
        });
      }),
    );

    return [...edgesMap].map(([, v]) => v);
  }, [characterInfo.archtypeTree]);

  const [activeNodes, setActiveNodes] = useState(() => {
    const tree = archetreeData.find(
      (entry) => entry.characterName === characterInfo.name,
    );

    const newData =
      tree?.unlockedNodes.map((node) => `${node.treeType}:${node.nodeId}`) ??
      [];

    const selectedEdges = edges
      .filter((edge) => {
        const [id1, id2] = edge.id.split('->');
        return newData.includes(id1) && newData.includes(id2);
      })
      .map((edge) => edge.id);

    return [...newData, ...selectedEdges];
  });

  const onTalentTreeSave = useCallback(() => {
    const newSaveData = JSON.parse(JSON.stringify(saveStructure)) as SaveData;

    const treeNodes =
      ArchetypeTrees[characterInfo.archtypeTree as keyof typeof ArchetypeTrees];
    const nodes = activeNodes.filter((nodeID) => !nodeID.includes('->'));
    const [unlockedNodes, unlockableNodes] = nodes.reduce(
      (acc, nodeID) => {
        const [type, id] = nodeID.split(':');
        const nodeEntry = treeNodes.find(
          (node) => node.id === id && node.type === type,
        )!;

        acc[0].push({
          nodeId: nodeEntry.id,
          bIsNetworked: nodeEntry.bIsNetworked,
          bIsNetworkUnlocked: nodeEntry.bIsNetworked,
          treeType: nodeEntry.type,
          treeIndex: treeIndexes[nodeEntry.id],
        });

        nodeEntry.connectedNodes.forEach((node) => {
          if (!nodes.includes(`${node.type}:${node.id}`))
            acc[1].push({
              connectedNodeId: nodeEntry.id,
              treeType: node.type,
              index: treeIndexes[node.id],
            });
        });

        return acc;
      },
      [[], []] as any,
    );

    const tree = archetreeData.find(
      (entry) => entry.characterName === characterInfo.name,
    );

    if (tree) {
      tree.unlockedNodes = unlockedNodes;
      tree.unlockableNodes = unlockableNodes;
    } else {
      const newArchTree: MUnlockedTreeData = {
        characterName: characterInfo.name,
        unlockedNodes,
        unlockableNodes,
        fogSoulSlotIndexes: [],
      };

      archetreeData.push(newArchTree);
    }

    newSaveData.playerData.m_ArchetypeTreeData.m_UnlockedTreeData =
      archetreeData;
    saveNewValues(newSaveData);
  }, [
    activeNodes,
    archetreeData,
    characterInfo.archtypeTree,
    characterInfo.name,
    saveNewValues,
    saveStructure,
  ]);

  const onNodeClick = useCallback(
    ({ id }: InternalGraphNode, _: CollapseProps | undefined, event: any) => {
      event?.stopPropagation();

      if (id === 'All:0') return;

      setActiveNodes((currentActiveNodes) => {
        const hasEntry = currentActiveNodes.find((nodeID) => nodeID === id);
        const newData = (
          hasEntry
            ? currentActiveNodes.filter((nodeID) => nodeID !== id)
            : [...currentActiveNodes, id]
        ).filter((nodeID) => !nodeID.includes('->'));

        const selectedEdges = edges
          .filter((edge) => {
            const [id1, id2] = edge.id.split('->');
            return newData.includes(id1) && newData.includes(id2);
          })
          .map((edge) => edge.id);

        return [...newData, ...selectedEdges];
      });
    },
    [edges],
  );

  /**
   * Node Bulk Actions
   */
  const onSelectAll = useCallback(() => {
    setActiveNodes([...nodes.map((n) => n.id), ...edges.map((e) => e.id)]);
  }, [edges, nodes]);

  const onSelectAllOfType = useCallback(
    (type: string) => {
      const selectedTypeNodeIDs = nodes
        .filter((node) => node.id.includes(type))
        .map((node) => node.id);

      const nonDefensiveActiveNodesIDs = activeNodes.filter(
        (nodeID) => !nodeID.includes('->') && !nodeID.includes(type),
      );

      const newSelectedNodes = [
        ...selectedTypeNodeIDs,
        ...nonDefensiveActiveNodesIDs,
      ];

      const selectedEdges = edges
        .filter((edge) => {
          const [id1, id2] = edge.id.split('->');
          return (
            newSelectedNodes.includes(id1) && newSelectedNodes.includes(id2)
          );
        })
        .map((edge) => edge.id);

      setActiveNodes([...newSelectedNodes, ...selectedEdges]);
    },
    [activeNodes, edges, nodes],
  );

  return (
    <div className="z-40 absolute top-0 left-0 w-[calc(100vw-40px)] h-[calc(100vh-105px)] mt-[85px] ml-[20px]">
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
                <p key={attr.id}>
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

      <div className="z-40 absolute flex gap-3 m-6">
        <Button className="flex gap-2" onClick={onClose}>
          <ArrowLeftIcon /> Go Back
        </Button>
        <Button onClick={onTalentTreeSave}>Save</Button>
      </div>

      <div className="z-40 absolute right-0 flex flex-col gap-3 m-6">
        <Button onClick={() => setActiveNodes([])}>Clear All</Button>
        <Button onClick={onSelectAll}>Select All</Button>
        <Button onClick={() => onSelectAllOfType('Offensive')}>
          Select All Offensive
        </Button>
        <Button onClick={() => onSelectAllOfType('Support')}>
          Select All Support
        </Button>
        <Button onClick={() => onSelectAllOfType('Defensive')}>
          Select All Defensive
        </Button>
      </div>

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
            // eslint-disable-next-line @typescript-eslint/no-shadow
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
        onNodeClick={onNodeClick}
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
