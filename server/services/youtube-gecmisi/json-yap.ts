const fs = require('fs');
const reader = require('xlsx');
const file = reader.readFile('./Youtube Geçmişi.xlsx');


const sheets = file.SheetNames;
const nispetenSheet = file.Sheets[file.SheetNames[7]];
const temp = reader.utils.sheet_to_json(nispetenSheet, {header: "A"});
const izlenenler = {} as any;

temp.forEach((res: any, i: number) => {
    const satir = {};
    try {
        const isim = res['B'].replace(' adlı videoyu izlediniz', '');
        const link = nispetenSheet['B' + (i + 1)].l.Target;
        const muellif = res['C'];
        const tarih = res['D'];
        if (link in izlenenler) {
            izlenenler[link].tarihler.push(tarih);
        } else {
            izlenenler[link] = {};
            izlenenler[link].isim = isim;
            izlenenler[link].link = link;
            izlenenler[link].muellif = muellif;
            izlenenler[link].tarihler = [tarih];

        }
    } catch (e) {
        console.log('hatali satir: ', i);
    }
})
const izlenenlerSiraliDizi = Object.values(izlenenler);
izlenenlerSiraliDizi.sort((e1: any, e2: any) => {
    return Number(e2.tarihler.length - e1.tarihler.length);
});
fs.writeFile('youtube-gecmisi.json', JSON.stringify(izlenenlerSiraliDizi), (err: any) => {
    if (err) {
        console.log('Error writing file', err);
    } else {
        console.log('Successfully wrote file');
    }
});
console.log(`${Object.keys(izlenenler).length} izlenen video toplam ${temp.length} kez izlenmistir.`)
