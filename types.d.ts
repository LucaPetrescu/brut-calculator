type Rates = {
  euroRate: number;
  usdRate: number;
  gbpRate: number;
};

type EventPayloadMapping = {
  getBNRCourseRate: Rates;
};

type FrameWindowAction = "CLOSE" | "MINIMIZE" | "MAXIMIZE";

type UnsubscribeFunction = () => void;

interface Window {
  electron: {
    subscribeBNRCourseRate: (
      callback: (rates: Rates) => void
    ) => UnsubscribeFunction;
    getBNRCourseRate: () => Promise<Rates>;
    sendFrameAction: (action: FrameWindowActino) => void;
  };
}
