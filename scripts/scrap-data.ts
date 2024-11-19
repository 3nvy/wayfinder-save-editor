const fs = require('fs');
const path = require('path');

// Specify the folder path where your JSON files are located
const folderPath = './raw'; // Change this to your folder path

const parseArchtypeTree = (data) => {
  const type = data.Properties.SubtreeType.split('::')[1];
  const nodes = data.Properties.Nodes.map((node) => ({
    id: node.NodeID,
    type: node.OwningSubTreeTrype.split('::')[1],
    bIsNetworked: node.bIsNetworkedNode,
    connectedNodes: node.ConnectedNodes.map((cn) => ({
      id: cn.ConnectedNodeID,
      type: cn.TreeType.split('::')[1],
      index: cn.Index,
    })),
    connectedNodeNetwork: node.ConnectedNodeNetwork.map((cn) => ({
      id: cn.ConnectedNodeID,
      type: cn.TreeType.split('::')[1],
      index: cn.Index,
    })),
    position: node.Position,
    color: node.Color.Hex,
    attributes: node.AttributesToAdd.Entries.map((attr) => ({
      name: attr.Attribute.AttributeName,
      value: attr.Amount.Value,
    })),
    description: node.Description?.SourceString?.replace(/<[^>]*>?/gm, ''),
    icon: node.spIcon.AssetPathName.includes('T_UI_MissingTextureIcon')
      ? ''
      : node.spIcon.AssetPathName.replace(
          '/Game/UI/UI_WF_Textures/',
          '',
        ).replace(/\.[^.]*$/, ''),
  }));

  return [type, nodes];
};

const parseItems = (data) => {
  return Object.values(data.Rows).map((i) => ({
    key: i.SelfRowHandle.RowName,
    localizedString:
      i.DisplayName.LocalizedString ?? i.DisplayName.CultureInvariantString,
    type: i.Category.RowName,
    icon: i.IconImage.AssetPathName.replace(
      '/Game/UI/UI_WF_Textures/',
      '',
    ).replace(/\.[^.]*$/, ''),
    data: {
      dataTable: `DataTable'/Game/${i.SelfRowHandle.DataTable.ObjectPath.replace('Atlas/Content/', '').replace(/(.*)\/([^/]+)\.(\d+)$/, '$1/$2.$2')}'`,
      rowName: i.SelfRowHandle.RowName,
    },
    addItemsWhenCreated: i.AddItemsWhenCreated.map((x) => ({
      dataTable: `DataTable'/Game/${x.DataTable.ObjectPath.replace('Atlas/Content/', '').replace(/(.*)\/([^/]+)\.(\d+)$/, '$1/$2.$2')}'`,
      rowName: x.RowName,
    })),
    equipmentData: {
      setName: i?.EquipmentSetItem?.RowName || 'None',
      attributes:
        i?.AttributeBudgetPoints?.Entries?.map(
          (e) => e.Attribute.AttributeName,
        ) || [],
    },
    equipmentSlot: i.EquipmentData?.EquipmentSlotType,
    ...(i.type === 'Echo' && {
      echoData: {
        type: i.FogSoulData.Category,
        description: i.DisplayDescription?.SourceString?.replace(
          /<[^>]*>/g,
          '',
        )?.replace(/[^a-zA-Z0-9\s,:]/g, ''),
        soulBudgetCost: i.FogSoulData?.FogSoulBudgetPointCost?.Curve?.RowName,
      },
    }),
    ...Object.entries(i).reduce((acc, [k, v]) => {
      if (k.startsWith('bIs')) acc[k] = v;
      return acc;
    }, {}),
  }));
};

const parseAttributeMetadata = (data) => {
  return Object.entries(data.Rows).reduce((acc, [k, v]) => {
    acc[k.split('.')[1]] = {
      name: v.DisplayName.SourceString ?? '',
      icon: v.Icon.AssetPathName.replace(
        '/Game/UI/UI_WF_Textures/',
        '',
      ).replace(/\.[^.]*$/, ''),
      multiplier: v.DisplayValueMultiplier,
    };

    return acc;
  }, {});
};

// Function to read and parse JSON files
function readJSONFiles() {
  try {
    // Check if directory exists
    if (!fs.existsSync(folderPath)) {
      console.error(`Directory ${folderPath} does not exist`);
      return;
    }

    // Read all files in the directory
    const files = fs.readdirSync(folderPath);

    // Filter for JSON files only
    const jsonFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === '.json',
    );

    if (jsonFiles.length === 0) {
      console.log('No JSON files found in the directory');
      return;
    }

    let resultData = [];
    // Process each JSON file
    jsonFiles.forEach((file) => {
      try {
        const filePath = path.join(folderPath, file);
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(jsonData)?.[0];

        // Archetype
        const data = parseArchtypeTree(parsedData);
        resultData.push(data);

        // Attribute Metadata
        // resultData = JSON.stringify(parseAttributeMetadata(parsedData));
      } catch (err) {
        console.error(`Error reading file ${file}:`, err.message);
      }
    });

    // Items
    // const parsedData = Object.entries(resultData).reduce((acc, [k, v]) => {
    //   acc += `const ${k.replace('2', 'Two')}: INVENTORY_ITEM[] = ${JSON.stringify(v)}; `;
    //   return acc;
    // }, "import { INVENTORY_ITEM } from '@/src/renderer/structures/structures'; ");

    // Archetree
    const parsedData = resultData.reduce((acc, d) => {
      acc += `const ${d[0]}: ArchetypeTreeEntry[] = ${JSON.stringify(d[1])};`;
      return acc;
    }, "import { ArchetypeTreeEntry } from '../../saveFileTypes';");

    fs.writeFile('./raw/scrapped.ts', parsedData, (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Execute the function
readJSONFiles();
