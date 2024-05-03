const { ipcMain, dialog} = require('electron/main')
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');

function activateEventHandler(mainWindow) {

    ipcMain.on('minimizeMainWindow', () => {
        mainWindow.minimize()
    })

    ipcMain.on('maximizeMainWindow', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.restore()
        } else {
            mainWindow.maximize()
        }
    })

    ipcMain.on('closeMainWindow', () => {
        mainWindow.close()
    })

    ipcMain.handle('getwowDroHandler', async () => {
        try {
            const wowDroData = await wowDroHandler();
            return wowDroData;
            // const kmlData = [
            //     {
            //         folderName: '비행금지구역',
            //         polygonList: [
            //             [
            //                 coord1, 
            //                 coord2, 
            //                 coord3,
            //                 ...
            //             ],
            //             [
            //                 coord1, 
            //                 coord2, 
            //                 coord3,
            //                 ...
            //             ],
            //             [
            //                 coord1, 
            //                 coord2, 
            //                 coord3,
            //                 ...
            //             ]
            //         ]
            //     },
            //     {
            //         folderName: '비행제한구역',
            //         polygonList: [
            //             [],
            //             [],
            //             []
            //         ]
            //     },
            //     {

            //     }
            // ]
        } catch (error) {
            console.error('Error handling wowDroHandler:', error);
            return []; // 오류 발생 시 빈 배열 반환
        }
    });

}
async function wowDroHandler(){
    const kmlFilePath = 'doc.kml';
    // KML 데이터를 JSON으로 파싱하는 함수
    function parseKMLData() {
        return new Promise((resolve, reject) => {
            fs.readFile(kmlFilePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error('Error reading KML file:', err);
                    reject(err);
                    return;
                }
                xml2js.parseString(data, (err, result) => {
                    if (err) {
                        console.error('Error parsing KML data:', err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        });
    }
    // KML 데이터에서 폴더 이름을 추출하는 함수
    async function extractWowdroData(kmlData) {
        const wowDroData = [];
        const folders = kmlData.kml.Document[0].Folder;
    
        // 폴더 유형을 처리하는 함수
        function processFolder(folder, folderData) {
            const placemarks = folder.Placemark;
            const polygonList = [];
            placemarks.forEach(placemark => {
                if (placemark.Point) {
                    const coordinates = placemark.Point[0].coordinates;
                    polygonList.push(coordinates);
                } else if (placemark.Polygon) {
                    const coordinates = placemark.Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates;
                    polygonList.push(coordinates);
                }
            });
            folderData['polygonList'] = polygonList;
            wowDroData.push(folderData);
        }
    
        for (const folder of folders) {
            const folderData = {};
            const folderName = folder.name[0];
            folderData['folderName'] = folderName;
    
            if (['RC 비행장','구역표시용1', '구역표시용2'].includes(folderName)) {
                // 건너뛰기
                continue;
            } else if ([ '초경량비행장치 전용공역(비행가능)'].includes(folderName)) {
                processFolder(folder, folderData);
            } else {
                processFolder(folder, folderData);
            }
        }
        return wowDroData;
    }
    
    try {
        const kmlData = await parseKMLData();
        const wowDroData = await extractWowdroData(kmlData);
        //console.log(wowDroData);
        return wowDroData ; // 폴더 이름과 폴리곤 데이터 반환
    } catch (error) {
        console.error('Error making map mode folder names:', error);
        return []; // 오류 발생 시 빈 배열 반환
    }

}

module.exports = activateEventHandler;




