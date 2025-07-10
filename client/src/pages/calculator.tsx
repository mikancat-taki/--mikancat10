import { useState } from 'react';
import { useTranslation, Language } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator as CalculatorIcon } from 'lucide-react';

interface CalculatorProps {
  language: Language;
}

export default function Calculator({ language }: CalculatorProps) {
  const { t } = useTranslation(language);
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const buttonClass = "p-4 text-lg font-semibold transition-colors";
  const numberButtonClass = `${buttonClass} bg-gray-100 hover:bg-gray-200`;
  const operationButtonClass = `${buttonClass} bg-cat-mint hover:bg-green-400 text-white`;
  const clearButtonClass = `${buttonClass} bg-gray-200 hover:bg-gray-300`;
  const equalsButtonClass = `${buttonClass} bg-cat-pink hover:bg-red-400 text-white`;

  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className="w-12 h-12 bg-cat-mint rounded-full flex items-center justify-center mr-4">
              <CalculatorIcon className="h-6 w-6 text-white" />
            </div>
            {t('module.calculator')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-w-md mx-auto">
            {/* Display */}
            <div className="bg-gray-900 text-white p-4 rounded-t-lg mb-1">
              <div className="text-right text-2xl font-mono">{display}</div>
            </div>
            
            {/* Buttons */}
            <div className="grid grid-cols-4 gap-1">
              <Button onClick={clearAll} className={clearButtonClass}>C</Button>
              <Button onClick={() => inputOperation('±')} className={clearButtonClass}>±</Button>
              <Button onClick={() => inputOperation('%')} className={clearButtonClass}>%</Button>
              <Button onClick={() => inputOperation('÷')} className={operationButtonClass}>÷</Button>
              
              <Button onClick={() => inputNumber('7')} className={numberButtonClass}>7</Button>
              <Button onClick={() => inputNumber('8')} className={numberButtonClass}>8</Button>
              <Button onClick={() => inputNumber('9')} className={numberButtonClass}>9</Button>
              <Button onClick={() => inputOperation('×')} className={operationButtonClass}>×</Button>
              
              <Button onClick={() => inputNumber('4')} className={numberButtonClass}>4</Button>
              <Button onClick={() => inputNumber('5')} className={numberButtonClass}>5</Button>
              <Button onClick={() => inputNumber('6')} className={numberButtonClass}>6</Button>
              <Button onClick={() => inputOperation('-')} className={operationButtonClass}>-</Button>
              
              <Button onClick={() => inputNumber('1')} className={numberButtonClass}>1</Button>
              <Button onClick={() => inputNumber('2')} className={numberButtonClass}>2</Button>
              <Button onClick={() => inputNumber('3')} className={numberButtonClass}>3</Button>
              <Button onClick={() => inputOperation('+')} className={operationButtonClass}>+</Button>
              
              <Button onClick={() => inputNumber('0')} className={`${numberButtonClass} col-span-2`}>0</Button>
              <Button onClick={() => inputNumber('.')} className={numberButtonClass}>.</Button>
              <Button onClick={handleEquals} className={equalsButtonClass}>=</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
