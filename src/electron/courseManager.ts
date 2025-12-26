import { parseString } from "xml2js";
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "./util.js";

const POLLING_INTERVAL = 5000;
const BNR_RATE_URL = "https://www.bnr.ro/nbrfxrates.xml";

interface BNRRate {
  _: string;
  $: {
    currency: string;
  };
}

interface Rates {
  euroRate: number;
  usdRate: number;
  gbpRate: number;
}

export async function getBNRCourseRate(mainWindow: BrowserWindow) {
  const rates = await fetchBNRCourseRate();
  ipcWebContentsSend("getBNRCourseRate", mainWindow.webContents, rates);
  setInterval(async () => {
    const rates = await fetchBNRCourseRate();
    ipcWebContentsSend("getBNRCourseRate", mainWindow.webContents, rates);
  }, POLLING_INTERVAL);
}

export async function fetchBNRCourseRate(): Promise<Rates> {
  const response = await fetch(BNR_RATE_URL);
  const data = await response.text();
  const rates: Rates = parseBNRCourseRate(data);
  return rates;
}

function parseBNRCourseRate(data: string): Rates {
  let euroRate: number = 0;
  let usdRate: number = 0;
  let gbpRate: number = 0;

  parseString(data, { explicitArray: false }, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const rates: BNRRate[] = result.DataSet.Body.Cube.Rate;

      const euroData = selectEUR(rates);
      if (euroData) {
        euroRate = parseFloat(euroData._);
      }

      const usdData = selectUSD(rates);
      if (usdData) {
        usdRate = parseFloat(usdData._);
      }

      const gbpData = selectGBP(rates);
      if (gbpData) {
        gbpRate = parseFloat(gbpData._);
      }
    }
  });

  return { euroRate, usdRate, gbpRate };
}

function selectEUR(data: BNRRate[]): BNRRate | undefined {
  return data.find((rate) => rate.$.currency === "EUR");
}

function selectUSD(data: BNRRate[]): BNRRate | undefined {
  return data.find((rate) => rate.$.currency === "USD");
}

function selectGBP(data: BNRRate[]): BNRRate | undefined {
  return data.find((rate) => rate.$.currency === "GBP");
}
