type Rates = {
  euroRate: number;
  usdRate: number;
  gbpRate: number;
};

type EventPayloadMapping = {
  getBNRCourseRate: Rates;
};

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeBNRCourseRate: (
      callback: (rates: Rates) => void
    ) => UnsubscribeFunction;
    getBNRCourseRate: () => Promise<Rates>;
  };
}
