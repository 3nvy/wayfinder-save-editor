const fs = require('fs');
const path = require('path');

// Specify the folder path where your JSON files are located
const folderPath = './raw'; // Change this to your folder path

const resultData = {};

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

    // Process each JSON file
    jsonFiles.forEach((file) => {
      try {
        const filePath = path.join(folderPath, file);
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(jsonData)?.[0];

        resultData[parsedData.Name] = Object.values(parsedData.Rows).map(
          (i) => ({
            key: i.SelfRowHandle.RowName,
            localizedString:
              i.DisplayName.LocalizedString ??
              i.DisplayName.CultureInvariantString,
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
            equipmentSlot: i.EquipmentData?.EquipmentSlotType,
            ...(i.type === 'Echo' && {
              echoData: {
                type: i.FogSoulData.Category,
                description: i.DisplayDescription?.SourceString?.replace(
                  /<[^>]*>/g,
                  '',
                )?.replace(/[^a-zA-Z0-9\s,:]/g, ''),
                soulBudgetCost:
                  i.FogSoulData?.FogSoulBudgetPointCost?.Curve?.RowName,
              },
            }),
            ...Object.entries(i).reduce((acc, [k, v]) => {
              if (k.startsWith('bIs')) acc[k] = v;
              return acc;
            }, {}),
          }),
        );
      } catch (err) {
        console.error(`Error reading file ${file}:`, err.message);
      }
    });

    const parsedData = Object.entries(resultData).reduce((acc, [k, v]) => {
      acc += `const ${k.replace('2', 'Two')}: INVENTORY_ITEM[] = ${JSON.stringify(v)}; `;
      return acc;
    }, "import { INVENTORY_ITEM } from '@/src/renderer/structures/structures'; ");

    fs.writeFile('./raw/scrapped.ts', parsedData, (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Execute the function
readJSONFiles();
