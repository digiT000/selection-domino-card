import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import Button from "./components/Button";
import DataContainer from "./components/DataContainer";
import DominoCard from "./components/DominoCard";
import { DominoProps, initialData, Domino } from "@/utils/data";

function index() {
  // 1.set initial Data of domino
  // 2.Store it into the variable

  // as a source --> source will always refer to this data below. If there is decrease or increase, it will manipulte this data
  const [sourceDominoes, setSourceDominoes] =
    useState<DominoProps>(initialData);
  const [dominoes, setDominoes] = useState<DominoProps>(sourceDominoes); // This data will taken from sourceDominoes --> for sorting and show it as card
  const [doubleNumber, setDoubleNumber] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");

  // Check Double Number Dominoes
  function checkDoubleNumber() {
    // 1. Loop inside the array using map
    // 2. compare whe valu[0] and value [1]
    // 3. if its same set double number + 1
    // 4. if already complete, setDoubleNumber to dobuleNumber
    let countDouble = 0;

    sourceDominoes.map((domino: Domino) => {
      if (domino[0] === domino[1]) {
        console.log("exec");
        countDouble++;
      }
    });
    setDoubleNumber(countDouble);
  }

  function handleSorting(typeSorting: "asc" | "desc") {
    // 1. using switch case to define what type of sorting
    // 2. using sort function to do sorting
    // 3. compary array[a] with array[b]

    switch (typeSorting) {
      case "asc":
        const ascData = dominoes.slice().sort((a, b) => {
          const sum_a = a[0] + a[1];
          const sum_b = b[0] + b[1];
          return sum_a - sum_b;
        });
        setDominoes(ascData);
        break;

      case "desc":
        const descData = dominoes.slice().sort((a, b) => {
          const sum_a = a[0] + a[1];
          const sum_b = b[0] + b[1];
          return sum_b - sum_a;
        });
        setDominoes(descData);
        break;
    }
  }

  function handleFlip() {
    const flipData: DominoProps = [];
    dominoes.slice().map((value) => {
      const newData: Domino = [value[1], value[0]];
      flipData.push(newData);
    });
    setDominoes(flipData);
  }

  function handleRemoveDuplicate() {
    // Create a empty variable to store the updated data
    // Join all the data
    // looping in the data, check if the current data has same number with compare data
    //

    // Join all the data
    let duplicateIndex: number[] = [];
    const joinedData = sourceDominoes
      .slice()
      .map((data: Domino, index: number) => {
        return data.join("");
      });

    const uniqueData: DominoProps = [];

    for (let i = 0; i < joinedData.length; i++) {
      for (let j = 0; j < joinedData.length; j++) {
        if (i === j) continue;
        const joinedDataOri = joinedData[j];
        const joinedDataRev = `${joinedData[j][1]}${joinedData[j][0]}`;

        if (
          joinedData[i] === joinedDataOri ||
          joinedData[i] === joinedDataRev
        ) {
          duplicateIndex.push(i);
          continue;
        }
      }
    }

    if (duplicateIndex.length !== 0) {
      const uniqueIndex = new Set(duplicateIndex);

      for (let i = 0; i < sourceDominoes.length; i++) {
        if (!uniqueIndex.has(i)) {
          uniqueData.push(sourceDominoes[i]);
        }
      }
      setSourceDominoes(uniqueData);
    }
  }

  function handleRemoveBasedOnTotal(value: number) {
    const newDominoes = sourceDominoes.slice().filter((domino) => {
      return domino[0] + domino[1] !== value;
    });
    if (newDominoes.length !== sourceDominoes.length) {
      console.log(newDominoes);
      setSourceDominoes(newDominoes);
    }
  }

  function handleReset() {
    setSourceDominoes(initialData);
  }

  useEffect(() => {
    checkDoubleNumber();
    setDominoes(sourceDominoes);
  }, [sourceDominoes]);

  return (
    <main className="max-w-screen-sm mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-950 mb-6">Dominoes</h1>
      {/* SOURCE DATA SECTION */}
      <section className="p-4 bg-zinc-100 rounded-md border border-zinc-300 mb-4">
        <h3 className="text font-bold text-gray-950 mb-2">Source</h3>

        <p className="text-base text-gray-700 ">
          {"["}
          {sourceDominoes.map((value: Domino) => {
            return ` [${value}] `;
          })}
          {"]"}
        </p>
      </section>

      {/* DOUBLE NUMBER SECTION */}
      <DataContainer className="mb-6">
        <h3 className="text font-bold text-gray-950 mb-2">Double Numbers</h3>
        <p className="text-base text-gray-700 ">{doubleNumber}</p>
      </DataContainer>

      {/* DOMINO CARD SECTION */}
      <section className="mb-4">
        <div className="flex gap-3">
          {dominoes.map((domino: Domino, key: number) => {
            return (
              <DominoCard key={key} number_1={domino[0]} number_2={domino[1]} />
            );
          })}
        </div>
      </section>

      {/* SECTION CALL TO ACTION */}
      <section className="mb-6">
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => {
              handleSorting("asc");
            }}
            text="Sort (ASC)"
          />
          <Button
            onClick={() => {
              handleSorting("desc");
            }}
            text="Sort (DESC)"
          />
          <Button onClick={handleFlip} text="Flip Card" />
          <Button onClick={handleRemoveDuplicate} text="Remove Duplicate" />
          <Button onClick={handleReset} text="Reset Data" />
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-2">
          <label className="font-medium ">
            Remove Domino based on total value
          </label>
          <input
            className="p-3 border border-zinc-300"
            placeholder="Input Number"
            type="number"
            value={inputValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
          <Button
            onClick={() => handleRemoveBasedOnTotal(Number(inputValue))}
            text="Remove Domino"
          />
        </div>
      </section>
    </main>
  );
}

export default index;
