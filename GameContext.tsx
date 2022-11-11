import React, { useState, createContext, FC, ReactNode } from "react";

export type Value = 'X' | 'O' | null;

export type BoardState =  { 
  squares: Value[],
}

export type HistoryState = {
  history: BoardState[] ,
  setHistory: (history: BoardState[]) => void
}

export type StepState = {
  stepNumber: number,
  setStepNumber: (stepNumber: number) => void,
}

export type XisNextState = {
  xIsNext: boolean,
  setXisNext: (xIsNext: boolean) => void,
}

export interface SquareProps{
  value: Value,
  onPress: () => void
}

export interface BoardProps {
  squares: Value[],
  onPress: (i: number) => void,
}

interface Props {
  children?: ReactNode
  // any props that come into the component
}


const createBoardState = () => [{squares: Array<Value>(9).fill(null)}]; 

export const defaultState = {
  history: createBoardState(),
}
export const defaultStep = {
  stepNumber: 0,
}

export const defaultX = {
  xIsNext: true,
}


export const HistoryContext = createContext<HistoryState>(undefined as unknown as HistoryState);
export const StepContext = createContext<StepState>(undefined as unknown as StepState);
export const XisNextContext = createContext<XisNextState>(undefined as unknown as XisNextState);


export const GameProvider = ({children}: Props) => {

  const [history, setHistory] = useState<BoardState[]>(defaultState.history);
  const [stepNumber, setStepNumber] = useState(defaultStep.stepNumber);
  const [xIsNext, setXisNext] = useState(defaultX.xIsNext);

  return (
    <HistoryContext.Provider value={{history, setHistory}}>
      <StepContext.Provider value={{stepNumber, setStepNumber}}>
        <XisNextContext.Provider value={{xIsNext, setXisNext}}>
          {children}
        </XisNextContext.Provider>
      </StepContext.Provider>
    </HistoryContext.Provider>
  );
}