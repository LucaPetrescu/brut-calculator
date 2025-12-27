export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-8 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 flex items-center justify-between px-4 z-50 select-none drag">
      <div className="text-gray-400 text-sm font-medium">
        Gross Salary Calculator
      </div>

      <div className="flex items-center gap-2 no-drag">
        <button
          id="minimize"
          onClick={() => window.electron.sendFrameAction("MINIMIZE")}
          className="w-8 h-8 rounded hover:bg-gray-700/50 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
          title="Minimize"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 6h12"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <button
          id="maximize"
          onClick={() => window.electron.sendFrameAction("MAXIMIZE")}
          className="w-8 h-8 rounded hover:bg-gray-700/50 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
          title="Maximize"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="10"
              height="10"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </button>

        <button
          id="close"
          onClick={() => window.electron.sendFrameAction("CLOSE")}
          className="w-8 h-8 rounded hover:bg-red-600/80 transition-colors flex items-center justify-center text-gray-400 hover:text-white"
          title="Close"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1l10 10M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
