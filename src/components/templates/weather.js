import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Search, Trash2 } from "lucide-react";

const Weather = ({ currentResult, history, onUpdate, onDelete }) => {
  return (
    <div className="pt-6 px-6 md:pt-8 md:px-8 bg-indigo-950/30 text-gray-50 grow rounded-t-4xl mt-32 flex flex-col text-sm">
      <div>
        <div className="relative">
          <div>Today's Weather</div>
          <Image
            src="/images/sun.png"
            width={648}
            height={655}
            alt="weather"
            className="w-[10rem] md:w-3xs absolute top-[-8rem] md:top-[-10rem] right-0"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-4 text-2xl">
            {currentResult?.temp || "--"}&deg;
          </div>
          <div className="md:col-span-4">
            H: {currentResult?.dailyTempMax || "--"}&deg; L:{" "}
            {currentResult?.dailyTempMin || "--"}&deg;
          </div>
          <div className="">
            {currentResult?.name || "--"}, {currentResult?.country || "--"}
          </div>
          <div className="">{currentResult?.dateTime || "--"}</div>
          <div className="">Humidity: {currentResult?.humidity || "--"}%</div>
          <div className="">{currentResult?.weatherMain || "--"}</div>
        </div>
      </div>

      <div className="px-4 bg-indigo-950/30 grow rounded-t-4xl mt-8">
        <div className="py-4">Search History</div>
        {/* <ScrollArea className="size-full"> */}
        <div className="flex flex-col gap-3 overflow-auto">
          {history.map((e, i) => (
            <div
              key={i}
              className="p-4 flex gap-2 bg-indigo-950/30 rounded-xl items-center"
            >
              <div className="grow flex flex-col md:flex-row md:justify-between">
                <div>
                  {e.name}, {e.country}
                </div>
                <div className="text-gray-400">{e.dateTime}</div>
              </div>

              <Button
                className="rounded-full"
                onClick={() => {
                  onUpdate(i);
                }}
              >
                <Search />
              </Button>

              <Button
                className="rounded-full"
                onClick={() => {
                  onDelete(i);
                }}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
        {/* </ScrollArea> */}
      </div>
    </div>
  );
};

export default Weather;
