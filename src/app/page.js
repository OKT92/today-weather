"use client";

import { useState } from "react";
import SearchBar from "@/components/organisms/search-bar";
import Weather from "@/components/templates/weather";
import useInput from "@/hooks/useInput";

export default function Home() {
  const [inputProp, inputMethod] = useInput();
  const [currentResult, setCurrentResult] = useState({});
  const [history, setHistory] = useState([]);

  const onSearch = async () => {
    const response = await fetch(`/api/weather?q=${inputProp.value}`);

    if (!response.ok) {
      switch (response.status) {
        case 400: {
          break;
        }
        case 404: {
          break;
        }
        case 500: {
          break;
        }
        default: {
          console.error("Unexpected Error");
        }
      }
      return;
    }

    const data = await response.json();

    setCurrentResult(data);
    setHistory((prev) => {
      return [data, ...prev];
    });
    inputMethod.clear();
  };

  const onUpdate = async (index) => {
    const clonedHistory = [...history];
    const [selectedResult] = clonedHistory.splice(index, 1);

    const response = await fetch(
      `/api/weather?lat=${selectedResult.lat}&lon=${selectedResult.lon}`
    );

    if (!response.ok) {
      switch (response.status) {
        case 400: {
          break;
        }
        case 404: {
          break;
        }
        case 500: {
          break;
        }
        default: {
          console.error("Unexpected Error");
        }
      }
      return;
    }

    const data = await response.json();
    const updatedResult = { ...selectedResult, ...data };

    setCurrentResult(updatedResult);
    setHistory([updatedResult, ...clonedHistory]);
  };

  const onDelete = (index) => {
    setHistory((prev) => {
      const clonedHistory = [...prev];
      clonedHistory.splice(index, 1);

      return clonedHistory;
    });
  };

  return (
    <div className="min-h-screen pt-8 flex">
      <div className="w-full md:max-w-2xl mx-auto px-4 lg:px-8 flex flex-col grow">
        <SearchBar {...inputProp} onSearch={onSearch} />
        <Weather
          currentResult={currentResult}
          history={history}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
